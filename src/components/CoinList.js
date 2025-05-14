import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoinChart from './CoinChart';
import Estimator from './Estimator';

const CoinList = () => {
  const [coins, setCoins] = useState([]); // 初始為空陣列
  const [visibleCoinId, setVisibleCoinId] = useState(null); // 確保此狀態初始化為 null

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

  // 點擊按鈕切換顯示
  const toggleVisibility = (coinId) => {
    setVisibleCoinId(visibleCoinId === coinId ? null : coinId); // 當點擊時切換顯示
  };

  return (
    <div>
      <h1>Top 20 Cryptocurrencies</h1>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id} style={styles.coinItem}>
            <h2>{coin.name}</h2>
            <p>Price: ${coin.current_price}</p>
            <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
            <p>24h Change: {coin.price_change_percentage_24h}%</p>

            {/* 點擊按鈕顯示/隱藏圖表和市值計算 */}
            <button onClick={() => toggleVisibility(coin.id)}>
              {visibleCoinId === coin.id ? 'Hide Details' : 'Show Details'}
            </button>

            {/* 顯示圖表和市值計算 */}
            {visibleCoinId === coin.id && (
              <>
                <CoinChart coinId={coin.id} />
                <Estimator
                  initialPrice={coin.current_price}
                  initialSupply={coin.circulating_supply}
                  initialMarketCap={coin.market_cap}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  coinItem: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    margin: '1rem 0',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
};

export default CoinList;
