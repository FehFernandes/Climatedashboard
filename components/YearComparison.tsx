"use client"

import { useState, useEffect } from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { motion } from "framer-motion"

export default function YearComparison({ selectedYear }) {
  const [comparisonData, setComparisonData] = useState(null)

  useEffect(() => {
    const fetchComparisonData = async () => {
      const data = [
        { year: selectedYear - 5, temperature: 14.5, co2: 410 },
        { year: selectedYear, temperature: 15.2, co2: 415 },
      ]
      setComparisonData(data)
    }

    fetchComparisonData()
  }, [selectedYear])

  if (!comparisonData) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">5-Year Comparison</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="temperature" name="Avg. Temperature (°C)" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="co2" name="CO2 (ppm)" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

