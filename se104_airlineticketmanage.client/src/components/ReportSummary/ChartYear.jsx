import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
//install: npm install chart.js@^3.7.0 react-chartjs-2@^3.0.4
// npm install @fortawesome/react-fontawesome

const ChartYear = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const chartConfig = {
        type: "line",
        data: {
          labels: data.map(item => item.Thang),
          datasets: [{
            label: "Doanh thu",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(23, 121, 196, 0.8)",
            borderWidth: 2,
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

export default ChartYear;
