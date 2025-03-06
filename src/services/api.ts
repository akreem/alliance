const API_URL =
  import.meta.env.VITE_API_URL || "http://srv708368.hstgr.cloud:8000/api";

export interface Property {
  id: string;
  image: string;
  title: string;
  price: string;
  priceValue: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  isFavorite: boolean;
  type: string;
  description?: string;
  features?: string[];
  agent?: Agent;
  images?: string[];
  lat?: number;
  lng?: number;
}

export interface Agent {
  name: string;
  phone: string;
  email: string;
  image: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  token?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Properties API
export const getProperties = async (): Promise<Property[]> => {
  try {
    const response = await fetch(`${API_URL}/properties/`);
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

export const getProperty = async (id: string): Promise<Property | null> => {
  try {
    const response = await fetch(`${API_URL}/properties/${id}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch property");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    return null;
  }
};

export const toggleFavorite = async (
  id: string,
): Promise<{ id: string; isFavorite: boolean } | null> => {
  try {
    const response = await fetch(`${API_URL}/properties/${id}/favorite/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to toggle favorite");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error toggling favorite for property ${id}:`, error);
    return null;
  }
};

export const createProperty = async (
  propertyData: Partial<Property>,
): Promise<Property | null> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/properties/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      throw new Error("Failed to create property");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating property:", error);
    return null;
  }
};

export const updateProperty = async (
  id: string,
  propertyData: Partial<Property>,
): Promise<Property | null> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/properties/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      throw new Error("Failed to update property");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating property ${id}:`, error);
    return null;
  }
};

export const deleteProperty = async (id: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/properties/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete property");
    }

    return true;
  } catch (error) {
    console.error(`Error deleting property ${id}:`, error);
    return false;
  }
};

export const getAgents = async (): Promise<Agent[]> => {
  try {
    const response = await fetch(`${API_URL}/agents/`);
    if (!response.ok) {
      throw new Error("Failed to fetch agents");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
};

// Authentication API
export const registerUser = async (
  username: string,
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

export const loginUser = async (
  username: string,
  password: string,
): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

// Contact API
export const submitContactForm = async (
  formData: ContactForm,
): Promise<{ success: boolean; message: string } | null> => {
  try {
    const response = await fetch(`${API_URL}/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to submit contact form");
    }
    return await response.json();
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return null;
  }
};
