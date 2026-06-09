
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number; // in sq. ft.
    furnished: "fully" | "semi" | "unfurnished";
  };
  amenities: string[];
  type: "apartment" | "house" | "villa" | "plot" | "commercial";
  listingType: "rent" | "sale";
  images: string[];
  listedBy: {
    name: string;
    contactNumber: string;
    agency: string;
    source: "nobroker" | "99acres" | "housing.com" | "magicbricks" | "direct";
  };
  createdAt: string;
}

export type PropertyFilters = {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: string[];
  amenities?: string[];
  furnished?: string;
  listingType?: "rent" | "sale" | "all";
};
