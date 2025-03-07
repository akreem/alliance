import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bed,
  Bath,
  Home,
  MapPin,
  Heart,
  Share2,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "../ui/button";
import Navbar from "../navigation/Navbar";
import { Badge } from "../ui/badge";
import { usePropertyDetail } from "./usePropertyDetail";
import { getProperties, getProperty } from "@/services/api";
import { Property } from "@/services/api";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const passedPropertyData = location.state?.propertyData;

  // If we have property data passed via Link state, use it to initialize
  React.useEffect(() => {
    if (passedPropertyData && passedPropertyData.id === id) {
      window.propertyData = passedPropertyData;
    }
  }, [passedPropertyData, id]);

  const { property, loading, error, handleToggleFavorite } = usePropertyDetail(
    id || "",
  );

  // Always fetch directly from API to ensure we get the correct property
  React.useEffect(() => {
    if (id) {
      const fetchDirectFromAPI = async () => {
        try {
          // First try to get the specific property
          const propertyData = await getProperty(id);
          if (propertyData) {
            // If successful, we don't need to do anything as usePropertyDetail will handle it
            window.propertyData = propertyData;
            return;
          }

          // If that fails, try to get it from the properties list
          const allProperties = await getProperties();
          const foundProperty = allProperties.find(
            (p) => p.id.toString() === id,
          );
          if (foundProperty) {
            // Manually set the property data
            window.propertyData = foundProperty;
            window.location.reload();
          }
        } catch (err) {
          console.error("Error fetching property from API:", err);
        }
      };
      fetchDirectFromAPI();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Loading property details...
          </h2>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {error || "Property Not Found"}
          </h2>
          <Link to="/properties" className="text-primary hover:underline">
            Return to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20"></div>

      {/* Property Images */}
      <div className="bg-card text-card-foreground">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Link
              to="/properties"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden h-[400px]">
              <img
                src={property.images?.[0] || property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(property.images || [property.image])
                .slice(1, 5)
                .map((img, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden h-[192px]"
                  >
                    <img
                      src={img}
                      alt={`${property.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-card text-card-foreground rounded-lg shadow-md p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <Bed className="h-5 w-5 mr-2" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Bath className="h-5 w-5 mr-2" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Home className="h-5 w-5 mr-2" />
                      <span>{property.sqft.toLocaleString()} Sq Ft</span>
                    </div>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">
                    {property.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {property.price}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleToggleFavorite}
                    >
                      <Heart
                        className={`h-5 w-5 ${property.isFavorite ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {property.description}
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features?.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold mb-6">Location</h2>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <iframe
                  src={`https://api.mapbox.com/styles/v1/akreem/cm7btkdgr006t01qyevls98b5.html?title=false&access_token=pk.eyJ1IjoiYWtyZWVtIiwiYSI6ImNtN2JzdHg2ZTBlaTAyaXNkcXBvNTFodGoifQ.sbagCNf1jYtllBjqAdiHUQ&zoomwheel=true#15/${property.lat || 36.8702}/${property.lng || 10.3417}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title={`${property.title} Location`}
                ></iframe>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Coordonnées: {property.lat ? `${property.lat.toFixed(6)}, ${property.lng?.toFixed(6)}` : "Coordonnées non disponibles"}</p>
                  <p className="mt-2">{property.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card text-card-foreground rounded-lg shadow-md p-8 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Contact Agent</h2>
              {property.agent && (
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {property.agent.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {property.agent.email}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  <a
                    href={`tel:${property.agent?.phone || "+216 71 123 456"}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {property.agent?.phone || "+216 71 123 456"}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <a
                    href={`mailto:${property.agent?.email || "contact@alliance-immobilier.tn"}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {property.agent?.email || "contact@alliance-immobilier.tn"}
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Envoyer un message</h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Votre téléphone"
                      className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Votre message"
                      rows={4}
                      className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground"
                    ></textarea>
                  </div>
                  <Button className="w-full">Envoyer</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Propriétés similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder for similar properties */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
              >
                <div className="h-48 bg-muted"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Propriété similaire {i}</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Emplacement
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">Prix</span>
                    <div className="flex space-x-2">
                      <span className="text-muted-foreground text-sm">
                        3 Ch
                      </span>
                      <span className="text-muted-foreground text-sm">
                        2 SdB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
