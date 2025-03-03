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
import Navbar from "./components/navigation/Navbar";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        {window.location.pathname !== "/" && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/property/1" element={<PropertyDetails1 />} />
          <Route path="/property/2" element={<PropertyDetails2 />} />
          <Route path="/property/3" element={<PropertyDetails3 />} />
          <Route path="/property/4" element={<PropertyDetails4 />} />
          <Route path="/property/5" element={<PropertyDetails5 />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </div>
    </Suspense>
  );
}

export default App;
