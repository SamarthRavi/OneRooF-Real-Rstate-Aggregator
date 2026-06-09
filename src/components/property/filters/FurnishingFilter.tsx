
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FurnishingFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const FurnishingFilter: React.FC<FurnishingFilterProps> = ({ value, onChange }) => {
  const furnishingOptions = ["fully", "semi", "unfurnished"];

  return (
    <div className="pt-2">
      <Select
        value={value || "any_furnishing"}
        onValueChange={(value) => onChange(value === "any_furnishing" ? "" : value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any_furnishing">Any</SelectItem>
          {furnishingOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FurnishingFilter;
