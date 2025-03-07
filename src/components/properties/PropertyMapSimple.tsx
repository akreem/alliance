import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

type PropertyLocation = {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  price: string;
  type: string;
};

interface PropertyMapProps {
  locations?: PropertyLocation[];
}

const defaultLocations: PropertyLocation[] = [
  {
    id: "1",
    name: "Luxury Villa in Sidi Bou Said",
    location: "Sidi Bou Said, Tunis",
    lat: 36.8702,
    lng: 10.3417,
    price: "1,200,000 TND",
    type: "Villa",
  },
  {
    id: "2",
    name: "Modern Downtown Apartment",
    location: "Les Berges du Lac, Tunis",
    lat: 36.8324,
    lng: 10.2331,
    price: "850,000 TND",
    type: "Apartment",
  },
  {
    id: "3",
    name: "Elegant Beachfront Estate",
    location: "Hammamet, Tunisia",
    lat: 36.4074,
    lng: 10.6225,
    price: "2,100,000 TND",
    type: "Estate",
  },
  {
    id: "4",
    name: "Waterfront Modern Villa",
    location: "Gammarth, Tunis",
    lat: 36.9185,
    lng: 10.2881,
    price: "1,800,000 TND",
    type: "Villa",
  },
  {
    id: "5",
    name: "Contemporary Home in Carthage",
    location: "Carthage, Tunis",
    lat: 36.8589,
    lng: 10.3253,
    price: "950,000 TND",
    type: "House",
  },
];

const PropertyMapSimple = ({
  locations = defaultLocations,
}: PropertyMapProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nos Propriétés en Tunisie
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorez nos propriétés exclusives dans les emplacements les plus
            recherchés de Tunisie
          </p>
        </motion.div>

        {/* Static Map Image */}
        <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl mb-10 bg-gray-200 flex items-center justify-center">
          <img
            src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/10.1815,36.8065,9,0/1200x600?access_token=pk.eyJ1IjoiYWtyZWVtIiwiYSI6ImNtN2JzdHg2ZTBlaTAyaXNkcXBvNTFodGoifQ.sbagCNf1jYtllBjqAdiHUQ"
            alt="Map of Tunisia properties"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Property list below map */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/property/${location.id}`} className="block">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold">{location.location}</h3>
                </div>
                <p className="text-gray-600 mb-2">{location.name}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">
                    {location.price}
                  </span>
                  <span className="text-sm text-gray-500">{location.type}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyMapSimple;
