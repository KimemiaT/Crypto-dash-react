import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Fetch top 50 cryptocurrencies from CoinGecko API.
 * Returns: { coins, loading }
 */
const useCryptoData = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          { params: { vs_currency: "usd", order: "market_cap_desc", per_page: 50, page: 1, sparkline: false } }
        );
        setCoins(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { coins, loading };
};

export default useCryptoData;
