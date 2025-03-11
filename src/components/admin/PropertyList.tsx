import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pencil, Trash2, Eye, Image as ImageIcon } from "lucide-react";
import { getProperties, deleteProperty, Property } from "@/services/api";
import PropertyForm from "./PropertyForm";
import PropertyImageManager from "./PropertyImageManager";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await getProperties();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch properties");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleEditClick = (property: Property) => {
    setSelectedProperty(property);
    setEditDialogOpen(true);
  };

  const handleViewClick = (property: Property) => {
    setSelectedProperty(property);
    setViewDialogOpen(true);
  };

  const handleImagesClick = (property: Property) => {
    setSelectedProperty(property);
    setImageDialogOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id);
        setProperties(properties.filter((property) => property.id !== id));
      } catch (err) {
        console.error("Failed to delete property:", err);
      }
    }
  };

  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    fetchProperties();
  };

  const handleImageSuccess = () => {
    fetchProperties();
    // Keep the dialog open to allow multiple image updates
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading properties...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Propriétés</h2>
          <Button onClick={() => { setSelectedProperty(null); setEditDialogOpen(true); }}>
          Ajouter une propriété
          </Button>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No properties found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      {property.image ? (
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-500 text-xs">No image</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {property.title}
                    </TableCell>
                    <TableCell>{property.price}</TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>{property.type}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleViewClick(property)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditClick(property)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleImagesClick(property)}
                        >
                          <ImageIcon className="h-4 w-4 mr-1" />
                          Images
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteClick(property.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {/* Edit Property Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProperty ? "Edit Property" : "Add Property"}
            </DialogTitle>
          </DialogHeader>
          <PropertyForm
            property={selectedProperty || undefined}
            onSuccess={handleEditSuccess}
            onCancel={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* View Property Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">
                    {selectedProperty.title}
                  </h3>
                  <p className="text-xl font-semibold text-primary">
                    {selectedProperty.price}
                  </p>
                  <p className="text-gray-600">{selectedProperty.location}</p>
                  <div className="flex space-x-4 text-gray-600">
                    <span>{selectedProperty.beds} Beds</span>
                    <span>{selectedProperty.baths} Baths</span>
                    <span>{selectedProperty.sqft} Sq Ft</span>
                  </div>
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {selectedProperty.type}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Description</h4>
                <p className="text-gray-600">{selectedProperty.description}</p>
              </div>

              {selectedProperty.features &&
                selectedProperty.features.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Features</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedProperty.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {selectedProperty.agent && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Agent</h4>
                  <div className="flex items-center">
                    <img
                      src={selectedProperty.agent.image}
                      alt={selectedProperty.agent.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-medium">
                        {selectedProperty.agent.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {selectedProperty.agent.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Manage Property Images Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Manage Property Images</DialogTitle>
          </DialogHeader>
          {selectedProperty && (
            <PropertyImageManager
              property={selectedProperty}
              onSuccess={handleImageSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PropertyList;
