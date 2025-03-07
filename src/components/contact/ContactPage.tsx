import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";
import Navbar from "../navigation/Navbar";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="h-20"></div>

      {/* Hero Section */}
      <div className="relative h-[300px] bg-gray-900 mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
            alt="Contact Us"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl"
          >
            Nous sommes là pour vous aider avec tous vos besoins immobiliers de
            luxe
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Entrer en Contact
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Contactez-nous pour des propriétés exceptionnelles et un service
                personnalisé. Notre équipe d'experts en immobilier de luxe est
                prête à vous assister.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 dark:text-white">
                    Notre Adresse
                  </h3>
                  <span className="text-gray-600 dark:text-gray-300">
                    123 Avenue Habib Bourguiba, Tunis 1000, Tunisia
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 dark:text-white">
                    Téléphone
                  </h3>
                  <span className="text-gray-600 dark:text-gray-300">
                    +216 71 123 456
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 dark:text-white">
                    E-mail
                  </h3>
                  <span className="text-gray-600 dark:text-gray-300">
                    contact@allianceimmobilier.tn
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Suivez-nous
              </h3>
              <div className="flex space-x-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Facebook className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Instagram className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Twitter className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Linkedin className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-10"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Envoyez-nous un Message
            </h3>
            <form className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Nom Complet
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Votre nom complet"
                  className="h-12"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Adresse E-mail
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="votre@email.com"
                  className="h-12"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Numéro de Téléphone
                </label>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="+216 XX XXX XXX"
                  className="h-12"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Votre Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="min-h-[150px]"
                />
              </div>

              <Button type="submit" className="w-full h-12 text-lg">
                Envoyer le Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] mt-16 bg-gray-200">
        <iframe
          src="https://api.mapbox.com/styles/v1/akreem/cm7btkdgr006t01qyevls98b5.html?title=false&access_token=pk.eyJ1IjoiYWtyZWVtIiwiYSI6ImNtN2JzdHg2ZTBlaTAyaXNkcXBvNTFodGoifQ.sbagCNf1jYtllBjqAdiHUQ&zoomwheel=false#10/36.8065/10.1815"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          title="Alliance Immobilier Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
