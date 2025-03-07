// Authentication utility functions

/**
 * Check if the user is currently authenticated
 * @returns boolean indicating if the user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");

  return !!token && !!user;
};

/**
 * Get the current authenticated user
 * @returns User object or null if not authenticated
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  if (user) {
    try {
      const userData = JSON.parse(user);
      // Check if user has admin role (for demo purposes)
      // In a real app, this would be determined by the backend
      userData.isAdmin =
        userData.username === "admin" || userData.email?.includes("admin");
      return userData;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }

  return null;
};

/**
 * Log out the current user
 */
export const logout = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");

  // Redirect to home page
  window.location.href = "/";
};
