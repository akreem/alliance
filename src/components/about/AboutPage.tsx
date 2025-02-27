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
            About Alliance Immobilier
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl"
          >
            A legacy of excellence in luxury real estate
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
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Founded in 2005, Alliance Immobilier has established itself as
                the premier destination for high-end real estate. Our journey
                began with a simple vision: to provide unparalleled service in
                the luxury property market.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we are proud to be recognized as industry leaders, known
                for our exceptional portfolio of properties and our commitment
                to client satisfaction. Our team of experienced professionals
                brings together decades of expertise in the luxury real estate
                market.
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
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At Alliance Immobilier, we are guided by a set of core values that
              define who we are and how we operate.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Excellence",
                description:
                  "We strive for excellence in everything we do, from property selection to client service.",
              },
              {
                title: "Integrity",
                description:
                  "We operate with the highest level of integrity, ensuring transparency and honesty in all our dealings.",
              },
              {
                title: "Innovation",
                description:
                  "We embrace innovation, constantly seeking new ways to enhance our service and exceed expectations.",
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the exceptional professionals who make Alliance Immobilier
              the industry leader it is today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Alexandra Reynolds",
                role: "Founder & CEO",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra&backgroundColor=b6e3f4",
              },
              {
                name: "Michael Chen",
                role: "Head of Acquisitions",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=d1d4f9",
              },
              {
                name: "Sophia Martinez",
                role: "Senior Property Consultant",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&backgroundColor=c0aede",
              },
              {
                name: "James Wilson",
                role: "Marketing Director",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=b6e3f4",
              },
              {
                name: "Olivia Thompson",
                role: "Client Relations Manager",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia&backgroundColor=d1d4f9",
              },
              {
                name: "David Kim",
                role: "Financial Advisor",
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
