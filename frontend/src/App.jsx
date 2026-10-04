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

  // Listings states
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalListingsFound, setTotalListingsFound] = useState(0);
  const [loading, setLoading] = useState(false);

  // =========================================
  // Dashboard Statistics
  // =========================================

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/stats/city")
      .then((response) => {
        setCityData(response.data);
      })
      .catch((error) => {
        console.error("City API Error:", error);
      });

    axios
      .get("http://127.0.0.1:8000/stats/category")
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.error("Category API Error:", error);
      });

    axios
      .get("http://127.0.0.1:8000/stats/source")
      .then((response) => {
        setSourceData(response.data);
      })
      .catch((error) => {
        console.error("Source API Error:", error);
      });
  }, []);

  // =========================================
  // Calculate Total Listings
  // =========================================

  useEffect(() => {
    const total = cityData.reduce(
      (sum, item) => sum + item.count,
      0
    );

    setTotalListings(total);
  }, [cityData]);

  // =========================================
  // Reset Page When Filters Change
  // =========================================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedCity,
    selectedCategory,
    selectedSource,
  ]);

  // =========================================
  // Fetch Listings
  // =========================================

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://127.0.0.1:8000/listings",
          {
            params: {
              search: search.trim(),
              city: selectedCity,
              category: selectedCategory,
              source: selectedSource,
              page: currentPage,
              limit: 20,
            },
          }
        );

        setListings(response.data.data);
        setTotalListingsFound(response.data.total);
      } catch (error) {
        console.error("Listings API Error:", error);
        setListings([]);
        setTotalListingsFound(0);
      } finally {
        setLoading(false);
      }
    };

    // Small delay for search
    const timer = setTimeout(() => {
      fetchListings();
    }, 300);

    return () => clearTimeout(timer);
  }, [
    search,
    selectedCity,
    selectedCategory,
    selectedSource,
    currentPage,
  ]);

  // =========================================
  // Pagination
  // =========================================

  const totalPages = Math.ceil(totalListingsFound / 20);

  // =========================================
  // Clear All Filters
  // =========================================

  const clearFilters = () => {
    setSearch("");
    setSelectedCity("");
    setSelectedCategory("");
    setSelectedSource("");
    setCurrentPage(1);
  };

  // =========================================
  // JSX
  // =========================================

  return (
    <div className="dashboard">

      {/* =========================================
          Header
          ========================================= */}

      <div className="dashboard-header">
        <h1>Business Listings Dashboard</h1>

        <p>
          Overview of businesses by city, category and data source
        </p>
      </div>

      {/* =========================================
          Summary Cards
          ========================================= */}

      <div className="summary-cards">

        <div className="summary-card">
          <h3>Total Listings</h3>

          <div className="number">
            {totalListings}
          </div>
        </div>

        <div className="summary-card">
          <h3>Total Cities</h3>

          <div className="number">
            {cityData.length}
          </div>
        </div>

        <div className="summary-card">
          <h3>Total Categories</h3>

          <div className="number">
            {categoryData.length}
          </div>
        </div>

      </div>

      {/* =========================================
          Charts
          ========================================= */}

      <div className="charts-grid">

        {/* City Chart */}

        <div className="chart-card full-width">

          <h2>City-wise Listings</h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={cityData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

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

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={categoryData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

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

          <ResponsiveContainer
            width="100%"
            height={320}
          >
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
                  <Cell
                    key={`cell-${index}`}
                  />
                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* =========================================
          Listings Section
          ========================================= */}

      <div className="listings-section">

        {/* Listings Header */}

        <div className="listings-header">

          <div>

            <h2>
              Business Listings
            </h2>

            <p>
              Showing {totalListingsFound} matching listings
            </p>

          </div>

        </div>

        {/* =========================================
            Filters
            ========================================= */}

        <div className="listing-filters">

          {/* Search */}

          <input
            type="text"
            placeholder="Search business..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          {/* City Filter */}

          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
            }}
          >

            <option value="">
              All Cities
            </option>

            {cityData.map((item) => (
              <option
                key={item.city}
                value={item.city}
              >
                {item.city}
              </option>
            ))}

          </select>

          {/* Category Filter */}

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >

            <option value="">
              All Categories
            </option>

            {categoryData.map((item) => (
              <option
                key={item.category}
                value={item.category}
              >
                {item.category}
              </option>
            ))}

          </select>

          {/* Source Filter */}

          <select
            value={selectedSource}
            onChange={(e) => {
              setSelectedSource(e.target.value);
            }}
          >

            <option value="">
              All Sources
            </option>

            {sourceData.map((item) => (
              <option
                key={item.source}
                value={item.source}
              >
                {item.source}
              </option>
            ))}

          </select>

        </div>

        {/* =========================================
            Clear Filters
            ========================================= */}

        {(search ||
          selectedCity ||
          selectedCategory ||
          selectedSource) && (

          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        )}

        {/* =========================================
            Listings Table
            ========================================= */}

        <div className="listings-table-wrapper">

          <table className="listings-table">

            <thead>

              <tr>

                <th>
                  Business Name
                </th>

                <th>
                  Category
                </th>

                <th>
                  City
                </th>

                <th>
                  Address
                </th>

                <th>
                  Phone
                </th>

                <th>
                  Source
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="no-listings"
                  >
                    Loading listings...
                  </td>

                </tr>

              ) : listings.length > 0 ? (

                listings.map((listing) => (

                  <tr key={listing.id}>

                    <td>
                      {listing.business_name}
                    </td>

                    <td>
                      {listing.category}
                    </td>

                    <td>
                      {listing.city}
                    </td>

                    <td>
                      {listing.address}
                    </td>

                    <td>
                      {listing.phone || "N/A"}
                    </td>

                    <td>
                      {listing.source}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="no-listings"
                  >
                    No listings found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* =========================================
            Pagination
            ========================================= */}

        <div className="pagination">

          <button
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(page - 1, 1)
              )
            }
            disabled={
              currentPage === 1 ||
              loading
            }
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(
                  page + 1,
                  totalPages
                )
              )
            }
            disabled={
              currentPage === totalPages ||
              totalPages === 0 ||
              loading
            }
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;