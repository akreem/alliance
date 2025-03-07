import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

const HeroSection = ({
  backgroundImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
  title = "Le luxe de vivre redéfini",
  subtitle = "Découvrez des propriétés exceptionnelles dans des emplacements de choix",
}: HeroSectionProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[800px] overflow-hidden bg-black dark:bg-gray-900">
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      <motion.div
        className="relative h-full flex flex-col items-center justify-center text-center px-4"
        style={{ opacity }}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/90 max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default HeroSection;
