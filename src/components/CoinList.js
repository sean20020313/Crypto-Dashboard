import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoinChart from './CoinChart';
import Estimator from './Estimator';

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [visibleCoinId, setVisibleCoinId] = useState(null);

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
              sparkline: false,
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

  const toggleVisibility = (coinId) => {
    setVisibleCoinId(visibleCoinId === coinId ? null : coinId);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Top 20 Cryptocurrencies</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {coins.map((coin) => (
          <li key={coin.id} style={styles.coinItem}>
            <div style={styles.coinHeader}>
              <img src={coin.image} alt={coin.name} style={styles.coinImage} />
              <h2 style={styles.coinName}>{coin.name}</h2>
            </div>
            <p>Price: ${coin.current_price}</p>
            <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
            <p>24h Change: {coin.price_change_percentage_24h}%</p>

            <button style={styles.toggleButton} onClick={() => toggleVisibility(coin.id)}>
              {visibleCoinId === coin.id ? 'Hide Details' : 'Show Details'}
            </button>

            {visibleCoinId === coin.id && (
              <div style={styles.detailBox}>
                <CoinChart coinId={coin.id} />
                <Estimator />
              </div>
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
    alignItems: 'flex-start',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  coinHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  coinImage: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'contain',
  },
  coinName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: 0,
  },
  toggleButton: {
    marginTop: '0.5rem',
    padding: '0.4rem 0.8rem',
    border: 'none',
    borderRadius: '8px',
    background: '#444',
    color: '#fff',
    cursor: 'pointer',
  },
  detailBox: {
    marginTop: '1rem',
    width: '100%',
  },
};

export default CoinList;
