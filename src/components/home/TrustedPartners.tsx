
import React from "react";

const TrustedPartners = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Data Sources</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We aggregate listings from India's most trusted real estate platforms
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
          <div className="text-2xl font-bold text-gray-400">NoBroker</div>
          <div className="text-2xl font-bold text-gray-400">99acres</div>
          <div className="text-2xl font-bold text-gray-400">Housing.com</div>
          <div className="text-2xl font-bold text-gray-400">MagicBricks</div>
          <div className="text-2xl font-bold text-gray-400">Square Yards</div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
