
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/lib/dummy-data";

interface CityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const CityFilter: React.FC<CityFilterProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="city">City</Label>
      <Select
        value={value || "all_cities"}
        onValueChange={(value) => onChange(value === "all_cities" ? "" : value)}
      >
        <SelectTrigger id="city">
          <SelectValue placeholder="All Cities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all_cities">All Cities</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CityFilter;
