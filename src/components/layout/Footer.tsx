import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-gray-100 border-t">
      <div className="container px-4 py-10 mx-auto md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="font-bold text-2xl text-primary">
                One<span className="text-accent">RooF</span>
              </div>
            </Link>
            <p className="text-sm text-gray-600">
              India's most comprehensive real estate aggregator, bringing you listings from NoBroker, 99acres, Housing.com, and more.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?listingType=rent" className="text-sm text-gray-600 hover:text-primary">
                  Rent
                </Link>
              </li>
              <li>
                <Link to="/properties?listingType=sale" className="text-sm text-gray-600 hover:text-primary">
                  Buy
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-sm text-gray-600 hover:text-primary">
                  Map View
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">Popular Cities</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?city=Mumbai" className="text-sm text-gray-600 hover:text-primary">
                  Mumbai
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Delhi" className="text-sm text-gray-600 hover:text-primary">
                  Delhi
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Bangalore" className="text-sm text-gray-600 hover:text-primary">
                  Bangalore
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Hyderabad" className="text-sm text-gray-600 hover:text-primary">
                  Hyderabad
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600">
            © {new Date().getFullYear()} OneRooF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;