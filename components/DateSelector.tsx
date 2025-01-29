import { motion } from "framer-motion"

export default function DateSelector({ selectedYear, onYearChange }) {
  const years = Array.from({ length: 31 }, (_, i) => 2020 - i)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-4"
    >
      <label htmlFor="year-select" className="text-lg font-semibold text-gray-700">
        Explore data for:
      </label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="p-2 text-lg bg-white bg-opacity-50 border-2 border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </motion.div>
  )
}

