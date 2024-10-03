// BarChart.js
import { ResponsiveBar } from "@nivo/bar";
import React from "react";

const data = [
  { country: "USA", value: 100 },
  { country: "Germany", value: 80 },
  { country: "France", value: 60 },
  { country: "UK", value: 90 },
  { country: "Ethiopia", value: 100 },
  { country: "Somalia", value: 60 },
  { country: "Kenya", value: 93 },
];

const BarChart = () => (
  <div className="min-h-[200px] h-full">
    <ResponsiveBar
      data={data}
      keys={["value"]}
      indexBy="country"
      padding={0.3}
      colors={{ scheme: "dark2" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Value",
        legendPosition: "middle",
        legendOffset: -40,
      }}
    />
  </div>
);

export default BarChart;
