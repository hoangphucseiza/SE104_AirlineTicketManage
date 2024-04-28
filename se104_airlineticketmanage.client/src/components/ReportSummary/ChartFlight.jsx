import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartFlight = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current && data) {
      const chartConfig = {
        type: "bar",
        data: {
          labels: data.map(item => item.maCB),
          datasets: [{
            label: "Doanh thu",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: data.map(item => item.revenue),
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };

      const myChart = new Chart(chartRef.current, chartConfig);

      // Cleanup
      return () => myChart.destroy();
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartFlight;
