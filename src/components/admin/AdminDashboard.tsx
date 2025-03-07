import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PropertyList from "./PropertyList";
import PropertyForm from "./PropertyForm";
import { User } from "lucide-react";
import { getCurrentUser } from "@/utils/auth";
import { logAuthState, setMockAuthData } from "@/utils/testAuth";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("properties");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Log current auth state for debugging
    logAuthState();

    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("No auth token found, redirecting to login");
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);

      // Get username from localStorage
      const user = getCurrentUser();
      console.log("Current user:", user); // Debug log

      if (user && user.username) {
        console.log("Setting username:", user.username); // Debug log
        setUsername(user.username);
      } else {
        console.log("No username found in user object"); // Debug log
        // Fallback to manually parsing localStorage
        try {
          const userStr = localStorage.getItem("user");
          if (userStr) {
            const userObj = JSON.parse(userStr);
            console.log("Manually parsed user:", userObj); // Debug log
            if (userObj && userObj.username) {
              setUsername(userObj.username);
            } else {
              // If still no username, use a default
              setUsername("Admin User");
            }
          }
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
          // Set a default username as fallback
          setUsername("Admin User");
        }
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  // For testing: set mock auth data
  const handleSetMockData = () => {
    setMockAuthData(false);
    window.location.reload();
  };

  const handleSetMockAdminData = () => {
    setMockAuthData(true);
    window.location.reload();
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
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-700">
              <User className="h-4 w-4 mr-2" />
              <span className="font-medium">{username || "Admin User"}</span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
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
            <TabsTrigger value="debug">Debug</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <PropertyList />
          </TabsContent>

          <TabsContent value="add-property">
            <PropertyForm onSuccess={() => setActiveTab("properties")} />
          </TabsContent>

          <TabsContent value="debug">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Debug Tools</h2>
              <div className="space-y-4">
                <div>
                  <p className="mb-2">
                    Current username: <strong>{username || "Not set"}</strong>
                  </p>
                  <p className="mb-2">
                    Authentication status:{" "}
                    <strong>
                      {isAuthenticated ? "Authenticated" : "Not authenticated"}
                    </strong>
                  </p>
                </div>
                <div className="space-y-2">
                  <Button onClick={handleSetMockData} className="mr-2">
                    Set Mock User Data
                  </Button>
                  <Button onClick={handleSetMockAdminData}>
                    Set Mock Admin Data
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
