import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ChartModal = ({ coin, onClose }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart`, {
          params: { vs_currency: "usd", days: 7 }
        });
        setChartData(res.data.prices);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchHistory();
  }, [coin.id]);

  if (!coin) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        className="bg-white dark:bg-gray-900 p-6 rounded-lg w-11/12 md:w-2/3"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{coin.name} - 7 Day Chart</h2>
          <button onClick={onClose} className="text-gray-900 dark:text-white font-bold text-xl">&times;</button>
        </div>
        {loading ? <p className="text-gray-900 dark:text-white">Loading chart...</p> :
          <Line 
            data={{
              labels: chartData.map(item => new Date(item[0]).toLocaleDateString()),
              datasets: [
                { label: "Price (USD)", data: chartData.map(item => item[1]), borderColor: "rgba(34,197,94,1)", backgroundColor: "rgba(34,197,94,0.2)", fill: true, tension: 0.3 }
              ]
            }}
          />
        }
      </motion.div>
    </div>
  );
};

export default ChartModal;
