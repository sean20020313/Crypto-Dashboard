import React, { useState } from 'react';
import CoinList from './CoinList';
import CoinDetail from './CoinDetail';  // 幣種詳情：圖表 + 估算器
import CryptoNews from './CryptoNews';

const Dashboard = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0b0c1a', color: '#eee' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#14161a',
        color: 'white',
        alignItems: 'center',
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>MyCrypto</div>
        <input
          type="search"
          placeholder="Search coins..."
          style={{ padding: '0.4rem 0.8rem', borderRadius: '4px', border: 'none', width: '200px' }}
          // 你可以增加搜尋功能
        />
      </nav>

      {/* 主體區塊 */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* 幣種列表 */}
        <div style={{ flex: 3, borderRight: '1px solid #222', overflowY: 'auto' }}>
          <CoinList onSelectCoin={setSelectedCoin} selectedCoin={selectedCoin} />
        </div>

        {/* 幣種詳細 */}
        <div style={{ flex: 4, padding: '1rem', overflowY: 'auto' }}>
          {selectedCoin ? (
            <CoinDetail coin={selectedCoin} />
          ) : (
            <p style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>
              請從左側列表選擇一個幣種查看詳情
            </p>
          )}
        </div>

        {/* 新聞 */}
        <div style={{ flex: 2, borderLeft: '1px solid #222', padding: '1rem', overflowY: 'auto' }}>
          <CryptoNews />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
