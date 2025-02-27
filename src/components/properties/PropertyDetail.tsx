import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bed,
  Bath,
  Home,
  MapPin,
  Heart,
  Share2,
} from "lucide-react";
import { Button } from "../ui/button";
import Navbar from "../navigation/Navbar";
import { Badge } from "../ui/badge";

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
  type: string;
  description?: string;
  features?: string[];
  agent?: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  images?: string[];
}

const properties: { [key: string]: Property } = {
  "1": {
    id: "1",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    title: "Luxury Villa in Sidi Bou Said",
    price: "1,200,000 TND",
    location: "Sidi Bou Said, Tunis",
    beds: 4,
    baths: 3,
    sqft: 3500,
    isFavorite: false,
    type: "Villa",
    description:
      "This stunning luxury villa is located in the picturesque village of Sidi Bou Said, known for its blue and white architecture and panoramic views of the Mediterranean. The property features spacious living areas with high ceilings, a gourmet kitchen, and a private pool surrounded by lush gardens. The master suite offers breathtaking sea views and a luxurious en-suite bathroom. Perfect for those seeking an elegant lifestyle in one of Tunisia's most prestigious neighborhoods.",
    features: [
      "Private swimming pool",
      "Panoramic sea views",
      "Landscaped gardens",
      "Marble flooring",
      "Smart home technology",
      "Outdoor dining area",
      "Security system",
      "Double garage",
    ],
    agent: {
      name: "Sophia Martinez",
      phone: "+216 71 123 456",
      email: "sophia@allianceimmobilier.tn",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&backgroundColor=c0aede",
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9",
    ],
  },
  "2": {
    id: "2",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    title: "Modern Downtown Apartment",
    price: "850,000 TND",
    location: "Les Berges du Lac, Tunis",
    beds: 3,
    baths: 2,
    sqft: 2800,
    isFavorite: true,
    type: "Apartment",
    description:
      "This contemporary apartment is situated in the prestigious Les Berges du Lac district, Tunis' modern business and residential hub. The property offers an open-concept living space with floor-to-ceiling windows providing abundant natural light and views of the lake. The kitchen features high-end appliances and custom cabinetry. The master bedroom includes a walk-in closet and en-suite bathroom. Building amenities include 24-hour security, underground parking, and a fitness center.",
    features: [
      "Lake views",
      "24-hour security",
      "Underground parking",
      "Fitness center",
      "Central air conditioning",
      "Italian kitchen",
      "Marble bathrooms",
      "Built-in wardrobes",
    ],
    agent: {
      name: "Michael Chen",
      phone: "+216 71 123 457",
      email: "michael@allianceimmobilier.tn",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=d1d4f9",
    },
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600607687920-4e4a92f082f9",
      "https://images.unsplash.com/photo-1600607688066-890987f19a02",
      "https://images.unsplash.com/photo-1600607688969-a48d2a0743e2",
    ],
  },
  "3": {
    id: "3",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    title: "Elegant Beachfront Estate",
    price: "2,100,000 TND",
    location: "Hammamet, Tunisia",
    beds: 5,
    baths: 4,
    sqft: 4200,
    isFavorite: false,
    type: "Estate",
    description:
      "This magnificent beachfront estate in Hammamet offers the ultimate in luxury coastal living. Set on a large plot with direct beach access, the property features expansive living spaces with premium finishes throughout. The outdoor area includes a large infinity pool that appears to merge with the Mediterranean, multiple terraces, and a beautifully landscaped garden. The master suite occupies an entire wing of the house, with a private terrace overlooking the sea. Additional features include a home theater, wine cellar, and staff quarters.",
    features: [
      "Direct beach access",
      "Infinity pool",
      "Home theater",
      "Wine cellar",
      "Staff quarters",
      "Outdoor kitchen",
      "Multiple terraces",
      "Landscaped gardens",
    ],
    agent: {
      name: "Alexandra Reynolds",
      phone: "+216 71 123 458",
      email: "alexandra@allianceimmobilier.tn",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra&backgroundColor=b6e3f4",
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2ea2ea",
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198",
    ],
  },
  "4": {
    id: "4",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    title: "Waterfront Modern Villa",
    price: "1,800,000 TND",
    location: "Gammarth, Tunis",
    beds: 6,
    baths: 5,
    sqft: 5500,
    isFavorite: false,
    type: "Villa",
    description:
      "This contemporary waterfront villa in Gammarth represents the pinnacle of modern architectural design. The property features clean lines, open spaces, and walls of glass that maximize the stunning sea views. The main living area flows seamlessly to the outdoor terrace and infinity pool. The gourmet kitchen is equipped with top-of-the-line appliances and custom cabinetry. Each bedroom has its own en-suite bathroom and access to a balcony or terrace. The property includes a private path to the beach and a rooftop terrace perfect for entertaining.",
    features: [
      "Infinity pool",
      "Private beach access",
      "Rooftop terrace",
      "Smart home system",
      "Floor-to-ceiling windows",
      "Designer kitchen",
      "Elevator",
      "Outdoor shower",
    ],
    agent: {
      name: "James Wilson",
      phone: "+216 71 123 459",
      email: "james@allianceimmobilier.tn",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=b6e3f4",
    },
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      "https://images.unsplash.com/photo-1600047509847-f8a83bc8f159",
      "https://images.unsplash.com/photo-1600047509782-30cd9af85143",
      "https://images.unsplash.com/photo-1600047509760-6a4a279c0414",
    ],
  },
  "5": {
    id: "5",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9",
    title: "Contemporary Home in Carthage",
    price: "950,000 TND",
    location: "Carthage, Tunis",
    beds: 4,
    baths: 4,
    sqft: 3800,
    isFavorite: false,
    type: "House",
    description:
      "Located in the historic area of Carthage, this contemporary home offers a perfect blend of modern comfort and traditional charm. The property features an open floor plan with high ceilings and large windows that fill the space with natural light. The kitchen is equipped with high-end appliances and opens to a spacious dining area. The master suite includes a luxurious bathroom with a soaking tub and walk-in shower. The landscaped garden includes a covered patio perfect for outdoor dining and entertaining.",
    features: [
      "Garden with mature trees",
      "Covered patio",
      "High ceilings",
      "Custom lighting",
      "Walk-in closets",
      "Guest suite",
      "Study/office",
      "Storage room",
    ],
    agent: {
      name: "Olivia Thompson",
      phone: "+216 71 123 460",
      email: "olivia@allianceimmobilier.tn",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia&backgroundColor=d1d4f9",
    },
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9",
      "https://images.unsplash.com/photo-1600566753843-5f8d177e4198",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      "https://images.unsplash.com/photo-1600566752734-2a0cd26b80e0",
    ],
  },
  "6": {
    id: "6",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
    title: "Luxury Condo with Sea View",
    price: "750,000 TND",
    location: "La Marsa, Tunis",
    beds: 2,
    baths: 2,
    sqft: 1800,
    isFavorite: false,
    type: "Condo",
    description:
      "This luxury condo in La Marsa offers spectacular sea views from its prime location. The open-concept living and dining area features floor-to-ceiling windows that showcase the Mediterranean panorama. The kitchen is equipped with premium appliances and stone countertops. Both bedrooms include en-suite bathrooms and built-in wardrobes. The large balcony is perfect for enjoying the sunset over the sea. Building amenities include a swimming pool, fitness center, and 24-hour security.",
    features: [
      "Sea view balcony",
      "Swimming pool",
      "Fitness center",
      "24-hour security",
      "Covered parking",
      "Storage unit",
      "Elevator access",
      "Visitor parking",
    ],
    agent: {
      name: "David Kim",
      phone: "+216 71 123 461",
      email: "david@allianceimmobilier.tn",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=c0aede",
    },
    images: [
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc",
      "https://images.unsplash.com/photo-1600573472613-5d9b0e1b3b14",
      "https://images.unsplash.com/photo-1600573472635-4dd74d6e0561",
    ],
  },
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = id ? properties[id] : null;

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <Link to="/properties" className="text-primary hover:underline">
            Return to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20"></div>

      {/* Property Images */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Link
              to="/properties"
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
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
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{property.sqft.toLocaleString()} Sq Ft</span>
                    </div>
                  </div>
                  <Badge className="bg-primary text-white">
                    {property.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {property.price}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {property.description}
                </p>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features?.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold mb-6">Location</h2>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <iframe
                  src={`https://api.mapbox.com/styles/v1/akreem/cm7btkdgr006t01qyevls98b5.html?title=false&access_token=pk.eyJ1IjoiYWtyZWVtIiwiYSI6ImNtN2JzdHg2ZTBlaTAyaXNkcXBvNTFodGoifQ.sbagCNf1jYtllBjqAdiHUQ&zoomwheel=false#15/${property.lat || 36.8702}/${property.lng || 10.3417}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title={`${property.title} Location`}
                ></iframe>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 sticky top-24">
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
                    <p className="text-gray-600 text-sm">Property Consultant</p>
                  </div>
                </div>
              )}

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={4}
                    placeholder="I'm interested in this property..."
                    defaultValue={`I'm interested in ${property.title} (${property.price}). Please contact me with more information.`}
                  ></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
              </form>

              {property.agent && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-gray-600 mb-4">
                    Or contact directly:
                  </p>
                  <div className="space-y-2">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {property.agent.phone}
                    </a>
                    <a
                      href={`mailto:${property.agent.email}`}
                      className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email Agent
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
