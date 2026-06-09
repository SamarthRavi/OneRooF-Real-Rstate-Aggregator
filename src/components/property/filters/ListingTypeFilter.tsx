
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyFilters } from "@/types/property";

interface ListingTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const ListingTypeFilter: React.FC<ListingTypeFilterProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="listingType">Listing Type</Label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value)}
      >
        <SelectTrigger id="listingType">
          <SelectValue placeholder="All Properties" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Properties</SelectItem>
          <SelectItem value="rent">For Rent</SelectItem>
          <SelectItem value="sale">For Sale</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ListingTypeFilter;
