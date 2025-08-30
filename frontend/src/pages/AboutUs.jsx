import React, { useEffect, useState } from "react";
import { getStats } from "../services/api";
import { motion } from "framer-motion";


const AboutUs = () => {
  const [stats, setStats] = useState({ volunteers: 0, organizers: 0, events: 0 });

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-6 text-purple-900"
      >
        About Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-700"
      >
        We connect volunteers with organizers to make impactful events possible. 
        Our mission is to empower communities through collaboration and shared purpose.
      </motion.p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto ">
        {[
          { label: "Volunteers", value: stats.volunteers },
          { label: "Organizers", value: stats.organizers },
          { label: "Events", value: stats.events },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 * index }}
            className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition"
          >
            <h2 className="text-5xl font-extrabold text-purple-900">
              {item.value}
            </h2>
            <p className="text-gray-600 mt-2 text-lg">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Team/Values Section */}
      <div className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-900">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Collaboration", desc: "We believe teamwork drives meaningful change." },
            { title: "Impact", desc: "Every small action contributes to a greater good." },
            { title: "Growth", desc: "We empower individuals to learn and grow through volunteering." },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-purple-50 to-orange-100 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2 text-purple-900">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
