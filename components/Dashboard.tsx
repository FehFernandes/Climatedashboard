"use client"

import { useState, useEffect } from "react"
import WorldMap from "./WorldMap"
import TemperatureChart from "./TemperatureChart"
import CO2Chart from "./CO2Chart"
import DateSelector from "./DateSelector"
import LoadingSpinner from "./LoadingSpinner"
import { motion } from "framer-motion"
import YearComparison from "./YearComparison"
import FutureProjections from "./FutureProjections"
import ClimateImpacts from "./ClimateImpacts"
import CarbonTips from "./CarbonTips"
import ClimateNews from "./ClimateNews"
import CarbonFootprintCalculator from "./CarbonFootprintCalculator"

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(2020)
  const [climateData, setClimateData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/climate-data?year=${selectedYear}`)
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        setClimateData(data)
      } catch (error) {
        console.error("Failed to fetch climate data:", error)
        setError("Failed to load climate data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedYear])

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Advanced Climate Change Dashboard</h1>
          <DateSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
        </header>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1 lg:col-span-2"
            >
              <WorldMap data={climateData?.mapData} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TemperatureChart data={climateData?.temperatureData} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CO2Chart data={climateData?.co2Data} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="col-span-1 lg:col-span-2"
            >
              <YearComparison selectedYear={selectedYear} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <FutureProjections data={climateData} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <ClimateImpacts />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <CarbonTips />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <ClimateNews />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="col-span-1 lg:col-span-2"
            >
              <CarbonFootprintCalculator />
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

