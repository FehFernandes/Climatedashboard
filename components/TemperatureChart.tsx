"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { motion } from "framer-motion"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function TemperatureChart({ data }) {
  if (!data || data.length === 0) {
    return <div>No temperature data available</div>
  }

  const formattedData = data.map((item) => ({
    ...item,
    month: monthNames[item.month - 1],
    temperature: Number(item.temperature.toFixed(2)),
  }))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Global Temperature Trend</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={formattedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft" }} stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "0.5rem" }}
              formatter={(value) => [`${value}°C`, "Temperature"]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#ff7300"
              activeDot={{ r: 8 }}
              strokeWidth={2}
              name="Temperature"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

