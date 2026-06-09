import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from "lucide-react";
import { PropertyFilters } from "@/types/property";
import { toast } from "@/components/ui/use-toast";
import { getDefaultPriceRange, updateURLWithFilters } from "./filters/FilterUtils";
import ListingTypeFilter from "./filters/ListingTypeFilter";
import CityFilter from "./filters/CityFilter";
import BedroomsFilter from "./filters/BedroomsFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import PropertyTypeFilter from "./filters/PropertyTypeFilter";
import AmenitiesFilter from "./filters/AmenitiesFilter";
import FurnishingFilter from "./filters/FurnishingFilter";

interface PropertyFilterProps {
  onFilterChange: (filters: PropertyFilters) => void;
  className?: string;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ onFilterChange, className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Initialize filters from URL params or defaults
  const [filters, setFilters] = useState<PropertyFilters>({
    city: searchParams.get("city") || "",
    minPrice: searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : undefined,
    maxPrice: searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined,
    bedrooms: searchParams.get("bedrooms") ? parseInt(searchParams.get("bedrooms")!) : undefined,
    propertyType: searchParams.get("propertyType") ? searchParams.get("propertyType")!.split(",") : [],
    amenities: searchParams.get("amenities") ? searchParams.get("amenities")!.split(",") : [],
    furnished: searchParams.get("furnished") || "",
    listingType: (searchParams.get("listingType") as "rent" | "sale" | "all") || "all",
  });

  const [priceRange, setPriceRange] = useState<[number, number]>(
    getDefaultPriceRange(filters.listingType || "all")
  );

  // Handle form submission
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
    
    // Update URL params
    updateURLWithFilters(filters, setSearchParams);
    
    // Close filter on mobile
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
    
    toast.success({
      title: "Filters Applied",
      description: "Your property filters have been updated."
    });
  };

  // Reset filters
  const handleResetFilters = () => {
    const defaultFilters: PropertyFilters = {
      city: "",
      minPrice: undefined,
      maxPrice: undefined,
      bedrooms: undefined,
      propertyType: [],
      amenities: [],
      furnished: "",
      listingType: "all",
    };
    
    setFilters(defaultFilters);
    setPriceRange(getDefaultPriceRange("all"));
    setSearchParams({});
    onFilterChange(defaultFilters);
    
    toast.success({
      title: "Filters Reset",
      description: "All property filters have been reset."
    });
  };

  // Handle property type checkbox change
  const handlePropertyTypeChange = (type: string) => {
    setFilters((prev) => {
      const newTypes = prev.propertyType?.includes(type)
        ? prev.propertyType.filter((t) => t !== type)
        : [...(prev.propertyType || []), type];
      
      return {
        ...prev,
        propertyType: newTypes,
      };
    });
  };

  // Handle amenity checkbox change
  const handleAmenityChange = (amenity: string) => {
    setFilters((prev) => {
      const newAmenities = prev.amenities?.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...(prev.amenities || []), amenity];
      
      return {
        ...prev,
        amenities: newAmenities,
      };
    });
  };

  // Handle price range change
  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };

  // Update price range when listing type changes
  useEffect(() => {
    const maxValue = filters.listingType === "rent" ? 100000 : 10000000;
    setPriceRange([
      filters.minPrice || 0,
      filters.maxPrice || maxValue,
    ]);
  }, [filters.listingType]);

  // Load filters from URL on mount
  useEffect(() => {
    const listingTypeParam = searchParams.get("listingType");
    if (listingTypeParam) {
      onFilterChange(filters);
    }
  }, []);

  return (
    <div className={className}>
      <div className="md:hidden my-4">
        <Button 
          onClick={() => setIsOpen(!isOpen)} 
          variant="outline" 
          className="w-full"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
      
      <div className={`${isOpen ? 'block' : 'hidden'} md:block bg-white p-4 rounded-lg shadow-sm border`}>
        <form onSubmit={handleFilterSubmit}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Filters</h3>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={handleResetFilters}
              >
                Reset
              </Button>
            </div>
            
            <div className="space-y-3">
              <ListingTypeFilter 
                value={filters.listingType || "all"} 
                onChange={(value) => setFilters({ ...filters, listingType: value as "rent" | "sale" | "all" })} 
              />
              
              <CityFilter 
                value={filters.city} 
                onChange={(value) => setFilters({ ...filters, city: value })} 
              />
              
              <BedroomsFilter 
                value={filters.bedrooms?.toString()} 
                onChange={(value) => setFilters({
                  ...filters,
                  bedrooms: value !== "any_bedrooms" ? parseInt(value) : undefined,
                })} 
              />
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <PriceRangeFilter 
                      minPrice={priceRange[0]} 
                      maxPrice={priceRange[1]}
                      maxPossiblePrice={filters.listingType === "rent" ? 100000 : 10000000}
                      step={filters.listingType === "rent" ? 1000 : 100000}
                      onPriceChange={handlePriceRangeChange}
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="propertyType">
                  <AccordionTrigger>Property Type</AccordionTrigger>
                  <AccordionContent>
                    <PropertyTypeFilter 
                      selectedTypes={filters.propertyType || []} 
                      onTypeChange={handlePropertyTypeChange} 
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="amenities">
                  <AccordionTrigger>Amenities</AccordionTrigger>
                  <AccordionContent>
                    <AmenitiesFilter 
                      selectedAmenities={filters.amenities || []} 
                      onAmenityChange={handleAmenityChange} 
                    />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="furnished">
                  <AccordionTrigger>Furnishing</AccordionTrigger>
                  <AccordionContent>
                    <FurnishingFilter 
                      value={filters.furnished} 
                      onChange={(value) => setFilters({ ...filters, furnished: value })} 
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <Button type="submit" className="w-full">Apply Filters</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyFilter;
