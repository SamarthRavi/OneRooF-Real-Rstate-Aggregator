
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Building, BuildingIcon, Home as HomeIcon } from "lucide-react";
import { LucideIcon } from "lucide-react";

type PropertyType = {
  name: string;
  icon: LucideIcon;
  count: number;
};

const PropertyTypesSection = () => {
  const propertyTypes: PropertyType[] = [
    { name: "Apartments", icon: BuildingIcon, count: 254 },
    { name: "Houses", icon: HomeIcon, count: 178 },
    { name: "Villas", icon: Building, count: 65 },
    { name: "Commercial", icon: Building, count: 93 },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Browse by Property Type</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect property that suits your needs
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {propertyTypes.map((type) => (
            <Link
              key={type.name}
              to={`/properties?propertyType=${type.name.toLowerCase()}`}
              className="block group"
            >
              <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-4 bg-primary/5 rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
                    <type.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-500">{type.count} Properties</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypesSection;
