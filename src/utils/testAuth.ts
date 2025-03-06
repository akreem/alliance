// Test function to set mock authentication data

/**
 * Sets mock authentication data in localStorage for testing
 */
export const setMockAuthData = (): void => {
  const mockUser = {
    id: 999,
    username: "TestAdmin",
    email: "testadmin@example.com",
    token: "mock-test-token-123456"
  };
  
  localStorage.setItem("authToken", mockUser.token);
  localStorage.setItem("user", JSON.stringify(mockUser));
  
  console.log("Mock auth data set:", mockUser);
};

/**
 * Clears authentication data from localStorage
 */
export const clearAuthData = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  
  console.log("Auth data cleared");
};

/**
 * Logs the current authentication state
 */
export const logAuthState = (): void => {
  const token = localStorage.getItem("authToken");
  const userStr = localStorage.getItem("user");
  
  console.log("Current auth state:");
  console.log("- Token exists:", !!token);
  
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      console.log("- User data:", user);
    } catch (error) {
      console.error("- Error parsing user data:", error);
      console.log("- Raw user string:", userStr);
    }
  } else {
    console.log("- No user data found");
  }
};
