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
import { Pencil, Trash2, Eye } from "lucide-react";
import { getProperties, deleteProperty, Property } from "@/services/api";
import PropertyForm from "./PropertyForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

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

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsDialogOpen(true);
  };

  const handleView = (property: Property) => {
    setViewingProperty(property);
    setIsViewDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id);
        setProperties(properties.filter((property) => property.id !== id));
      } catch (err) {
        console.error("Failed to delete property:", err);
      }
    }
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    fetchProperties();
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
        <h2 className="text-2xl font-bold mb-6">Manage Properties</h2>

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
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
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
                          onClick={() => handleView(property)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(property)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(property.id)}
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          {editingProperty && (
            <PropertyForm
              property={editingProperty}
              onSuccess={handleFormSuccess}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Property Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
          </DialogHeader>
          {viewingProperty && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <img
                    src={viewingProperty.image}
                    alt={viewingProperty.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">
                    {viewingProperty.title}
                  </h3>
                  <p className="text-xl font-semibold text-primary">
                    {viewingProperty.price}
                  </p>
                  <p className="text-gray-600">{viewingProperty.location}</p>
                  <div className="flex space-x-4 text-gray-600">
                    <span>{viewingProperty.beds} Beds</span>
                    <span>{viewingProperty.baths} Baths</span>
                    <span>{viewingProperty.sqft} Sq Ft</span>
                  </div>
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {viewingProperty.type}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Description</h4>
                <p className="text-gray-600">{viewingProperty.description}</p>
              </div>

              {viewingProperty.features &&
                viewingProperty.features.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Features</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {viewingProperty.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {viewingProperty.agent && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Agent</h4>
                  <div className="flex items-center">
                    <img
                      src={viewingProperty.agent.image}
                      alt={viewingProperty.agent.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-medium">
                        {viewingProperty.agent.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {viewingProperty.agent.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PropertyList;
