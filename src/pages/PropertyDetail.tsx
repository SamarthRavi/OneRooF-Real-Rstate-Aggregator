
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, Calendar, Heart, Share } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { fetchPropertyById } from "@/services/propertyService";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchPropertyById(id || ''),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-96 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-32 bg-gray-200 rounded mb-6"></div>
              </div>
              <div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !property) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
            <p className="text-gray-600 mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/properties")}>
              Browse All Properties
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const {
    title,
    description,
    price,
    currency,
    location,
    features,
    amenities,
    type,
    listingType,
    images,
    listedBy,
    createdAt,
  } = property;

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <Link
              to="/properties"
              className="text-primary hover:text-primary-600 mb-2 inline-block"
            >
              ← Back to Properties
            </Link>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-gray-600 mt-1">{location.address}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden mb-8">
          <div className="aspect-video relative">
            <img
              src={images[0]}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-md ${
                  listingType === "rent"
                    ? "bg-secondary text-white"
                    : "bg-accent text-white"
                }`}
              >
                {listingType === "rent" ? "For Rent" : "For Sale"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-700">{features.bedrooms} Bedrooms</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-700">{features.bathrooms} Bathrooms</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Maximize className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-700">{features.area} sq.ft</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-700">
                      {new Date(createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg border sticky top-24">
              <div className="text-2xl font-bold text-primary mb-2">
                {formatCurrency(price, currency)}
                {listingType === "rent" && (
                  <span className="text-base font-normal text-gray-500">
                    {" "}
                    / month
                  </span>
                )}
              </div>
              <div className="border-t border-b py-4 my-4">
                <h3 className="font-semibold mb-2">Listed by:</h3>
                <p className="text-gray-700">{listedBy.agency}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Source: {listedBy.source}
                </p>
              </div>
              <Button className="w-full mb-2">Contact Agent</Button>
              <Button variant="outline" className="w-full">
                Book a Viewing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;
