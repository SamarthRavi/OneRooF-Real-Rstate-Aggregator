
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";
import { dummyProperties } from "@/lib/dummy-data";

const FeaturedProperties = () => {
  const featuredProperties = dummyProperties.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
            <p className="text-gray-600">
              Handpicked properties from top sources across India
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/properties">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
