"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const dummyNews = [
  { title: "New Study Shows Accelerating Ice Melt in Antarctica", date: "2025-01-02" },
  { title: "Global Leaders Agree on New Climate Pact", date: "2025-01-10" },
  { title: "Renewable Energy Surpasses Coal in Energy Production", date: "2023-12-05" },
]

export default function ClimateNews() {
  const [news, setNews] = useState([])

  useEffect(() => {
    setNews(dummyNews)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Climate News</h2>
      <ul className="space-y-2">
        {news.map((item, index) => (
          <li key={index} className="border-b border-gray-200 pb-2">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.date}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

