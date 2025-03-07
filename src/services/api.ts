// Use a dynamic approach to determine the API URL
// This will work with any domain, just changing the port to 8000
const API_BASE = window.location.protocol + '//' + window.location.hostname + ':8000';
const API_URL = `${API_BASE}/api`;

console.log('API URL configured as:', API_URL);

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
    console.log(`Fetching properties from ${API_URL}/properties/`);
    const response = await fetch(`${API_URL}/properties/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error text available');
      console.error(`API error: ${response.status} ${response.statusText}`);
      console.error('Error details:', errorText);
      throw new Error(`Failed to fetch properties: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} properties`);
    
    // Normalize the data
    const normalizedData = data.map((property: Property) => {
      // Ensure priceValue is a number
      let priceValue = property.priceValue;
      
      // If priceValue is missing or not a number, try to extract it from price string
      if (typeof priceValue !== 'number' && property.price) {
        const priceMatch = property.price.match(/\d+/g);
        if (priceMatch) {
          priceValue = parseInt(priceMatch.join(''), 10);
        } else {
          priceValue = 0;
        }
      }
      
      return {
        ...property,
        priceValue: priceValue || 0,
        beds: property.beds || 0,
        baths: property.baths || 0,
        sqft: property.sqft || 0,
        type: property.type || "Unknown",
        isFavorite: property.isFavorite || false
      };
    });
    
    console.log("Normalized property data:", normalizedData);
    return normalizedData;
  } catch (error) {
    console.error("Error fetching properties:", error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('Network error: Check if the API server is running on port 8000');
    }
    // Return an empty array instead of throwing to prevent app crashes
    return [];
  }
};

export const getProperty = async (id: string): Promise<Property | null> => {
  try {
    console.log(`Fetching property ${id} from ${API_URL}/properties/${id}/`);
    const response = await fetch(`${API_URL}/properties/${id}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error text available');
      console.error(`API error: ${response.status} ${response.statusText}`);
      console.error('Error details:', errorText);
      throw new Error(`Failed to fetch property: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched property ${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('Network error: Check if the API server is running on port 8000');
    }
    return null;
  }
};

export const toggleFavorite = async (
  id: string,
): Promise<{ id: string; isFavorite: boolean } | null> => {
  try {
    console.log(`Toggling favorite for property ${id}`);
    const response = await fetch(`${API_URL}/properties/${id}/favorite/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to toggle favorite: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Successfully toggled favorite for property ${id}`);
    return data;
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
      console.error("Authentication required for creating property");
      throw new Error("Authentication required");
    }

    console.log(`Creating new property`);
    const response = await fetch(`${API_URL}/properties/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to create property: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully created property with ID: ${data.id}`);
    return data;
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
      console.error("Authentication required for updating property");
      throw new Error("Authentication required");
    }

    console.log(`Updating property ${id}`);
    const response = await fetch(`${API_URL}/properties/${id}/`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to update property: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully updated property ${id}`);
    return data;
  } catch (error) {
    console.error(`Error updating property ${id}:`, error);
    return null;
  }
};

export const deleteProperty = async (id: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Authentication required for deleting property");
      throw new Error("Authentication required");
    }

    console.log(`Deleting property ${id}`);
    const response = await fetch(`${API_URL}/properties/${id}/`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to delete property: ${response.status} ${response.statusText}`);
    }

    console.log(`Successfully deleted property ${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting property ${id}:`, error);
    return false;
  }
};

export const getAgents = async (): Promise<Agent[]> => {
  try {
    console.log(`Fetching agents from ${API_URL}/agents/`);
    const response = await fetch(`${API_URL}/agents/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch agents: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} agents`);
    return data;
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
    console.log(`Registering user ${username}`);
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to register user: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Successfully registered user ${username}`);
    return data;
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
    console.log(`Logging in user ${username}`);
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to login: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Successfully logged in user ${username}`);
    return data;
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
    console.log(`Submitting contact form for ${formData.name}`);
    const response = await fetch(`${API_URL}/contact/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to submit contact form: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Successfully submitted contact form for ${formData.name}`);
    return data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return null;
  }
};

export const updatePropertyMainImage = async (
  id: string,
  imageUrl: string
): Promise<{ id: string; image: string; is_primary: boolean } | null> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Authentication required for updating property image");
      throw new Error("Authentication required");
    }

    console.log(`Updating main image for property ${id}`);
    const response = await fetch(`${API_URL}/properties/${id}/update_main_image/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ image_url: imageUrl }),
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to update property image: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully updated main image for property ${id}`);
    return data;
  } catch (error) {
    console.error(`Error updating main image for property ${id}:`, error);
    return null;
  }
};

export const updatePropertyImages = async (
  id: string,
  images: string[] | { image_url: string; is_primary: boolean }[]
): Promise<Property | null> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Authentication required for updating property images");
      throw new Error("Authentication required");
    }

    console.log(`Updating images for property ${id}`);
    const response = await fetch(`${API_URL}/properties/${id}/update_images/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ images }),
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to update property images: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully updated images for property ${id}`);
    return data;
  } catch (error) {
    console.error(`Error updating images for property ${id}:`, error);
    return null;
  }
};
