import { useState, useEffect } from "react";
import { getProperty, toggleFavorite, Property } from "@/services/api";

export const usePropertyDetail = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const data = await getProperty(id);
      setProperty(data);
      setError(null);
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
