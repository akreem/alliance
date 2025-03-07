import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ContactPage from "./components/contact/ContactPage";
import AboutPage from "./components/about/AboutPage";
import PropertiesPage from "./components/properties/PropertiesPage";
import PropertyDetail from "./components/properties/PropertyDetail";
import {
  PropertyDetails1,
  PropertyDetails2,
  PropertyDetails3,
  PropertyDetails4,
  PropertyDetails5,
} from "./components/properties/PropertyDetails";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AuthPage from "./components/auth/AuthPage";
import AccountManagement from "./components/auth/AccountManagement";
import Navbar from "./components/navigation/Navbar";
import routes from "tempo-routes";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        {window.location.pathname !== "/" &&
          !window.location.pathname.startsWith("/admin") && <Navbar />}
        <Routes>
          <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
          <Route path="/contact" element={<ErrorBoundary><ContactPage /></ErrorBoundary>} />
          <Route path="/about" element={<ErrorBoundary><AboutPage /></ErrorBoundary>} />
          <Route path="/properties" element={<ErrorBoundary><PropertiesPage /></ErrorBoundary>} />
          <Route path="/property/:id" element={<ErrorBoundary><PropertyDetail /></ErrorBoundary>} />
          <Route path="/properties/:id" element={<ErrorBoundary><PropertyDetail /></ErrorBoundary>} />
          {/* The following static routes are now commented out as they're no longer needed */}
          {/* <Route path="/property/1" element={<PropertyDetails1 />} />
          <Route path="/property/2" element={<PropertyDetails2 />} />
          <Route path="/property/3" element={<PropertyDetails3 />} />
          <Route path="/property/4" element={<PropertyDetails4 />} />
          <Route path="/property/5" element={<PropertyDetails5 />} /> */}
          <Route path="/admin/login" element={<ErrorBoundary><AdminLogin /></ErrorBoundary>} />
          <Route path="/admin/dashboard" element={<ErrorBoundary><AdminDashboard /></ErrorBoundary>} />
          <Route path="/auth" element={<ErrorBoundary><AuthPage /></ErrorBoundary>} />
          <Route path="/account" element={<ErrorBoundary><AccountManagement /></ErrorBoundary>} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </div>
    </Suspense>
  );
}

export default App;
