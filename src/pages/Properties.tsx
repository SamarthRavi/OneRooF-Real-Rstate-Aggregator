
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyFilter from "@/components/property/PropertyFilter";
import { Button } from "@/components/ui/button";
import { Filter, Home } from "lucide-react";
import { PropertyFilters } from "@/types/property";
import { fetchPropertiesFromSupabase } from "@/services/propertyService";
import { toast } from "@/components/ui/use-toast";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>({});

  // Extract filters from URL parameters
  useEffect(() => {
    const urlFilters: PropertyFilters = {};
    
    const city = searchParams.get("city");
    if (city && city !== "all_cities") urlFilters.city = city;
    
    const minPrice = searchParams.get("minPrice");
    if (minPrice) urlFilters.minPrice = parseInt(minPrice);
    
    const maxPrice = searchParams.get("maxPrice");
    if (maxPrice) urlFilters.maxPrice = parseInt(maxPrice);
    
    const bedrooms = searchParams.get("bedrooms");
    if (bedrooms) urlFilters.bedrooms = parseInt(bedrooms);
    
    const propertyType = searchParams.get("propertyType");
    if (propertyType) urlFilters.propertyType = propertyType.split(",");
    
    const amenities = searchParams.get("amenities");
    if (amenities) urlFilters.amenities = amenities.split(",");
    
    const furnished = searchParams.get("furnished");
    if (furnished && furnished !== "any_furnishing") urlFilters.furnished = furnished;
    
    const listingType = searchParams.get("listingType") as "rent" | "sale" | "all" | null;
    if (listingType && listingType !== "all") urlFilters.listingType = listingType;
    
    setFilters(urlFilters);
  }, [searchParams]);

  // Fetch properties from Supabase
  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchPropertiesFromSupabase(filters),
  });

  const handleFilterChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
    toast.success({
      title: "Filters Applied",
      description: "Showing properties based on your filters."
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <div className="flex items-center">
            <Home className="w-6 h-6 mr-2 text-primary" />
            <h1 className="text-3xl font-bold">Properties</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant={isFilterOpen ? "default" : "outline"}
              className="sm:hidden"
              size="sm"
            >
              <Filter className="mr-2 h-4 w-4" />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </Button>
            <div className="hidden sm:block text-sm text-gray-500">
              {properties.length} properties found
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className={`lg:block ${isFilterOpen ? "block" : "hidden"}`}>
            <div className="sticky top-20">
              <PropertyFilter onFilterChange={handleFilterChange} />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-lg border mb-4 flex justify-between items-center">
              {isLoading ? (
                <p className="text-gray-700">Loading properties...</p>
              ) : error ? (
                <p className="text-red-500">Error loading properties. Please try again.</p>
              ) : (
                <>
                  <p className="text-gray-700">
                    <span className="font-medium">{properties.length}</span> properties found
                  </p>
                  <div className="text-sm text-gray-500">
                    {filters.city ? 
                      `Showing properties in ${filters.city}` : 
                      "Showing properties across India"}
                  </div>
                </>
              )}
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
                ))}
              </div>
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">No properties found</h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Properties;
