import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  createProperty,
  updateProperty,
  updatePropertyImages,
  Property,
  getAgents,
  Agent,
} from "@/services/api";
import { Card } from "../ui/card";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface PropertyFormProps {
  property?: Property;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PropertyForm = ({ property, onSuccess, onCancel }: PropertyFormProps) => {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    price: "",
    priceValue: 0,
    location: "",
    beds: 0,
    baths: 0,
    sqft: 0,
    type: "",
    description: "",
    image: "",
    features: [],
    lat: 0,
    lng: 0,
  });

  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [features, setFeatures] = useState<string>("");
  const [additionalImages, setAdditionalImages] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch agents
    const fetchAgents = async () => {
      try {
        const agentsData = await getAgents();
        setAgents(agentsData);
      } catch (err) {
        console.error("Failed to fetch agents:", err);
      }
    };

    fetchAgents();

    // If editing, populate form with property data
    if (property) {
      setFormData({
        ...property,
      });

      if (property.features) {
        setFeatures(property.features.join("\n"));
      }

      if (property.images && property.images.length > 1) {
        setAdditionalImages(property.images.slice(1).join("\n"));
      }

      if (property.agent) {
        setSelectedAgent(property.agent.email);
      }
    }
  }, [property]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "priceValue" ||
        name === "beds" ||
        name === "baths" ||
        name === "sqft" ||
        name === "lat" ||
        name === "lng"
          ? Number(value)
          : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateImageUrl = (url: string): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return url.match(/\.(jpg|jpeg|png|webp|avif|gif)$/) !== null;
    } catch {
      return false;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isMainImage: boolean = false) => {
    const { value } = e.target;
    setImageError(null);

    if (value && !validateImageUrl(value)) {
      setImageError("Please enter a valid image URL (ending in .jpg, .png, .webp, etc.)");
      return;
    }

    if (isMainImage) {
      setFormData(prev => ({ ...prev, image: value }));
      if (value) setPreviewImages(prev => [value, ...prev.slice(1)]);
    } else {
      setAdditionalImages(value);
      if (value) {
        const urls = value.split("\n").filter(url => url.trim() !== "");
        const validUrls = urls.filter(validateImageUrl);
        if (validUrls.length !== urls.length) {
          setImageError("Some image URLs are invalid. Please check the format.");
        }
        setPreviewImages([formData.image as string, ...validUrls]);
      }
    }
  };

  const removeImage = (index: number) => {
    if (index === 0) {
      setFormData(prev => ({ ...prev, image: "" }));
    } else {
      const newAdditionalImages = additionalImages
        .split("\n")
        .filter((_, i) => i !== index - 1)
        .join("\n");
      setAdditionalImages(newAdditionalImages);
    }
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setImageError(null);

    try {
      // Process features
      const featuresList = features
        .split("\n")
        .map((feature) => feature.trim())
        .filter((feature) => feature !== "");

      // Validate all image URLs
      const mainImage = formData.image as string;
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

      // Prepare data for API
      const propertyData = {
        ...formData,
        features: featuresList,
        agentEmail: selectedAgent || undefined,
      };

      // Remove images from propertyData as we'll handle them separately
      delete propertyData.images;

      let savedProperty;
      if (property?.id) {
        // Update existing property
        savedProperty = await updateProperty(property.id, propertyData);
        
        // Update property images separately
        if (savedProperty) {
          await updatePropertyImages(property.id, allImages.filter(Boolean));
        }
      } else {
        // For new properties, include images in the initial creation
        savedProperty = await createProperty({
          ...propertyData,
          images: allImages.filter(Boolean),
        });
      }

      if (onSuccess && savedProperty) {
        onSuccess();
      }
    } catch (err) {
      console.error("Failed to save property:", err);
      setError("Failed to save property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const propertyTypes = ["Villa", "Apartment", "House", "Condo", "Estate"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Luxury Villa with Ocean View"
            />
          </div>

          <div>
            <Label htmlFor="price">Price (Display Format)</Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="1,200,000 TND"
            />
          </div>

          <div>
            <Label htmlFor="priceValue">Price Value (Numeric)</Label>
            <Input
              id="priceValue"
              name="priceValue"
              type="number"
              value={formData.priceValue}
              onChange={handleChange}
              required
              placeholder="1200000"
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Sidi Bou Said, Tunis"
            />
          </div>

          <div>
            <Label htmlFor="type">Property Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="agent">Assign Agent</Label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.email} value={agent.email}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="beds">Beds</Label>
              <Input
                id="beds"
                name="beds"
                type="number"
                value={formData.beds}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="baths">Baths</Label>
              <Input
                id="baths"
                name="baths"
                type="number"
                value={formData.baths}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="sqft">Square Feet</Label>
              <Input
                id="sqft"
                name="sqft"
                type="number"
                value={formData.sqft}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lat">Latitude</Label>
              <Input
                id="lat"
                name="lat"
                type="number"
                step="0.0001"
                value={formData.lat}
                onChange={handleChange}
                placeholder="36.8702"
              />
            </div>
            <div>
              <Label htmlFor="lng">Longitude</Label>
              <Input
                id="lng"
                name="lng"
                type="number"
                step="0.0001"
                value={formData.lng}
                onChange={handleChange}
                placeholder="10.3417"
              />
            </div>
          </div>

          <div className="space-y-4 col-span-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Property Images</h3>
              
              <div>
                <Label htmlFor="mainImage">Main Image URL</Label>
                <Input
                  id="mainImage"
                  name="image"
                  value={formData.image}
                  onChange={(e) => handleImageChange(e, true)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="additionalImages">Additional Image URLs (one per line)</Label>
                <Textarea
                  id="additionalImages"
                  value={additionalImages}
                  onChange={(e) => handleImageChange(e as any)}
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
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Detailed description of the property..."
          className="min-h-[150px]"
        />
      </div>

      <div>
        <Label htmlFor="features">Features (One feature per line)</Label>
        <Textarea
          id="features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          placeholder="Private swimming pool\nPanoramic sea views\nLandscaped gardens"
          className="min-h-[150px]"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end gap-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : property ? "Update Property" : "Create Property"}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
