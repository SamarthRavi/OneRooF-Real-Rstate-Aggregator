
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface PropertyTypeFilterProps {
  selectedTypes: string[];
  onTypeChange: (type: string) => void;
}

const PropertyTypeFilter: React.FC<PropertyTypeFilterProps> = ({ selectedTypes, onTypeChange }) => {
  const propertyTypes = ["apartment", "house", "villa", "plot", "commercial"];

  return (
    <div className="grid grid-cols-1 gap-2 pt-2">
      {propertyTypes.map((type) => (
        <div key={type} className="flex items-center space-x-2">
          <Checkbox
            id={`type-${type}`}
            checked={selectedTypes?.includes(type)}
            onCheckedChange={() => onTypeChange(type)}
          />
          <label
            htmlFor={`type-${type}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default PropertyTypeFilter;
