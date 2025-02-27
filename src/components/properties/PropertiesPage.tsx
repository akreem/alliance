import React, { useState } from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import Navbar from "../navigation/Navbar";
import PropertyMap from "./PropertyMap";

interface Property {
  id: string;
  image: string;
  title: string;
  price: string;
  priceValue: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  isFavorite: boolean;
  type: string;
}

const properties: Property[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    title: "Luxury Villa in Sidi Bou Said",
    price: "1,200,000 TND",
    priceValue: 1200000,
    location: "Sidi Bou Said, Tunis",
    beds: 4,
    baths: 3,
    sqft: 3500,
    isFavorite: false,
    type: "Villa",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    title: "Modern Downtown Apartment",
    price: "850,000 TND",
    priceValue: 850000,
    location: "Les Berges du Lac, Tunis",
    beds: 3,
    baths: 2,
    sqft: 2800,
    isFavorite: true,
    type: "Apartment",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    title: "Elegant Beachfront Estate",
    price: "2,100,000 TND",
    priceValue: 2100000,
    location: "Hammamet, Tunisia",
    beds: 5,
    baths: 4,
    sqft: 4200,
    isFavorite: false,
    type: "Estate",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    title: "Waterfront Modern Villa",
    price: "1,800,000 TND",
    priceValue: 1800000,
    location: "Gammarth, Tunis",
    beds: 6,
    baths: 5,
    sqft: 5500,
    isFavorite: false,
    type: "Villa",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9",
    title: "Contemporary Home in Carthage",
    price: "950,000 TND",
    priceValue: 950000,
    location: "Carthage, Tunis",
    beds: 4,
    baths: 4,
    sqft: 3800,
    isFavorite: false,
    type: "House",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
    title: "Luxury Condo with Sea View",
    price: "750,000 TND",
    priceValue: 750000,
    location: "La Marsa, Tunis",
    beds: 2,
    baths: 2,
    sqft: 1800,
    isFavorite: false,
    type: "Condo",
  },
];

const PropertiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([500000, 2000000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minBeds, setMinBeds] = useState(0);

  const propertyTypes = [
    ...new Set(properties.map((property) => property.type)),
  ];

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
                  defaultValue={[500000, 2000000]}
                  max={3000000}
                  min={500000}
                  step={50000}
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
        {filteredProperties.length > 0 ? (
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
                  onFavoriteClick={() =>
                    console.log(`Toggled favorite for property ${property.id}`)
                  }
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
      <PropertyMap />
    </div>
  );
};

export default PropertiesPage;
