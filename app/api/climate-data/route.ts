import { NextResponse } from "next/server";

const NASA_API_KEY = process.env.NASA_API_KEY; //Sua chave de API da NASA
const GISTEMP_BASE_URL =
  "https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv";
const POWER_BASE_URL = "https://power.larc.nasa.gov/api/temporal/monthly/point";

interface TemperatureData {
  month: number;
  temperature: number;
}

interface CO2Data {
  year: number;
  level: number;
}

interface MapData {
  country: string;
  value: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year") || "2020";

  try {
    const tempResponse = await fetch(GISTEMP_BASE_URL);
    const tempText = await tempResponse.text();
    const temperatureData = parseGISTEMPData(tempText, parseInt(year));

    const co2Response = await fetch(
      `${POWER_BASE_URL}?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=0&latitude=0&start=${
        parseInt(year) - 4
      }&end=${year}&format=JSON`,
      {
        headers: {
          Authorization: `Bearer ${NASA_API_KEY}`,
        },
      }
    );
    const co2Json = await co2Response.json();
    const co2Data = parseCO2Data(co2Json, parseInt(year));

    const mapData = await fetchTemperatureAnomalies(parseInt(year));

    return NextResponse.json({
      mapData,
      temperatureData,
      co2Data,
    });
  } catch (error) {
    console.error("Error fetching climate data:", error);
    return NextResponse.json(
      { error: "Failed to fetch climate data" },
      { status: 500 }
    );
  }
}

function parseGISTEMPData(
  csvText: string,
  targetYear: number
): TemperatureData[] {
  const lines = csvText.split("\n");
  const yearData = lines.find((line) => line.startsWith(targetYear.toString()));

  if (!yearData) return [];

  const values = yearData.split(",").slice(1, 13);

  return values.map((temp, index) => ({
    month: index + 1,
    temperature: parseFloat(temp) / 100 + 14,
  }));
}

function parseCO2Data(powerData: any, targetYear: number): CO2Data[] {
  const years = Array.from({ length: 5 }, (_, i) => targetYear - 4 + i);
  return years.map((year) => ({
    year,
    level: calculateAverageCO2Level(powerData, year),
  }));
}

function calculateAverageCO2Level(powerData: any, year: number): number {
  const yearData = powerData.properties.parameter.ALLSKY_SFC_SW_DWN[year] || {};
  const values = Object.values(yearData) as number[];
  const average =
    values.reduce((sum: number, val: number) => sum + val, 0) / values.length;
  return 400 + (average - 200) / 10;
}

async function fetchTemperatureAnomalies(year: number): Promise<MapData[]> {
  const countries = [
    { name: "United States", lat: 37.0902, lon: -95.7129 },
    { name: "China", lat: 35.8617, lon: 104.1954 },
    { name: "Russia", lat: 61.524, lon: 105.3188 },
    { name: "Brazil", lat: -14.235, lon: -51.9253 },
    { name: "India", lat: 20.5937, lon: 78.9629 },
    { name: "Canada", lat: 56.1304, lon: -106.3468 },
    { name: "Australia", lat: -25.2744, lon: 133.7751 },
    { name: "Germany", lat: 51.1657, lon: 10.4515 },
    { name: "Japan", lat: 36.2048, lon: 138.2529 },
    { name: "United Kingdom", lat: 55.3781, lon: -3.436 },
  ];

  const promises = countries.map(async (country) => {
    const response = await fetch(
      `${POWER_BASE_URL}?parameters=T2M&community=RE&longitude=${country.lon}&latitude=${country.lat}&start=${year}&end=${year}&format=JSON`,
      {
        headers: {
          Authorization: `Bearer ${NASA_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    const anomaly = calculateTemperatureAnomaly(data, year);

    return {
      country: country.name,
      value: anomaly,
    };
  });

  return Promise.all(promises);
}

function calculateTemperatureAnomaly(powerData: any, year: number): number {
  const monthlyTemps = powerData.properties.parameter.T2M[year];
  const avgTemp =
    Object.values(monthlyTemps).reduce(
      (sum: number, temp: number) => sum + temp,
      0
    ) / 12;
  return parseFloat((avgTemp - 14).toFixed(1));
}
