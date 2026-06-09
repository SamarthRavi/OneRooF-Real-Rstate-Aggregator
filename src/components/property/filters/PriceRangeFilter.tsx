
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  maxPossiblePrice: number;
  step: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ 
  minPrice, 
  maxPrice, 
  maxPossiblePrice, 
  step,
  onPriceChange 
}) => {
  return (
    <div className="pt-4">
      <Slider
        defaultValue={[0, maxPossiblePrice]}
        value={[minPrice, maxPrice]}
        max={maxPossiblePrice}
        step={step}
        onValueChange={(values) => onPriceChange(values[0], values[1])}
        className="mb-6"
      />
      <div className="flex justify-between">
        <div>
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              onPriceChange(value, maxPrice);
            }}
          />
        </div>
        <div>
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              onPriceChange(minPrice, value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
