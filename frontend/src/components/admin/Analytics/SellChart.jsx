import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles"; // Import styled
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const salesData = {
  2023: {
    January: 400,
    February: 300,
    March: 200,
    April: 500,
    May: 600,
    June: 700,
    July: 500,
    August: 600,
    September: 300,
    October: 400,
    November: 800,
    December: 900,
  },
  2024: {
    January: 500,
    February: 600,
    March: 700,
    April: 800,
    May: 900,
    June: 1000,
    July: 1100,
    August: 1200,
    September: 1300,
    October: 1400,
    November: 1500,
    December: 1600,
  },
};

// Styled MenuItem with hover effect
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "rgba(136, 132, 216, 0.2)", // Hover background color
  },
}));

const SellChart = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        backgroundColor: "rgba(136, 132, 216, 0.2)",
        borderColor: "rgba(136, 132, 216, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        backgroundColor: [
          "rgba(136, 132, 216, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(136, 132, 216, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (salesData[selectedYear]) {
      const data = Object.entries(salesData[selectedYear]).map(
        ([month, sales]) => ({
          month,
          sales,
        })
      );

      setBarChartData({
        labels: data.map((item) => item.month),
        datasets: [
          {
            label: "Sales",
            data: data.map((item) => item.sales),
            backgroundColor: "rgba(136, 132, 216, 0.2)",
            borderColor: "rgba(136, 132, 216, 1)",
            borderWidth: 1,
          },
        ],
      });

      setPieChartData({
        labels: data.map((item) => item.month),
        datasets: [
          {
            label: "Sales",
            data: data.map((item) => item.sales),
            backgroundColor: [
              "rgba(136, 132, 216, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderColor: [
              "rgba(136, 132, 216, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    } else {
      setBarChartData({
        labels: [],
        datasets: [
          {
            label: "Sales",
            data: [],
            backgroundColor: "rgba(136, 132, 216, 0.2)",
            borderColor: "rgba(136, 132, 216, 1)",
            borderWidth: 1,
          },
        ],
      });

      setPieChartData({
        labels: [],
        datasets: [
          {
            label: "Sales",
            data: [],
            backgroundColor: [
              "rgba(136, 132, 216, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderColor: [
              "rgba(136, 132, 216, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [selectedYear]);

  return (
    <Box p={4}>
      <Typography
        variant="h6"
        gutterBottom
        className="dark:text-gray-300 text-gray-600"
      >
        Sales Data for Year {selectedYear}
      </Typography>

      {/* Year Filter Dropdown */}
      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          className="dark:text-gray-300 text-gray-700"
        >
          Select Year
        </FormLabel>
        <RadioGroup
          row
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {Object.keys(salesData).map((year) => (
            <FormControlLabel
              key={year}
              value={year}
              control={<Radio />}
              label={year}
              className="dark:text-gray-300 text-gray-600"
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Charts */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column", // Stack charts vertically on extra-small screens
            lg: "row", // Display charts side by side on large screens
          },
          justifyContent: {
            xs: "center", // Center charts vertically on small screens
            lg: "space-between", // Space between charts on large screens
          },
          gap: 2, // Gap between charts
        }}
      >
        {/* Bar Chart */}
        <Box
          sx={{
            flex: 1,
            height: 400,
          }}
        >
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return context.dataset.label + ": " + context.raw;
                    },
                  },
                },
              },
            }}
          />
        </Box>

        {/* Pie Chart */}
        <Box
          sx={{
            flex: 1,
            height: 400,
          }}
        >
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return context.dataset.label + ": " + context.raw;
                    },
                  },
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SellChart;
