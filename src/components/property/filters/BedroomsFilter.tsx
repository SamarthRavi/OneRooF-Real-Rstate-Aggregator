
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BedroomsFilterProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const BedroomsFilter: React.FC<BedroomsFilterProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Select
        value={value?.toString() || "any_bedrooms"}
        onValueChange={(value) => onChange(value)}
      >
        <SelectTrigger id="bedrooms">
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any_bedrooms">Any</SelectItem>
          {[1, 2, 3, 4, 5].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num}+
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BedroomsFilter;
