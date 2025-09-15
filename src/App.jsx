import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import DarkModeToggle from "./components/DarkModeToggle";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [chartData, setChartData] = useState({});
  const [loadingChart, setLoadingChart] = useState(false);

  // Fetch top 20 coins
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true"
      )
      .then((res) => setCoins(res.data));
  }, []);

  // Main chart for selected coin
  useEffect(() => {
    if (!selectedCoin) return;
    setLoadingChart(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=usd&days=7`
      )
      .then((res) => {
        const labels = res.data.prices.map((p) =>
          new Date(p[0]).toLocaleDateString()
        );
        const data = res.data.prices.map((p) => p[1]);
        setChartData({
          labels,
          datasets: [
            {
              label: `${selectedCoin.name} Price (USD)`,
              data,
              borderColor: "#4f46e5",
              backgroundColor: "rgba(79, 70, 229, 0.2)",
              tension: 0.3,
              fill: true,
              pointRadius: 2,
            },
          ],
        });
        setLoadingChart(false);
      });
  }, [selectedCoin]);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center p-6 shadow-md bg-white dark:bg-gray-800 rounded-b-xl">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Crypto Dashboard</h1>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search coin..."
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DarkModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Coin Cards */}
        {filteredCoins.map((coin) => {
          const sparklineData = {
            labels: coin.sparkline_in_7d.price.map((_, i) => i),
            datasets: [
              {
                data: coin.sparkline_in_7d.price,
                borderColor: coin.price_change_percentage_24h >= 0 ? "#16a34a" : "#dc2626",
                backgroundColor: "transparent",
                tension: 0.3,
                pointRadius: 0,
              },
            ],
          };

          return (
            <motion.div
              key={coin.id}
              className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setSelectedCoin(coin)}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-4">
                <img src={coin.image} alt={coin.name} className="w-12 h-12" />
                <div>
                  <h2 className="font-bold text-lg">{coin.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {coin.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-gray-700 dark:text-gray-300">
                  Price: <span className="font-semibold">${coin.current_price.toLocaleString()}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Market Cap: <span className="font-semibold">${coin.market_cap.toLocaleString()}</span>
                </p>
                <p
                  className={
                    coin.price_change_percentage_24h > 0
                      ? "text-green-500 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
24h: {(coin.price_change_percentage_24h * 100).toFixed(2)}%
                </p>
              </div>
              {/* Mini Sparkline Chart */}
              <div className="mt-3">
                <Line
                  data={sparklineData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { x: { display: false }, y: { display: false } },
                    elements: { line: { borderWidth: 2 } },
                  }}
                  height={50}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Main Chart */}
        {selectedCoin && (
          <motion.div
            className="col-span-full p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedCoin.name} Price Chart (7 days)
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">USD</p>
            </div>
            {loadingChart ? (
              <p>Loading chart...</p>
            ) : (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: true, position: "top" } },
                  interaction: { mode: "index", intersect: false },
                  scales: {
                    x: { grid: { display: false } },
                    y: { grid: { color: "rgba(200,200,200,0.1)" } },
                  },
                }}
              />
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default App;
