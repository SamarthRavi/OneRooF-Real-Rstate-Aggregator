
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { amenities } from "@/lib/dummy-data";

interface AmenitiesFilterProps {
  selectedAmenities: string[];
  onAmenityChange: (amenity: string) => void;
}

const AmenitiesFilter: React.FC<AmenitiesFilterProps> = ({ selectedAmenities, onAmenityChange }) => {
  return (
    <div className="grid grid-cols-1 gap-2 pt-2">
      {amenities.slice(0, 8).map((amenity) => (
        <div key={amenity} className="flex items-center space-x-2">
          <Checkbox
            id={`amenity-${amenity.replace(/\s+/g, "-").toLowerCase()}`}
            checked={selectedAmenities?.includes(amenity)}
            onCheckedChange={() => onAmenityChange(amenity)}
          />
          <label
            htmlFor={`amenity-${amenity.replace(/\s+/g, "-").toLowerCase()}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {amenity}
          </label>
        </div>
      ))}
    </div>
  );
};

export default AmenitiesFilter;
