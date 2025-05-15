import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoinList = ({ onSelectCoin, selectedCoin }) => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 20, page: 1, sparkline: false }
    }).then(res => setCoins(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
      {coins.map(coin => (
        <li
          key={coin.id}
          onClick={() => onSelectCoin(coin)}
          style={{
            cursor: 'pointer',
            backgroundColor: selectedCoin?.id === coin.id ? '#222' : 'transparent',
            padding: '1rem',
            borderBottom: '1px solid #222',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <img src={coin.image} alt={coin.name} style={{ width: 24, height: 24, borderRadius: '50%' }} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{coin.name}</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>${coin.current_price.toLocaleString()}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CoinList;
