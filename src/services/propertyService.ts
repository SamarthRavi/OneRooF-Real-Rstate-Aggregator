
import { supabase } from "@/integrations/supabase/client";
import { Property, PropertyFilters } from "@/types/property";

// City coordinates for mapping properties
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

// Helper function to get coordinates based on city name
const getCoordinatesForLocation = (location: string): { lat: number, lng: number } => {
  for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
    if (location.includes(city)) {
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

// Dummy properties data for when Supabase doesn't return anything
const dummyProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Apartment in City Center",
    description: "A beautiful 3BHK apartment with modern amenities in the heart of the city.",
    price: 25000,
    currency: "INR",
    location: {
      address: "123 Park Street, Indiranagar",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560038",
      coordinates: {
        lat: 12.9716,
        lng: 77.5946
      }
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      furnished: "fully"
    },
    amenities: ["Swimming Pool", "Gym", "Parking", "Security", "Power Backup"],
    type: "apartment",
    listingType: "rent",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&h=400"],
    listedBy: {
      name: "John Doe",
      contactNumber: "+91 9876543210",
      agency: "Premium Properties",
      source: "housing.com"
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Independent Villa in Whitefield",
    description: "Spacious 4BHK villa with garden area in peaceful gated community.",
    price: 50000,
    currency: "INR",
    location: {
      address: "45 Green Valley, Whitefield",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560066",
      coordinates: {
        lat: 12.9698,
        lng: 77.7499
      }
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 2400,
      furnished: "semi"
    },
    amenities: ["Garden", "Security", "Power Backup", "Parking", "Club House"],
    type: "villa",
    listingType: "rent",
    images: ["https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=600&h=400"],
    listedBy: {
      name: "Jane Smith",
      contactNumber: "+91 9988776655",
      agency: "Dream Homes",
      source: "99acres"
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Commercial Space in Tech Park",
    description: "Ready-to-move office space with modern infrastructure in prime location.",
    price: 8500000,
    currency: "INR",
    location: {
      address: "Tech Park, Electronic City",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560100",
      coordinates: {
        lat: 12.8399,
        lng: 77.6770
      }
    },
    features: {
      bedrooms: 0,
      bathrooms: 2,
      area: 1800,
      furnished: "fully"
    },
    amenities: ["24/7 Access", "Security", "Power Backup", "Parking", "Cafeteria"],
    type: "commercial",
    listingType: "sale",
    images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&h=400"],
    listedBy: {
      name: "Commercial Spaces Ltd",
      contactNumber: "+91 8877665544",
      agency: "Business Properties",
      source: "magicbricks"
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "2BHK Apartment in Koramangala",
    description: "Cozy 2BHK apartment in Koramangala 5th Block",
    price: 18000,
    currency: "INR",
    location: {
      address: "5th Block, Koramangala",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560034",
      coordinates: {
        lat: 12.9279,
        lng: 77.6271
      }
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 950,
      furnished: "unfurnished"
    },
    amenities: ["Parking", "Security", "Power Backup"],
    type: "apartment",
    listingType: "rent",
    images: ["https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=600&h=400"],
    listedBy: {
      name: "Robert Johnson",
      contactNumber: "+91 9876543211",
      agency: "City Properties",
      source: "nobroker"
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "Premium Villa for Sale in Sarjapur",
    description: "Luxurious 5BHK villa with swimming pool in premium gated community",
    price: 24000000,
    currency: "INR",
    location: {
      address: "Premium Villa Estate, Sarjapur Road",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560035",
      coordinates: {
        lat: 12.8783,
        lng: 77.6408
      }
    },
    features: {
      bedrooms: 5,
      bathrooms: 5,
      area: 4000,
      furnished: "fully"
    },
    amenities: ["Swimming Pool", "Garden", "Gym", "Security", "Power Backup", "Club House"],
    type: "villa",
    listingType: "sale",
    images: ["https://images.unsplash.com/photo-1600607687644-c7171b48f0df?auto=format&fit=crop&w=600&h=400"],
    listedBy: {
      name: "Premium Homes Realty",
      contactNumber: "+91 8765432100",
      agency: "Premium Homes",
      source: "direct"
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "6",
    title: "Plot for Sale in Electronic City",
    description: "30x40 corner plot in well-developed area with all amenities nearby",
    price: 3500000,
    currency: "INR",
    location: {
      address: "Phase 2, Electronic City",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560100",
      coordinates: {
        lat: 12.8458,
        lng: 77.6612
      }
    },
    features: {
      bedrooms: 0,
      bathrooms: 0,
      area: 1200,
      furnished: "unfurnished"
    },
    amenities: ["Corner Plot", "Ready to Construct"],
    type: "plot",
    listingType: "sale",
    images: ["https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&w=600&h=400"],
    listedBy: {
      name: "Land Ventures",
      contactNumber: "+91 7654321098",
      agency: "Land Deals",
      source: "direct"
    },
    createdAt: new Date().toISOString()
  }
];

export async function fetchPropertiesFromSupabase(filters?: PropertyFilters): Promise<Property[]> {
  try {
    let query = supabase.from('properties').select('*');

    // Apply filters if provided
    if (filters) {
      if (filters.city && filters.city !== "all_cities") {
        query = query.ilike('location', `%${filters.city}%`);
      }
      
      if (filters.minPrice) {
        // Since price is stored as text in Supabase, we need to convert for comparison
        query = query.gte('price', String(filters.minPrice));
      }
      
      if (filters.maxPrice) {
        query = query.lte('price', String(filters.maxPrice));
      }
      
      if (filters.bedrooms) {
        query = query.eq('bedrooms', filters.bedrooms);
      }

      if (filters.listingType && filters.listingType !== "all") {
        // This would require a column in the database to filter by listing type
        // For now we'll just filter the dummy data
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error from Supabase:", error);
      // Fall back to dummy data if there's an error
      return filterDummyProperties(dummyProperties, filters);
    }

    if (!data || data.length === 0) {
      console.log("No data from Supabase, using dummy data");
      return filterDummyProperties(dummyProperties, filters);
    }

    // Transform the data from Supabase to match our Property type
    return data.map(item => {
      // Get coordinates based on location
      const coordinates = getCoordinatesForLocation(item.location);

      // Determine listing type based on price (just a heuristic)
      const price = parseFloat(item.price);
      const listingType = price > 100000 ? "sale" : "rent";
      
      // Determine property type based on title and description
      let propertyType: "apartment" | "house" | "villa" | "plot" | "commercial" = "apartment";
      if (item.title.toLowerCase().includes('villa')) {
        propertyType = "villa";
      } else if (item.title.toLowerCase().includes('house') || item.title.toLowerCase().includes('home')) {
        propertyType = "house";
      } else if (item.title.toLowerCase().includes('commercial') || item.title.toLowerCase().includes('office')) {
        propertyType = "commercial";
      } else if (item.title.toLowerCase().includes('plot') || item.title.toLowerCase().includes('land')) {
        propertyType = "plot";
      }
      
      // Extract city from location
      const cityMatch = item.location.match(/([^,]+)$/);
      const city = cityMatch ? cityMatch[0].trim() : "Unknown";
      
      // Generate a list of amenities based on property type
      const amenities = ["Parking", "Security"];
      if (propertyType === "apartment" || propertyType === "villa") {
        amenities.push("Power Backup", "Elevator");
        if (parseInt(item.price) > 30000) {
          amenities.push("Swimming Pool", "Gym");
        }
      }

      return {
        id: item.id,
        title: item.title,
        description: item.title, // Using title as description since we don't have a description field
        price: parseFloat(item.price),
        currency: "INR",
        location: {
          address: item.location,
          city: city,
          state: getStateFromCity(city),
          zipCode: generateRandomZipCode(),
          coordinates: coordinates
        },
        features: {
          bedrooms: item.bedrooms,
          bathrooms: item.bathrooms,
          area: parseFloat(item.area),
          furnished: determineRandomFurnishedStatus()
        },
        amenities: amenities,
        type: propertyType,
        listingType: listingType as "rent" | "sale",
        images: [item.image_url],
        listedBy: {
          name: generateRandomAgentName(),
          contactNumber: generateRandomPhoneNumber(),
          agency: item.source,
          source: item.source as "nobroker" | "99acres" | "housing.com" | "magicbricks" | "direct"
        },
        createdAt: item.created_at
      };
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    // Fall back to dummy data
    return filterDummyProperties(dummyProperties, filters);
  }
}

// Helper function to get state based on city
function getStateFromCity(city: string): string {
  const cityToState: Record<string, string> = {
    'Delhi': 'Delhi',
    'New Delhi': 'Delhi',
    'Mumbai': 'Maharashtra',
    'Bangalore': 'Karnataka',
    'Chennai': 'Tamil Nadu',
    'Hyderabad': 'Telangana',
    'Kolkata': 'West Bengal',
    'Pune': 'Maharashtra',
    'Ahmedabad': 'Gujarat'
  };
  
  return cityToState[city.trim()] || "Unknown";
}

// Generate a random Indian zipcode (PIN code)
function generateRandomZipCode(): string {
  return (Math.floor(Math.random() * 900000) + 100000).toString();
}

// Generate a random agent name
function generateRandomAgentName(): string {
  const firstNames = ["Raj", "Amit", "Priya", "Sunita", "Vikram", "Neha", "Rahul", "Kiran", "Anil", "Sanjay"];
  const lastNames = ["Sharma", "Patel", "Singh", "Gupta", "Kumar", "Shah", "Verma", "Reddy", "Joshi", "Malhotra"];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
}

// Generate a random Indian phone number
function generateRandomPhoneNumber(): string {
  const prefix = "+91 ";
  const number = Math.floor(Math.random() * 9000000000) + 1000000000;
  return prefix + number.toString();
}

// Determine random furnished status
function determineRandomFurnishedStatus(): "fully" | "semi" | "unfurnished" {
  const statuses: ["fully", "semi", "unfurnished"] = ["fully", "semi", "unfurnished"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Function to filter the dummy properties based on filters
function filterDummyProperties(properties: Property[], filters?: PropertyFilters): Property[] {
  if (!filters) return properties;

  return properties.filter(property => {
    // Filter by city
    if (filters.city && filters.city !== "all_cities" && 
        !property.location.city.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }

    // Filter by price range
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    // Filter by bedrooms
    if (filters.bedrooms && property.features.bedrooms < filters.bedrooms) {
      return false;
    }

    // Filter by property type
    if (filters.propertyType && filters.propertyType.length > 0 && 
        !filters.propertyType.includes(property.type)) {
      return false;
    }

    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    // Filter by furnished status
    if (filters.furnished && filters.furnished !== "any_furnishing" && 
        property.features.furnished !== filters.furnished) {
      return false;
    }

    // Filter by listing type
    if (filters.listingType && filters.listingType !== "all" && 
        property.listingType !== filters.listingType) {
      return false;
    }

    return true;
  });
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  try {
    // First try to find it in our dummy data
    const dummyProperty = dummyProperties.find(property => property.id === id);
    if (dummyProperty) {
      return dummyProperty;
    }

    // If not found in dummy data, try to fetch from Supabase
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    // Get coordinates based on location
    const coordinates = getCoordinatesForLocation(data.location);
    
    // Extract city from location
    const cityMatch = data.location.match(/([^,]+)$/);
    const city = cityMatch ? cityMatch[0].trim() : "Unknown";
    
    // Determine listing type based on price (just a heuristic)
    const price = parseFloat(data.price);
    const listingType = price > 100000 ? "sale" : "rent";
    
    // Determine property type based on title
    let propertyType: "apartment" | "house" | "villa" | "plot" | "commercial" = "apartment";
    if (data.title.toLowerCase().includes('villa')) {
      propertyType = "villa";
    } else if (data.title.toLowerCase().includes('house') || data.title.toLowerCase().includes('home')) {
      propertyType = "house";
    } else if (data.title.toLowerCase().includes('commercial') || data.title.toLowerCase().includes('office')) {
      propertyType = "commercial";
    } else if (data.title.toLowerCase().includes('plot') || data.title.toLowerCase().includes('land')) {
      propertyType = "plot";
    }
    
    // Generate a list of amenities based on property type
    const amenities = ["Parking", "Security"];
    if (propertyType === "apartment" || propertyType === "villa") {
      amenities.push("Power Backup", "Elevator");
      if (parseInt(data.price) > 30000) {
        amenities.push("Swimming Pool", "Gym");
      }
    }

    // Transform the data to match the Property interface
    return {
      id: data.id,
      title: data.title,
      description: `This is a beautiful ${data.bedrooms} bedroom ${propertyType} located in ${data.location}. It features ${data.bathrooms} bathrooms and approximately ${data.area} sq.ft of living space.`,
      price: parseFloat(data.price),
      currency: "INR",
      location: {
        address: data.location,
        city: city,
        state: getStateFromCity(city),
        zipCode: generateRandomZipCode(),
        coordinates: coordinates
      },
      features: {
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: parseFloat(data.area),
        furnished: determineRandomFurnishedStatus()
      },
      amenities: amenities,
      type: propertyType,
      listingType: listingType as "rent" | "sale",
      images: [data.image_url],
      listedBy: {
        name: generateRandomAgentName(),
        contactNumber: generateRandomPhoneNumber(),
        agency: data.source,
        source: data.source as "nobroker" | "99acres" | "housing.com" | "magicbricks" | "direct"
      },
      createdAt: data.created_at
    };
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}
