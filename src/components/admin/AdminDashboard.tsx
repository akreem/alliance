import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PropertyList from "./PropertyList";
import PropertyForm from "./PropertyForm";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("properties");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Tabs
          defaultValue="properties"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-8">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="add-property">Add Property</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <PropertyList />
          </TabsContent>

          <TabsContent value="add-property">
            <PropertyForm onSuccess={() => setActiveTab("properties")} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
