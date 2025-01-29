"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function CarbonFootprintCalculator() {
  const [transportation, setTransportation] = useState(0)
  const [energy, setEnergy] = useState(0)
  const [diet, setDiet] = useState(0)
  const [result, setResult] = useState(null)

  const calculateFootprint = () => {
    const total = transportation + energy + diet
    setResult(total)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Carbon Footprint Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Transportation (km/week)</label>
          <input
            type="number"
            value={transportation}
            onChange={(e) => setTransportation(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Energy Usage (kWh/month)</label>
          <input
            type="number"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Diet (1-5, 1 vegan, 5 meat-heavy)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={diet}
            onChange={(e) => setDiet(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          onClick={calculateFootprint}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Calculate
        </button>
        {result !== null && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Your Estimated Carbon Footprint:</h3>
            <p className="text-2xl font-bold text-green-600">{result.toFixed(2)} tons CO2/year</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

