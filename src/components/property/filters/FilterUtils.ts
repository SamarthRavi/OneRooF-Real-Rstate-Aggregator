
import { PropertyFilters } from "@/types/property";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Utility function to extract filters from URL parameters
export const useURLFilters = (): [PropertyFilters, React.Dispatch<React.SetStateAction<PropertyFilters>>] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<PropertyFilters>({});
  
  // Extract filters from URL parameters
  useEffect(() => {
    const urlFilters: PropertyFilters = {
      city: searchParams.get("city") || "",
      minPrice: searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : undefined,
      maxPrice: searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined,
      bedrooms: searchParams.get("bedrooms") ? parseInt(searchParams.get("bedrooms")!) : undefined,
      propertyType: searchParams.get("propertyType") ? searchParams.get("propertyType")!.split(",") : [],
      amenities: searchParams.get("amenities") ? searchParams.get("amenities")!.split(",") : [],
      furnished: searchParams.get("furnished") || "",
      listingType: (searchParams.get("listingType") as "rent" | "sale" | "all") || "all",
    };
    
    setFilters(urlFilters);
  }, [searchParams]);
  
  return [filters, setFilters];
};

// Utility function to update URL with current filters
export const updateURLWithFilters = (filters: PropertyFilters, setSearchParams: any) => {
  const params = new URLSearchParams();
  if (filters.city) params.append("city", filters.city);
  if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
  if (filters.bedrooms) params.append("bedrooms", filters.bedrooms.toString());
  if (filters.propertyType && filters.propertyType.length > 0) params.append("propertyType", filters.propertyType.join(","));
  if (filters.amenities && filters.amenities.length > 0) params.append("amenities", filters.amenities.join(","));
  if (filters.furnished) params.append("furnished", filters.furnished);
  if (filters.listingType && filters.listingType !== "all") params.append("listingType", filters.listingType);
  
  setSearchParams(params);
};

// Calculate default price range based on listing type
export const getDefaultPriceRange = (listingType: string): [number, number] => {
  const maxValue = listingType === "rent" ? 100000 : 10000000;
  return [0, maxValue];
};
