import { useState, useEffect } from "react";
import {
  getProperty,
  toggleFavorite,
  Property,
  getProperties,
} from "@/services/api";

export const usePropertyDetail = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      // Check if we have property data from a direct API call
      if (window.propertyData && window.propertyData.id.toString() === id) {
        setProperty(window.propertyData);
        window.propertyData = null;
        setError(null);
        setLoading(false);
        return;
      }

      // Try to get property from the API
      const data = await getProperty(id);
      if (data) {
        setProperty(data);
        setError(null);
      } else {
        // If property not found, try to get it from the properties list
        const allProperties = await getProperties();
        const foundProperty = allProperties.find((p) => p.id.toString() === id);
        if (foundProperty) {
          setProperty(foundProperty);
          setError(null);
        } else {
          setError(`Failed to fetch property ${id}`);
        }
      }
    } catch (err) {
      setError(`Failed to fetch property ${id}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!property) return null;

    try {
      const result = await toggleFavorite(id);
      if (result) {
        setProperty((prev) =>
          prev ? { ...prev, isFavorite: result.isFavorite } : null,
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
    fetchProperty();
  }, [id]);

  return {
    property,
    loading,
    error,
    fetchProperty,
    handleToggleFavorite,
  };
};
