import React from "react";
import { motion } from "framer-motion";
import Navbar from "../navigation/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
            alt="Luxury Real Estate Team"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            À propos d'Alliance Immobilier
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl"
          >
            Un héritage d'excellence dans l'immobilier de luxe
          </motion.p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Notre Histoire
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Fondée en 2005, Alliance Immobilier s'est imposée comme la
                destination privilégiée pour l'immobilier haut de gamme. Notre
                parcours a commencé avec une vision simple : offrir un service
                inégalé dans le marché immobilier de luxe.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Aujourd'hui, nous sommes fiers d'être reconnus comme des leaders
                du secteur, connus pour notre portefeuille exceptionnel de
                propriétés et notre engagement envers la satisfaction client.
                Notre équipe de professionnels expérimentés rassemble des
                décennies d'expertise dans le marché immobilier de luxe.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                alt="Luxury Estate Office"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chez Alliance Immobilier, nous sommes guidés par un ensemble de
              valeurs fondamentales qui définissent qui nous sommes et comment
              nous opérons.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Excellence",
                description:
                  "Nous visons l'excellence dans tout ce que nous faisons, de la sélection des propriétés au service client.",
              },
              {
                title: "Intégrité",
                description:
                  "Nous opérons avec le plus haut niveau d'intégrité, assurant transparence et honnêteté dans toutes nos transactions.",
              },
              {
                title: "Innovation",
                description:
                  "Nous adoptons l'innovation, cherchant constamment de nouvelles façons d'améliorer notre service et de dépasser les attentes.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {value.title}
                </h3>
                <p className="text-lg text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rencontrez les professionnels exceptionnels qui font d'Alliance
              Immobilier le leader du secteur qu'elle est aujourd'hui.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Alexandra Reynolds",
                role: "Fondatrice & PDG",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra&backgroundColor=b6e3f4",
              },
              {
                name: "Michael Chen",
                role: "Directeur des Acquisitions",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=d1d4f9",
              },
              {
                name: "Sophia Martinez",
                role: "Consultante Immobilière Senior",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&backgroundColor=c0aede",
              },
              {
                name: "James Wilson",
                role: "Directeur Marketing",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=b6e3f4",
              },
              {
                name: "Olivia Thompson",
                role: "Responsable Relations Clients",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia&backgroundColor=d1d4f9",
              },
              {
                name: "David Kim",
                role: "Conseiller Financier",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=c0aede",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-lg text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
