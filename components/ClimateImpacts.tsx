"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const impacts = [
  {
    sector: "Agriculture",
    description: "Changes in temperature and precipitation patterns can affect crop yields and food security.",
  },
  {
    sector: "Water Resources",
    description: "Rising temperatures and changing precipitation patterns can lead to water scarcity in some regions.",
  },
  {
    sector: "Health",
    description: "Climate change can exacerbate health issues and lead to the spread of certain diseases.",
  },
  {
    sector: "Ecosystems",
    description: "Many plant and animal species are at risk of extinction due to rapid climate change.",
  },
]

export default function ClimateImpacts() {
  const [selectedSector, setSelectedSector] = useState(impacts[0])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Climate Change Impacts</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {impacts.map((impact) => (
          <button
            key={impact.sector}
            onClick={() => setSelectedSector(impact)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedSector.sector === impact.sector
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {impact.sector}
          </button>
        ))}
      </div>
      <p className="text-gray-700">{selectedSector.description}</p>
    </motion.div>
  )
}

