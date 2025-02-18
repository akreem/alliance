import React from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";

interface Property {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  isFavorite: boolean;
}

interface FeaturedPropertiesProps {
  properties?: Property[];
}

const defaultProperties: Property[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    title: "Luxury Villa with Ocean View",
    price: "$2,500,000",
    location: "Malibu, CA",
    beds: 4,
    baths: 3,
    sqft: 3500,
    isFavorite: false,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    title: "Modern Downtown Penthouse",
    price: "$3,200,000",
    location: "Beverly Hills, CA",
    beds: 3,
    baths: 2,
    sqft: 2800,
    isFavorite: true,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    title: "Elegant Country Estate",
    price: "$4,100,000",
    location: "Santa Barbara, CA",
    beds: 5,
    baths: 4,
    sqft: 4200,
    isFavorite: false,
  },
];

const FeaturedProperties = ({
  properties = defaultProperties,
}: FeaturedPropertiesProps) => {
  return (
    <section className="w-full min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of luxury properties in the most
            desirable locations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PropertyCard
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
      </div>
    </section>
  );
};

export default FeaturedProperties;
