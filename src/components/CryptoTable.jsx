const CryptoTable = ({ coins, onClick }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead className="bg-gray-200 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-2">Coin</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">24h %</th>
          <th className="px-4 py-2">Market Cap</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr key={coin.id} className="border-b border-gray-200 dark:border-gray-700 cursor-pointer" onClick={() => onClick(coin)}>
            <td className="px-4 py-2 flex items-center gap-2">
              <img src={coin.image} alt={coin.name} className="w-6 h-6" />
              {coin.name}
            </td>
            <td className="px-4 py-2">${coin.current_price.toLocaleString()}</td>
            <td className={`px-4 py-2 ${coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </td>
            <td className="px-4 py-2">${coin.market_cap.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CryptoTable;
