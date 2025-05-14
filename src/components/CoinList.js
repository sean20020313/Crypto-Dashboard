import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoinList = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 20,
              page: 1,
              sparkline: true,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div>
      <h1>Top 20 Cryptocurrencies</h1>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            <h2>{coin.name}</h2>
            <p>Price: ${coin.current_price}</p>
            <p>Market Cap: ${coin.market_cap}</p>
            <p>24h Change: {coin.price_change_percentage_24h}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinList;
