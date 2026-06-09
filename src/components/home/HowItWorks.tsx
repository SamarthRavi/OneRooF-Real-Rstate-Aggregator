
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">How OneRooF Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We aggregate property listings from India's top real estate websites to give you the most comprehensive selection
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary-100 to-white">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Search Everywhere at Once</h3>
              <p className="text-gray-600">
                We bring together listings from NoBroker, 99acres, Housing.com and more, so you don't have to check multiple sites.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-gradient-to-br from-secondary-100 to-white">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Compare Properties Easily</h3>
              <p className="text-gray-600">
                Use our powerful filters to narrow down your search and find exactly what you're looking for.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-gradient-to-br from-accent-100 to-white">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Contact Directly</h3>
              <p className="text-gray-600">
                Connect with property owners or agents directly through the original listing source.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
