import React from "react";
import Navbar from "./navigation/Navbar";
import HeroSection from "./hero/HeroSection";
import FeaturedProperties from "./properties/FeaturedProperties";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Properties Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FeaturedProperties />
      </motion.div>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 text-white py-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our team of luxury real estate experts to begin your journey
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
            Contact Us
          </button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Luxury Estates</h3>
            <p className="text-gray-600">
              Your premier destination for luxury real estate
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Properties</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Featured Listings</li>
              <li>New Developments</li>
              <li>Exclusive Estates</li>
              <li>Property Search</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li>About Us</li>
              <li>Our Team</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; 2024 Luxury Estates. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
