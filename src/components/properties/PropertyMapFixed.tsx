import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useProperties } from "./useProperties";
import { Property } from "@/services/api";

interface PropertyLocation {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  price: string;
  type: string;
  image?: string;
}

interface PropertyMapProps {
  locations?: PropertyLocation[];
  properties?: Property[];
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

const PropertyMap = ({ locations = defaultLocations, properties = [] }: PropertyMapProps) => {
  const { properties: apiProperties } = useProperties();
  const [mapInitialized, setMapInitialized] = useState(false);
  
  // Convert properties to locations format
  const propertyLocations: PropertyLocation[] = properties.length > 0 
    ? properties.map((p) => ({
        id: p.id,
        name: p.title,
        location: p.location,
        lat: p.lat || 36.8065, // Default to Tunis if no coordinates
        lng: p.lng || 10.1815,
        price: p.price,
        type: p.type || "Property",
        image: p.image
      }))
    : apiProperties.length > 0
      ? apiProperties.map((p) => ({
          id: p.id,
          name: p.title,
          location: p.location,
          lat: p.lat || 36.8065, // Default to Tunis if no coordinates
          lng: p.lng || 10.1815,
          price: p.price,
          type: p.type || "Property",
          image: p.image
        }))
      : locations;
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRefs = useRef<{ [key: string]: mapboxgl.Popup }>({});

  // Function to clear all markers
  const clearMarkers = () => {
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    }
  };

  // Function to add markers to the map
  const addMarkers = (locations: PropertyLocation[]) => {
    if (!map.current) return;
    
    // Clear existing markers first
    clearMarkers();
    
    // Add new markers
    locations.forEach((location) => {
      // Create custom HTML element for the marker
      const markerEl = document.createElement("div");
      markerEl.className = "custom-marker";
      markerEl.innerHTML = `<div class="marker-pin"></div>`;

      // Add click event to zoom to location
      markerEl.addEventListener("click", () => {
        if (map.current) {
          // Close all other popups first
          Object.values(popupRefs.current).forEach((p) => p.remove());
          
          // Show this popup
          popupRefs.current[location.id].addTo(map.current);
          
          // Zoom to the location with animation
          map.current.flyTo({
            center: [location.lng, location.lat],
            zoom: 16,
            speed: 1.2,
            essential: true,
          });
        }
      });

      // Get image URL
      const imageUrl = location.image || 
        `https://images.unsplash.com/photo-${
          location.id === "1"
            ? "1600596542815-ffad4c1539a9"
            : location.id === "2"
              ? "1600607687939-ce8a6c25118c"
              : location.id === "3"
                ? "1600585154340-be6161a56a0c"
                : location.id === "4"
                  ? "1600047509807-ba8f99d2cdde"
                  : "1600566753376-12c8ab8e17a9"
        }`;

      // Create popup with RTL support
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true, // Add close button for better usability
        closeOnClick: false,
      }).setHTML(`
          <div class="p-3 min-w-[220px]">
            <div class="mb-2 rounded-md overflow-hidden">
              <img src="${imageUrl}" 
                   alt="${location.name}" class="w-full h-32 object-cover">
            </div>
            <div style="text-align: right; direction: rtl;">
              <h3 class="font-semibold text-sm mb-1">${location.name}</h3>
              <p class="text-xs text-gray-600 mb-1">${location.location}</p>
              <p class="text-xs font-bold text-primary">${location.price}</p>
              <p class="text-xs text-gray-500 mt-1">${location.type}</p>
            </div>
            <a href="/property/${location.id}" class="text-xs bg-primary text-white px-3 py-1 rounded-md mt-2 block text-center hover:bg-primary/90 transition-colors">Plus de détails</a>
          </div>
        `);

      // Store popup reference
      popupRefs.current[location.id] = popup;

      // Create marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map.current!);
      
      // Store marker reference
      markersRef.current.push(marker);

      // Show popup on hover
      markerEl.addEventListener("mouseenter", () => {
        // Close all other popups first
        Object.values(popupRefs.current).forEach((p) => p.remove());
        // Show this popup
        popup.addTo(map.current!);
      });

      // Keep popup open when mouse is over it
      const popupEl = popup.getElement();
      if (popupEl) {
        popupEl.addEventListener('mouseenter', () => {
          // Prevent popup from closing when mouse is over it
          popup._onMouseLeave = function() { return; };
        });
      }
    });
  };

  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWtyZWVtIiwiYSI6ImNtN2JzdHg2ZTBlaTAyaXNkcXBvNTFodGoifQ.sbagCNf1jYtllBjqAdiHUQ";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/akreem/cm7btkdgr006t01qyevls98b5",
      center: [10.1815, 36.8065], // center on Tunis
      zoom: 9, // Closer zoom level
      locale: "fr", // Use French locale which is closer to Arabic for Tunisia
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add markers when map loads
    map.current.on("load", () => {
      setMapInitialized(true);
      addMarkers(propertyLocations);
    });

    // Clean up on unmount
    return () => {
      clearMarkers();
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when properties change
  useEffect(() => {
    if (mapInitialized && map.current) {
      addMarkers(propertyLocations);
      
      // Center the map on Tunisia
      if (propertyLocations.length > 0 && !map.current.isMoving()) {
        map.current.setCenter([10.1815, 36.8065]); // Center on Tunisia
      }
    }
  }, [propertyLocations, mapInitialized]);

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

        {/* Mapbox container */}
        <div
          ref={mapContainer}
          className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl mb-10"
          style={{ position: "relative" }}
        />

        {/* Property list below map */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => {
                if (map.current && popupRefs.current[location.id]) {
                  // Close all popups first
                  Object.values(popupRefs.current).forEach((p) => p.remove());
                  // Show this popup and zoom to location
                  popupRefs.current[location.id].addTo(map.current);
                  map.current.flyTo({
                    center: [location.lng, location.lat],
                    zoom: 16,
                    speed: 1.2,
                    essential: true,
                  });
                }
              }}
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

      {/* Add CSS for custom markers */}
      <style jsx>{`
        .custom-marker {
          cursor: pointer;
          transition: transform 0.2s;
        }
        .custom-marker:hover {
          transform: scale(1.2);
        }
        .marker-pin {
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          background: #222d65;
          position: absolute;
          transform: rotate(-45deg);
          left: 50%;
          top: 50%;
          margin: -15px 0 0 -15px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          animation: pulse 2s infinite;
        }
        .marker-pin::after {
          content: "";
          width: 18px;
          height: 18px;
          margin: 6px 0 0 6px;
          background: white;
          position: absolute;
          border-radius: 50%;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 45, 101, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(34, 45, 101, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 45, 101, 0);
          }
        }
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-family: "Arial", sans-serif;
        }
        .mapboxgl-popup-content a {
          font-family: "Arial", sans-serif;
        }
        .mapboxgl-popup-close-button {
          font-size: 16px;
          color: #222d65;
          padding: 5px;
        }
      `}</style>
    </section>
  );
};

export default PropertyMap; 