import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import "./App.css";

function App() {
  const [cityData, setCityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [totalListings, setTotalListings] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/stats/city")
      .then((response) => {
        setCityData(response.data);
      })
      .catch((error) => {
        console.log("City API Error:", error);
      });

    axios
      .get("http://127.0.0.1:8000/stats/category")
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.log("Category API Error:", error);
      });

    axios
      .get("http://127.0.0.1:8000/stats/source")
      .then((response) => {
        setSourceData(response.data);
      })
      .catch((error) => {
        console.log("Source API Error:", error);
      });
  }, []);

  useEffect(() => {
    const total = cityData.reduce(
      (sum, item) => sum + item.count,
      0
    );

    setTotalListings(total);
  }, [cityData]);

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <h1>Business Listings Dashboard</h1>
        <p>
          Overview of businesses by city, category and data source
        </p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">

        <div className="summary-card">
          <h3>Total Listings</h3>
          <div className="number">{totalListings}</div>
        </div>

        <div className="summary-card">
          <h3>Total Cities</h3>
          <div className="number">{cityData.length}</div>
        </div>

        <div className="summary-card">
          <h3>Total Categories</h3>
          <div className="number">{categoryData.length}</div>
        </div>

      </div>

      {/* Charts */}
      <div className="charts-grid">

        {/* City Chart */}
        <div className="chart-card full-width">
          <h2>City-wise Listings</h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={cityData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="city" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#2563eb"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Chart */}
        <div className="chart-card">
          <h2>Category-wise Listings</h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="category" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#16a34a"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Source Chart */}
        <div className="chart-card">
          <h2>Source-wise Listings</h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>

              <Pie
                data={sourceData}
                dataKey="count"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

export default App;