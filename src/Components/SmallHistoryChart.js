import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historySmallOptions } from "../chartConfigs/chartConfigs";

const SmallHistoryChart = ({ data }) => {
  const chartRef2 = useRef();
  const { week } = data;
  const [timeFormat, setTimeFormat] = useState("7d");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "7d":
        return week;

      default:
        return week;
    }
  };
  const determineColorFormat = () => {
    switch (timeFormat) {
      // case "24h":
      //   return "rgba(13, 110, 253, 0.5)";
      case "7d":
        return "rgba(13, 110, 253, 0.5)";
      // case "1y":
      //   return "rgba(255, 193, 7, 0.5)";
      default:
        return "rgba(13, 110, 253, 0.5)";
    }
  };

  useEffect(() => {
    if (chartRef2 && chartRef2.current) {
      const chartInstance = new Chartjs(chartRef2.current, {
        type: "line",
        data: {
          datasets: [
            {
              // label: `${detail.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "rgba(174, 305, 194, 0.5)",
              borderColor: "rgba(13, 110, 253, 0.5)",
              border: "1px",
              pointRadius: 0,
            },
          ],
        },
        options: {
          // ...historySmallOptions,
          lineHeightAnnotation: {
            always: false,
            hover: false,
            lineWeight: 0.4,
          },
          // maintainAspectRatio: false,
          // responsive: true,
          scales: {
            xAxes: [
              {
                type: "time",
                // distribution: "linear",
                display: false,
              },
            ],
            yAxes: [
              {
                // type: "time",
                // distribution: "linear",
                display: false,
              },
            ],
          },
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
          },
          showTooltips: false,
        },
      });
    }
  });

  return (
    <>
      <canvas
        ref={chartRef2}
        id="myChart"
        width={100}
        height={50}
        style={{
          width: "100px !important",
          height: "30px !important",
          textDecoration: "none",
        }}
      ></canvas>
    </>
  );
};

export default SmallHistoryChart;
