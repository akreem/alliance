import { useState, useEffect } from "react";
import {
  getProperties,
  getProperty,
  toggleFavorite,
  Property,
} from "@/services/api";

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await getProperties();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch properties");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperty = async (id: string) => {
    setLoading(true);
    try {
      const property = await getProperty(id);
      return property;
    } catch (err) {
      setError(`Failed to fetch property ${id}`);
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const result = await toggleFavorite(id);
      if (result) {
        setProperties((prevProperties) =>
          prevProperties.map((property) =>
            property.id === id
              ? { ...property, isFavorite: result.isFavorite }
              : property,
          ),
        );
      }
      return result;
    } catch (err) {
      setError(`Failed to toggle favorite for property ${id}`);
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    fetchProperty,
    handleToggleFavorite,
  };
};
