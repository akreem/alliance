import React from "react";
import Navbar from "./navigation/Navbar";
import HeroSection from "./hero/HeroSection";
import FeaturedProperties from "./properties/FeaturedProperties";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Properties Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FeaturedProperties />
      </motion.div>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 text-white py-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à trouver la maison de vos rêves ?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contactez notre équipe d'experts en immobilier de luxe pour
            commencer votre parcours
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Contactez-nous
          </a>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Alliance Immobilier</h3>
            <p className="text-gray-600">
              Votre destination privilégiée pour l'immobilier de luxe
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Propriétés</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Annonces en vedette</li>
              <li>Nouveaux développements</li>
              <li>Domaines exclusifs</li>
              <li>Recherche de propriétés</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-gray-600">
              <li>À propos de nous</li>
              <li>Notre équipe</li>
              <li>Contact</li>
              <li>Carrières</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connecter</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; 2024 Alliance Immobilier. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
