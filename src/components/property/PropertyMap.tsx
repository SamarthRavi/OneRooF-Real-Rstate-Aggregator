
import React, { useState, useRef, useEffect } from "react";
import { Property } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Bed, Bath, Maximize, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface PropertyMapProps {
  properties: Property[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

// City coordinates mapping for better navigation
const CITY_COORDINATES: Record<string, { lat: number, lng: number }> = {
  'Delhi': { lat: 28.6139, lng: 77.2090 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Bangalore': { lat: 12.9716, lng: 77.5946 },
  'Chennai': { lat: 13.0827, lng: 80.2707 },
  'Hyderabad': { lat: 17.3850, lng: 78.4867 },
  'Kolkata': { lat: 22.5726, lng: 88.3639 },
  'Pune': { lat: 18.5204, lng: 73.8567 },
  'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
};

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties, 
  center = { lat: 20.5937, lng: 78.9629 }, // Center of India
  zoom = 5 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  // Initialize Google Maps
  useEffect(() => {
    // Load Google Maps API script
    const loadGoogleMapsAPI = () => {
      // Check if script is already loaded
      const existingScript = document.getElementById('google-maps-api');
      if (existingScript) {
        if (window.google) {
          initializeMap();
        }
        return;
      }

      const script = document.createElement("script");
      script.id = "google-maps-api";
      script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
      script.defer = true;
      script.async = true;
      
      // Define the callback function
      window.initMap = () => {
        initializeMap();
      };
      
      document.head.appendChild(script);
      
      // Fallback in case script doesn't load properly
      setTimeout(() => {
        if (!mapLoaded) {
          toast.error({
            title: "Map Error",
            description: "Failed to load Google Maps. Please refresh the page."
          });
        }
      }, 10000);
    };
    
    const initializeMap = () => {
      if (!mapRef.current) return;
      
      try {
        const googleMap = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                { color: "#e9e9e9" },
                { lightness: 17 }
              ]
            },
          ],
        });
        
        setMap(googleMap);
        setMapLoaded(true);
        
        const infoWindowInstance = new window.google.maps.InfoWindow();
        setInfoWindow(infoWindowInstance);
        
        // Add map controls
        const centerControlDiv = document.createElement('div');
        centerControlDiv.className = 'absolute bottom-20 left-2 bg-white rounded-md shadow-md p-2 flex flex-col gap-2';
        
        // Create city buttons for quick navigation
        Object.entries(CITY_COORDINATES).forEach(([city, coords]) => {
          const button = document.createElement('button');
          button.className = 'px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary/80';
          button.textContent = city;
          button.addEventListener('click', () => {
            googleMap.panTo(coords);
            googleMap.setZoom(12);
            toast.info({
              title: `Navigating to ${city}`,
              description: `Showing properties in ${city}`
            });
          });
          centerControlDiv.appendChild(button);
        });
        
        googleMap.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv);
      } catch (error) {
        console.error("Error initializing map:", error);
        toast.error({
          title: "Map Error",
          description: "There was a problem initializing Google Maps."
        });
      }
    };
    
    // Check if Google Maps API is already loaded
    if (!window.google) {
      loadGoogleMapsAPI();
    } else {
      initializeMap();
    }
    
    return () => {
      if (window.google && window.google.maps) {
        // Clean up markers
        markers.forEach(marker => marker.setMap(null));
      }
      
      // Clean up the global initMap function
      if (window.initMap) {
        window.initMap = () => {};
      }
    };
  }, []);

  // Add markers when properties or map changes
  useEffect(() => {
    if (!map || !window.google || properties.length === 0) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Create bounds for auto-zoom
    const bounds = new window.google.maps.LatLngBounds();
    
    // Extract city from location to use city coordinates when property coordinates are missing
    const getCoordinates = (property: Property) => {
      // Try to get coordinates from the property
      if (property.location.coordinates.lat && property.location.coordinates.lng) {
        return {
          lat: property.location.coordinates.lat,
          lng: property.location.coordinates.lng
        };
      }
      
      // Extract city name from location string and use city coordinates
      for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
        if (property.location.city.includes(city) || property.location.address.includes(city)) {
          // Add a small random offset to prevent markers from overlapping exactly
          const randomLat = (Math.random() - 0.5) * 0.01;
          const randomLng = (Math.random() - 0.5) * 0.01;
          return {
            lat: coords.lat + randomLat,
            lng: coords.lng + randomLng
          };
        }
      }
      
      // Default to center of India if no match
      return { lat: 20.5937, lng: 78.9629 };
    };
    
    // Create new markers
    const newMarkers = properties.map(property => {
      const position = getCoordinates(property);
      
      // Add position to bounds
      bounds.extend(position);
      
      const marker = new window.google.maps.Marker({
        position,
        map,
        title: property.title,
        icon: {
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
          fillColor: property.listingType === "rent" ? "#2C7A7B" : "#DD6B20",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 1,
          scale: 1.5,
          anchor: new window.google.maps.Point(12, 22),
        },
        animation: window.google.maps.Animation.DROP,
      });
      
      // Add click event
      marker.addListener("click", () => {
        setActiveProperty(property);
        
        if (infoWindow) {
          const price = formatCurrency(property.price, property.currency);
          const rentSuffix = property.listingType === "rent" ? "/month" : "";
          
          const content = `
            <div class="p-2">
              <h3 class="font-medium text-sm">${property.title}</h3>
              <p class="font-bold text-sm text-primary">${price}${rentSuffix}</p>
              <p class="text-xs text-gray-600">${property.location.address}, ${property.location.city}</p>
            </div>
          `;
          
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        }
      });
      
      return marker;
    }).filter(Boolean);
    
    setMarkers(newMarkers);
    
    // Fit map to bounds if we have valid properties
    if (newMarkers.length > 0) {
      map.fitBounds(bounds);
      
      // Don't zoom in too far
      const listener = window.google.maps.event.addListener(map, "idle", () => {
        if (map.getZoom() > 12) {
          map.setZoom(12);
        }
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [properties, map, infoWindow]);

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" />
      
      {activeProperty && (
        <Card className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-72 shadow-lg">
          <CardContent className="p-3">
            <div className="flex flex-col">
              <div className="relative aspect-video overflow-hidden rounded-sm mb-2">
                <img
                  src={activeProperty.images[0]}
                  alt={activeProperty.title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute top-1 left-1">
                  <span
                    className={`px-1.5 py-0.5 text-xs font-semibold rounded-sm ${
                      activeProperty.listingType === "rent"
                        ? "bg-secondary text-white"
                        : "bg-accent text-white"
                    }`}
                  >
                    {activeProperty.listingType === "rent" ? "Rent" : "Sale"}
                  </span>
                </div>
              </div>
              
              <h3 className="font-medium text-sm mb-1 line-clamp-1">
                {activeProperty.title}
              </h3>
              
              <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                {activeProperty.location.address}, {activeProperty.location.city}
              </p>
              
              <p className="text-base font-bold mb-2 text-primary">
                {formatCurrency(activeProperty.price, activeProperty.currency)}
                {activeProperty.listingType === "rent" && (
                  <span className="text-xs font-normal text-gray-500"> / month</span>
                )}
              </p>
              
              <div className="grid grid-cols-3 gap-1 text-xs mb-3">
                <div className="flex items-center">
                  <Bed className="w-3 h-3 mr-1 text-gray-500" />
                  <span>{activeProperty.features.bedrooms} Beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-3 h-3 mr-1 text-gray-500" />
                  <span>{activeProperty.features.bathrooms} Baths</span>
                </div>
                <div className="flex items-center">
                  <Maximize className="w-3 h-3 mr-1 text-gray-500" />
                  <span>{activeProperty.features.area} sq.ft</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link to={`/property/${activeProperty.id}`}>View Details</Link>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-none w-10"
                  onClick={() => {
                    // Open in Google Maps
                    const address = `${activeProperty.location.address}, ${activeProperty.location.city}`;
                    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
                  }}
                >
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-lg">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-gray-700">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
