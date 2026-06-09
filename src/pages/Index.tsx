
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ExploreByCities from "@/components/home/ExploreByCities";
import PropertyTypesSection from "@/components/home/PropertyTypesSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import TrustedPartners from "@/components/home/TrustedPartners";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ExploreByCities />
      <PropertyTypesSection />
      <FeaturedProperties />
      <HowItWorks />
      <Newsletter />
      <TrustedPartners />
    </Layout>
  );
};

export default Index;
