/// <reference types="vite/client" />

interface Window {
  propertyData?: any;
}

declare global {
  interface Window {
    propertyData?: any;
  }
}
