"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { feature } from "topojson-client"
import { motion } from "framer-motion"

export default function WorldMap({ data }) {
  const svgRef = useRef()
  const [tooltipContent, setTooltipContent] = useState("")
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (data) {
      const svg = d3.select(svgRef.current)
      svg.selectAll("*").remove()

      const width = 800
      const height = 400

      const projection = d3
        .geoNaturalEarth1()
        .scale(width / 2 / Math.PI)
        .translate([width / 2, height / 2])

      const path = d3.geoPath().projection(projection)

      const colorScale = d3
        .scaleSequential(d3.interpolateRdYlBu)
        .domain([d3.max(data, (d) => d.value), d3.min(data, (d) => d.value)])

      const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed)

      const g = svg.append("g")

      svg.call(zoom)

      d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((worldData) => {
        const countries = feature(worldData, worldData.objects.countries)

        g.selectAll("path")
          .data(countries.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("fill", (d) => {
            const countryData = data.find((item) => item.country === d.properties.name)
            return countryData ? colorScale(countryData.value) : "#ccc"
          })
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5)
          .on("mouseover", function (event, d) {
            d3.select(this).attr("stroke", "#000").attr("stroke-width", 1)
            const countryData = data.find((item) => item.country === d.properties.name)
            if (countryData) {
              setTooltipContent(`${d.properties.name}: ${countryData.value.toFixed(2)}°C`)
              const [x, y] = path.centroid(d)
              setTooltipPosition({ x, y })
            }
          })
          .on("mouseout", function () {
            d3.select(this).attr("stroke", "#fff").attr("stroke-width", 0.5)
            setTooltipContent("")
          })

        const legendWidth = 200
        const legendHeight = 20

        const legendScale = d3.scaleLinear().domain(colorScale.domain()).range([0, legendWidth])

        const legendAxis = d3.axisBottom(legendScale).ticks(5).tickFormat(d3.format(".1f"))

        const legend = svg.append("g").attr("transform", `translate(${width - legendWidth - 20}, ${height - 40})`)

        legend
          .append("g")
          .selectAll("rect")
          .data(d3.range(0, legendWidth))
          .enter()
          .append("rect")
          .attr("x", (d) => d)
          .attr("y", 0)
          .attr("width", 1)
          .attr("height", legendHeight)
          .attr("fill", (d) => colorScale(legendScale.invert(d)))

        legend.append("g").attr("transform", `translate(0, ${legendHeight})`).call(legendAxis)
      })

      function zoomed(event) {
        g.attr("transform", event.transform)
      }
    }
  }, [data])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Global Temperature Anomalies</h2>
      <div className="relative">
        <svg ref={svgRef} width="100%" height="400" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet"></svg>
        {tooltipContent && (
          <div
            className="absolute bg-black text-white px-2 py-1 rounded pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transition: "all 0.1s ease-out",
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 mt-2">Tip: Scroll to zoom, drag to pan the map</p>
    </motion.div>
  )
}

