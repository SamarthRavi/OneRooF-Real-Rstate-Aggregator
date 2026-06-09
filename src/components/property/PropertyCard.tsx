
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Property } from "@/types/property";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const {
    id,
    title,
    price,
    currency,
    location,
    features,
    listingType,
    images,
    listedBy,
  } = property;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <Link to={`/property/${id}`} className="flex-grow flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={images[0]}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
          <div className="absolute top-2 left-2">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-md ${
                listingType === "rent"
                  ? "bg-secondary text-white"
                  : "bg-accent text-white"
              }`}
            >
              {listingType === "rent" ? "For Rent" : "For Sale"}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 text-xs font-medium bg-white bg-opacity-85 rounded-md">
              {listedBy.source}
            </span>
          </div>
        </div>

        <CardContent className="p-4 flex-grow">
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">
                {title}
              </h3>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="line-clamp-1">
                  {location.address}, {location.city}
                </span>
              </div>
            </div>

            <div className="mt-3 mb-2">
              <div className="text-xl font-bold text-primary">
                {formatCurrency(price, currency)}
                {listingType === "rent" && (
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    / month
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-auto pt-4">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-sm">{features.bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-sm">{features.bathrooms} Baths</span>
              </div>
              <div className="flex items-center">
                <Maximize className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-sm">{features.area} sq.ft</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0 border-t flex items-center justify-between text-sm text-gray-500">
        <div>Listed by {listedBy.agency}</div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
