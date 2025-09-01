import { motion } from "framer-motion";

const CryptoCard = ({ coin, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    onClick={onClick}
    className="cursor-pointer bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 flex flex-col items-center"
  >
    <img src={coin.image} alt={coin.name} className="w-12 h-12 mb-2" />
    <h2 className="font-bold text-lg text-gray-900 dark:text-white">{coin.name}</h2>
    <p className="text-gray-500 dark:text-gray-400">{coin.symbol.toUpperCase()}</p>
    <p className="text-gray-900 dark:text-white font-semibold mt-1">${coin.current_price.toLocaleString()}</p>
    <p className={`mt-1 ${coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
      {coin.price_change_percentage_24h.toFixed(2)}%
    </p>
  </motion.div>
);

export default CryptoCard;
