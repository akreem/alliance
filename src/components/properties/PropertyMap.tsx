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
        lat: p.lat !== undefined && p.lat !== null ? Number(p.lat) : 36.8065,
        lng: p.lng !== undefined && p.lng !== null ? Number(p.lng) : 10.1815,
        price: p.price,
        type: p.type || "Property",
        image: p.image
      }))
    : apiProperties.length > 0
      ? apiProperties.map((p) => ({
          id: p.id,
          name: p.title,
          location: p.location,
          lat: p.lat !== undefined && p.lat !== null ? Number(p.lat) : 36.8065,
          lng: p.lng !== undefined && p.lng !== null ? Number(p.lng) : 10.1815,
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
    
    // Log locations for debugging
    console.log("Adding markers for locations:", locations);
    
    // Add new markers
    locations.forEach((location) => {
      // Validate coordinates and ensure they are numbers
      const lat = location.lat !== undefined && location.lat !== null ? Number(location.lat) : null;
      const lng = location.lng !== undefined && location.lng !== null ? Number(location.lng) : null;
      
      if (lat === null || lng === null || isNaN(lat) || isNaN(lng)) {
        console.warn(`Invalid coordinates for property ${location.id}: lat=${location.lat}, lng=${location.lng}`);
        return;
      }
      
      console.log(`Adding marker for property ${location.id} at [${lng}, ${lat}]`);
      
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
            center: [lng, lat],
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
        closeButton: true,
        closeOnClick: false,
        className: 'property-popup'
      }).setHTML(`
          <div class="p-3 min-w-[220px]" dir="rtl">
            <div class="mb-2 rounded-md overflow-hidden">
              <img src="${imageUrl}" 
                   alt="${location.name}" class="w-full h-32 object-cover">
            </div>
            <div class="text-right">
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
        .setLngLat([lng, lat])
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

      // Keep popup open when hovering over the popup itself
      popup.getElement()?.addEventListener('mouseenter', () => {
        // Keep popup open when mouse enters the popup
        popup._onMouseEnter = function() { return; };
      });

      // Remove popup when mouse leaves marker (but not when on popup)
      markerEl.addEventListener("mouseleave", (e) => {
        // Check if mouse is moving to the popup
        const toElement = e.relatedTarget;
        if (toElement && popup.getElement()?.contains(toElement as Node)) {
          // Mouse moved to popup, don't remove it
          return;
        }
        
        // Only remove if we're not zoomed in on this location
        if (map.current && map.current.getZoom() < 12) {
          // Set a small timeout to allow mouse to move to popup
          setTimeout(() => {
            // Check if mouse is over popup before removing
            if (!popup.getElement()?.matches(':hover')) {
              popup.remove();
            }
          }, 100);
        }
      });
    });
  };

  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWtyZWVtIiwiYSI6ImNtN2JzdHg2ZTBlaTAyaXNkcXBvNTFodGoifQ.sbagCNf1jYtllBjqAdiHUQ";

    // Calculate center based on available properties
    let centerLng = 10.1815; // Default to Tunis
    let centerLat = 36.8065;
    
    if (propertyLocations.length > 0) {
      // Find valid coordinates
      const validLocations = propertyLocations.filter(loc => 
        typeof loc.lat === 'number' && typeof loc.lng === 'number' && 
        !isNaN(loc.lat) && !isNaN(loc.lng));
      
      if (validLocations.length > 0) {
        // Calculate average coordinates
        const sumLat = validLocations.reduce((sum, loc) => sum + loc.lat, 0);
        const sumLng = validLocations.reduce((sum, loc) => sum + loc.lng, 0);
        centerLat = sumLat / validLocations.length;
        centerLng = sumLng / validLocations.length;
      }
    }
    
    console.log(`Initializing map with center: [${centerLng}, ${centerLat}]`);

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/akreem/cm7btkdgr006t01qyevls98b5",
      center: [centerLng, centerLat],
      zoom: 9, // Adjust zoom level to be closer
      locale: "fr", // Use French locale which is closer to Arabic for Tunisia
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add markers when map loads
    map.current.on("load", () => {
      addMarkers(propertyLocations);
      setMapInitialized(true);
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when properties change
  useEffect(() => {
    if (map.current && mapInitialized) {
      addMarkers(propertyLocations);
    }
  }, [properties, apiProperties, mapInitialized]);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Carte des propriétés</h2>
      <div
        ref={mapContainer}
        className="w-full h-[600px] rounded-lg overflow-hidden"
      >
        {/* Map will be rendered here */}
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
      `}</style>
    </section>
  );
};

export default PropertyMap;
