
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cities } from "@/lib/dummy-data";
import { getCityImage } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const ExploreByCities = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore by City</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover properties across India's major cities with comprehensive listings from all major platforms
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cities.slice(0, 10).map((city, index) => (
            <HoverCard key={city} openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Link
                  to={`/properties?city=${city}`}
                  className="block group transition-all duration-300 hover:-translate-y-1"
                >
                  <Card className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-0">
                      <div 
                        className="aspect-[4/3] relative bg-cover bg-center" 
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-${getCityImage(city, index)}')`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-primary/80 group-hover:via-primary/40 transition-colors duration-300" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-semibold text-lg drop-shadow-lg">{city}</h3>
                          <p className="text-white/90 text-sm font-medium drop-shadow-lg">
                            {getCityPropertyCount(city)} Properties
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-0 shadow-xl">
                <div 
                  className="aspect-video w-full bg-cover bg-center" 
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-${getCityImage(city, index)}')`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent/20" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-1">{city}</h3>
                    <p className="text-white/95 text-sm font-medium mb-2">
                      {getCityPropertyCount(city)} Properties Available
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-primary/90 hover:bg-primary text-white text-xs py-1 px-3 h-auto"
                      asChild
                    >
                      <Link to={`/properties?city=${city}`}>
                        View Properties <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="px-6 py-5 h-auto text-base font-medium hover:bg-primary hover:text-white transition-colors duration-300">
            <Link to="/properties">
              View All Cities <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Helper function to get consistent property counts for cities
const getCityPropertyCount = (city: string): number => {
  const cityCounts: Record<string, number> = {
    'Mumbai': 217,
    'Delhi': 355,
    'Bangalore': 307,
    'Hyderabad': 403,
    'Chennai': 363,
    'Kolkata': 292,
    'Pune': 285,
    'Ahmedabad': 369,
    'Jaipur': 320,
    'Surat': 395,
    'Lucknow': 248,
    'Kanpur': 183,
    'Nagpur': 201,
    'Indore': 175,
    'Thane': 230,
  };
  
  return cityCounts[city] || Math.floor(Math.random() * 200) + 150;
};

export default ExploreByCities;
