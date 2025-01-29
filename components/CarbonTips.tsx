"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const tips = [
  { category: "Transportation", tip: "Use public transport, bike, or walk instead of driving when possible." },
  { category: "Energy", tip: "Switch to energy-efficient appliances and LED light bulbs." },
  { category: "Food", tip: "Reduce meat consumption and choose locally sourced, seasonal produce." },
  { category: "Waste", tip: "Recycle, compost, and reduce single-use plastics." },
]

export default function CarbonTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  const nextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Carbon Reduction Tips</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{tips[currentTipIndex].category}</h3>
        <p className="text-gray-700">{tips[currentTipIndex].tip}</p>
      </div>
      <button onClick={nextTip} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Next Tip
      </button>
    </motion.div>
  )
}

