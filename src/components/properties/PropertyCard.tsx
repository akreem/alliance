import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

interface PropertyCardProps {
  id?: string;
  image?: string;
  title?: string;
  price?: string;
  location?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
}

const PropertyCard = ({
  id = "1",
  image = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
  title = "Luxury Villa with Ocean View",
  price = "$2,500,000",
  location = "Malibu, CA",
  beds = 4,
  baths = 3,
  sqft = 3500,
  isFavorite = false,
  onFavoriteClick = () => {},
}: PropertyCardProps) => {
  return (
    <Card className="w-[380px] h-[480px] overflow-hidden group bg-white transition-all duration-300 hover:shadow-xl">
      <Link to={`/property/${id}`} className="block">
        <div className="relative w-full h-[280px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-white/80 hover:bg-white z-10"
            onClick={(e) => {
              e.preventDefault();
              onFavoriteClick();
            }}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </Button>
          <Badge className="absolute bottom-4 left-4 bg-white/80 text-black">
            {price}
          </Badge>
        </div>
      </Link>
      <CardContent className="p-6">
        <Link
          to={`/property/${id}`}
          className="block hover:text-primary transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{location}</p>
        </Link>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t flex justify-between text-sm text-gray-600">
        <span>{beds} Chambres</span>
        <span>{baths} Salles de bain</span>
        <span>{sqft.toLocaleString()} m²</span>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
