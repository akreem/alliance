import React, { useEffect } from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { useProperties } from "./useProperties";
import { Property } from "@/services/api";

interface FeaturedPropertiesProps {
  properties?: Property[];
}

const FeaturedProperties = ({
  properties: propProperties,
}: FeaturedPropertiesProps) => {
  const { properties, loading, error, handleToggleFavorite, fetchProperties } =
    useProperties();

  // Make sure we have the latest properties
  useEffect(() => {
    console.log("FeaturedProperties: Fetching properties...");
    fetchProperties();
  }, []);

  // Use provided properties or fetched properties
  const displayProperties = propProperties || properties;
  
  console.log("FeaturedProperties: Display properties:", displayProperties);
  
  return (
    <section className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Propriétés en vedette
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez notre sélection de propriétés de luxe dans les
            emplacements les plus recherchés
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Chargement des propriétés...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        ) : displayProperties && displayProperties.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          >
            {displayProperties.map((property, index) => (
              <motion.div
                key={property.id || index}
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
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Aucune propriété disponible pour le moment</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
