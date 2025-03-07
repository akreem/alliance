import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { AlertCircle, X, Upload, Image as ImageIcon } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Property, updatePropertyMainImage, updatePropertyImages } from "@/services/api";

interface PropertyImageManagerProps {
  property: Property;
  onSuccess?: () => void;
}

const PropertyImageManager = ({ property, onSuccess }: PropertyImageManagerProps) => {
  const [mainImage, setMainImage] = useState<string>("");
  const [additionalImages, setAdditionalImages] = useState<string>("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (property) {
      // Set main image
      if (property.images && property.images.length > 0) {
        setMainImage(property.images[0]);
        setPreviewImages([property.images[0]]);
      }

      // Set additional images
      if (property.images && property.images.length > 1) {
        setAdditionalImages(property.images.slice(1).join("\n"));
        setPreviewImages(property.images);
      }
    }
  }, [property]);

  const validateImageUrl = (url: string): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return url.match(/\.(jpg|jpeg|png|webp|avif|gif)$/) !== null;
    } catch {
      return false;
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setImageError(null);
    setSuccessMessage(null);

    if (value && !validateImageUrl(value)) {
      setImageError("Please enter a valid image URL (ending in .jpg, .png, .webp, etc.)");
      return;
    }

    setMainImage(value);
    if (value) {
      setPreviewImages(prev => [value, ...prev.slice(1)]);
    } else {
      setPreviewImages(prev => prev.slice(1));
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setImageError(null);
    setSuccessMessage(null);
    setAdditionalImages(value);

    if (value) {
      const urls = value.split("\n").filter(url => url.trim() !== "");
      const validUrls = urls.filter(validateImageUrl);
      if (validUrls.length !== urls.length) {
        setImageError("Some image URLs are invalid. Please check the format.");
      }
      setPreviewImages([mainImage, ...validUrls]);
    } else {
      setPreviewImages([mainImage]);
    }
  };

  const removeImage = (index: number) => {
    if (index === 0) {
      setMainImage("");
    } else {
      const newAdditionalImages = additionalImages
        .split("\n")
        .filter((_, i) => i !== index - 1)
        .join("\n");
      setAdditionalImages(newAdditionalImages);
    }
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateMainImage = async () => {
    if (!mainImage) {
      setImageError("Main image URL is required");
      return;
    }

    if (!validateImageUrl(mainImage)) {
      setImageError("Please enter a valid image URL");
      return;
    }

    setLoading(true);
    setError(null);
    setImageError(null);
    setSuccessMessage(null);

    try {
      const result = await updatePropertyMainImage(property.id, mainImage);
      if (result) {
        setSuccessMessage("Main image updated successfully");
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error("Failed to update main image:", err);
      setError("Failed to update main image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAllImages = async () => {
    setLoading(true);
    setError(null);
    setImageError(null);
    setSuccessMessage(null);

    try {
      // Validate all image URLs
      const additionalImagesList = additionalImages
        ? additionalImages
            .split("\n")
            .map((img) => img.trim())
            .filter((img) => img !== "")
        : [];

      const allImages = [mainImage, ...additionalImagesList];
      const invalidImages = allImages.filter(url => url && !validateImageUrl(url));

      if (invalidImages.length > 0) {
        setImageError("Some image URLs are invalid. Please check the format.");
        setLoading(false);
        return;
      }

      if (allImages.length === 0 || !allImages[0]) {
        setImageError("At least one image is required");
        setLoading(false);
        return;
      }

      const result = await updatePropertyImages(property.id, allImages.filter(Boolean));
      if (result) {
        setSuccessMessage("All images updated successfully");
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error("Failed to update images:", err);
      setError("Failed to update images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Property Images
        </h3>
        
        <div>
          <Label htmlFor="mainImage">Main Image URL</Label>
          <Input
            id="mainImage"
            value={mainImage}
            onChange={handleMainImageChange}
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-sm text-gray-500 mt-1">
            This will be the primary image displayed for the property
          </p>
        </div>

        <div>
          <Label htmlFor="additionalImages">Additional Image URLs (one per line)</Label>
          <Textarea
            id="additionalImages"
            value={additionalImages}
            onChange={handleAdditionalImagesChange}
            placeholder="https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
            rows={4}
          />
        </div>

        {imageError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{imageError}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previewImages.map((url, index) => (
            <Card key={`${url}-${index}`} className="relative group">
              <img
                src={url}
                alt={`Property image ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Invalid+Image";
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 text-sm rounded">
                  Main Image
                </span>
              )}
            </Card>
          ))}
        </div>

        <div className="flex gap-4">
          <Button 
            type="button" 
            onClick={handleUpdateMainImage} 
            disabled={loading}
            variant="outline"
          >
            Update Main Image Only
          </Button>
          <Button 
            type="button" 
            onClick={handleUpdateAllImages} 
            disabled={loading}
          >
            {loading ? "Updating..." : "Update All Images"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyImageManager; 