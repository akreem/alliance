import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import Navbar from "../navigation/Navbar";
import PropertyMap from "./PropertyMap";
import { useProperties } from "./useProperties";
import { Property } from "@/services/api";

const PropertiesPage = () => {
  const { properties, loading, error, handleToggleFavorite, fetchProperties } =
    useProperties();

  // Force fetch properties when component mounts
  useEffect(() => {
    console.log("PropertiesPage: Fetching properties...");
    fetchProperties().then(() => {
      console.log("PropertiesPage: Properties fetch completed");
    }).catch(err => {
      console.error("PropertiesPage: Error fetching properties:", err);
    });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minBeds, setMinBeds] = useState(0);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

  useEffect(() => {
    console.log("Properties updated:", properties);
    if (properties.length > 0) {
      // Extract unique property types
      const types = [...new Set(properties.map((property) => property.type))];
      console.log("Available property types:", types);
      setPropertyTypes(types);
      
      // Log price ranges to debug
      const prices = properties.map(p => p.priceValue || 0);
      console.log("Price range in data:", Math.min(...prices), "to", Math.max(...prices));
    }
  }, [properties]);

  const filteredProperties = properties.filter((property) => {
    // Ensure property has all required fields
    if (!property || !property.title || !property.location) {
      console.warn("Skipping property with missing data:", property);
      return false;
    }

    // Search term filter
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Price range filter - handle missing or string priceValue
    let propertyPrice = 0;
    if (typeof property.priceValue === 'number') {
      propertyPrice = property.priceValue;
    } else if (property.price) {
      // Try to extract numeric value from price string
      const priceMatch = property.price.match(/\d+/g);
      if (priceMatch) {
        propertyPrice = parseInt(priceMatch.join(''), 10);
      }
    }
    
    console.log(`Property ${property.id} price: ${propertyPrice}, Range: ${priceRange[0]}-${priceRange[1]}, Matches: ${propertyPrice >= priceRange[0] && propertyPrice <= priceRange[1]}`);
    
    const matchesPrice =
      propertyPrice >= priceRange[0] && propertyPrice <= priceRange[1];

    // Property type filter - handle missing type
    const propertyType = property.type || "Unknown";
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(propertyType);

    // Beds filter - handle missing beds
    const propertyBeds = property.beds || 0;
    const matchesBeds = propertyBeds >= minBeds;

    // Log filtering results for debugging
    const result = matchesSearch && matchesPrice && matchesType && matchesBeds;
    if (!result) {
      console.log(`Property ${property.id} filtered out: search=${matchesSearch}, price=${matchesPrice}, type=${matchesType}, beds=${matchesBeds}`);
    }

    return result;
  });

  console.log("Filtered properties:", filteredProperties.length, "out of", properties.length);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // Add a function to reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 1000000]);
    setSelectedTypes([]);
    setMinBeds(0);
    console.log("Filters reset");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nos Propriétés
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez notre collection exclusive de propriétés de luxe dans les
            emplacements les plus recherchés
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filtres</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFilters}
            >
              Réinitialiser les filtres
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <Label htmlFor="search" className="mb-2 block">
                Recherche
              </Label>
              <Input
                id="search"
                placeholder="Rechercher par lieu ou titre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Price Range */}
            <div>
              <Label className="mb-2 block">Fourchette de prix</Label>
              <div className="pt-4">
                <Slider
                  defaultValue={[0, 1000000]}
                  max={1000000}
                  min={0}
                  step={10000}
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
                Chambres minimum
              </Label>
              <div className="flex space-x-4">
                {[0, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    variant={minBeds === num ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMinBeds(num)}
                  >
                    {num === 0 ? "Toutes" : num + "+"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div>
              <Label className="mb-2 block">Type de propriété</Label>
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
            <p className="text-xl">Chargement des propriétés...</p>
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
              Aucune propriété trouvée
            </h3>
            <p className="text-gray-600">
              Essayez d'ajuster vos filtres pour voir plus de résultats
            </p>
          </div>
        )}

        {/* Property Map Section */}
        <PropertyMap properties={filteredProperties} />
      </div>
    </div>
  );
};

export default PropertiesPage;
