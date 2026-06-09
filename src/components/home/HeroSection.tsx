
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Map, Home, Building } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?city=${searchQuery}`);
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60 z-10" />
      <div
        className="h-[650px] bg-cover bg-center bg-fixed transition-all duration-1000"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="container absolute inset-0 z-20 flex items-center">
        <div 
          className={`max-w-2xl text-white transition-all duration-1000 ease-in-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md">
            Find Your Perfect Home Across India
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 drop-shadow-sm">
            OneRooF aggregates listings from top real estate portals to help you find the best properties for rent or sale.
          </p>
          <form 
            onSubmit={handleSearch} 
            className={`flex gap-2 max-w-md mb-8 transition-all duration-1000 delay-300 ease-in-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative flex-grow">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter city, locality or project..."
                className="pl-10 bg-white/90 backdrop-blur-sm text-gray-800 h-12 border-2 border-transparent focus:border-accent transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="bg-accent hover:bg-accent-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 duration-300"
            >
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
          <div 
            className={`flex flex-wrap gap-4 transition-all duration-1000 delay-500 ease-in-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Button 
              asChild 
              variant="outline" 
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/40 hover:border-white/50 transition-all transform hover:-translate-y-1 hover:shadow-lg duration-300"
            >
              <Link to="/properties?listingType=rent">
                <Home className="mr-2 h-4 w-4" /> Rent a Home
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/40 hover:border-white/50 transition-all transform hover:-translate-y-1 hover:shadow-lg duration-300"
            >
              <Link to="/properties?listingType=sale">
                <Building className="mr-2 h-4 w-4" /> Buy a Home
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/40 hover:border-white/50 transition-all transform hover:-translate-y-1 hover:shadow-lg duration-300"
            >
              <Link to="/map">
                <Map className="mr-2 h-4 w-4" /> Map View
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
