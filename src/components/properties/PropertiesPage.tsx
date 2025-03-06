import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import Navbar from "../navigation/Navbar";
import PropertyMapSimple from "./PropertyMapSimple";
import { useProperties } from "./useProperties";
import { Property } from "@/services/api";

const PropertiesPage = () => {
  const { properties, loading, error, handleToggleFavorite } = useProperties();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([5000, 2000000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minBeds, setMinBeds] = useState(0);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

  useEffect(() => {
    if (properties.length > 0) {
      setPropertyTypes([
        ...new Set(properties.map((property) => property.type)),
      ]);
    }
  }, [properties]);

  const filteredProperties = properties.filter((property) => {
    // Search term filter
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Price range filter
    const matchesPrice =
      property.priceValue >= priceRange[0] &&
      property.priceValue <= priceRange[1];

    // Property type filter
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(property.type);

    // Beds filter
    const matchesBeds = property.beds >= minBeds;

    return matchesSearch && matchesPrice && matchesType && matchesBeds;
  });

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Properties
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our exclusive collection of luxury properties in the most
            desirable locations
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <Label htmlFor="search" className="mb-2 block">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Search by location or title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Price Range */}
            <div>
              <Label className="mb-2 block">Price Range</Label>
              <div className="pt-4">
                <Slider
                  defaultValue={[5000, 3000000]}
                  max={3000000}
                  min={5000}
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{(priceRange[0] / 1000).toFixed(0)}K TND</span>
                <span>{(priceRange[1] / 1000).toFixed(0)}K TND</span>
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <Label htmlFor="beds" className="mb-2 block">
                Minimum Bedrooms
              </Label>
              <div className="flex space-x-4">
                {[0, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    variant={minBeds === num ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMinBeds(num)}
                  >
                    {num === 0 ? "Any" : num + "+"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div>
              <Label className="mb-2 block">Property Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => handleTypeToggle(type)}
                    />
                    <label
                      htmlFor={`type-${type}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading properties...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PropertyCard
                  id={property.id}
                  image={property.image}
                  title={property.title}
                  price={property.price}
                  location={property.location}
                  beds={property.beds}
                  baths={property.baths}
                  sqft={property.sqft}
                  isFavorite={property.isFavorite}
                  onFavoriteClick={() => handleToggleFavorite(property.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>

      {/* Property Map Section */}
      <PropertyMapSimple />
    </div>
  );
};

export default PropertiesPage;
