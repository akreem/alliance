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
  Property,
  getAgents,
  Agent,
} from "@/services/api";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Process features
      const featuresList = features
        .split("\n")
        .map((feature) => feature.trim())
        .filter((feature) => feature !== "");

      // Process additional images
      const imagesList = [formData.image as string];
      if (additionalImages) {
        const additionalImagesList = additionalImages
          .split("\n")
          .map((img) => img.trim())
          .filter((img) => img !== "");
        imagesList.push(...additionalImagesList);
      }

      // Prepare data for API
      const propertyData = {
        ...formData,
        features: featuresList,
        images: imagesList,
        agentEmail: selectedAgent || undefined,
      };

      if (property?.id) {
        // Update existing property
        await updateProperty(property.id, propertyData);
      } else {
        // Create new property
        await createProperty(propertyData);
      }

      if (onSuccess) {
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

          <div>
            <Label htmlFor="image">Main Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
            />
          </div>

          <div>
            <Label htmlFor="additionalImages">
              Additional Images (One URL per line)
            </Label>
            <Textarea
              id="additionalImages"
              value={additionalImages}
              onChange={(e) => setAdditionalImages(e.target.value)}
              placeholder="https://images.unsplash.com/photo-1600210492493-0946911123ea\nhttps://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
              className="min-h-[100px]"
            />
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

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : property
              ? "Update Property"
              : "Add Property"}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
