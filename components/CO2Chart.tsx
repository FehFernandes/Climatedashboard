"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { motion } from "framer-motion"

export default function CO2Chart({ data }) {
  if (!data || data.length === 0) {
    return <div>No CO2 data available</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">CO2 Levels</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="year" stroke="#666" />
            <YAxis label={{ value: "CO2 Level (ppm)", angle: -90, position: "insideLeft" }} stroke="#666" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "0.5rem" }} />
            <Legend />
            <Bar dataKey="level" fill="#82ca9d" name="CO2 Level" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

