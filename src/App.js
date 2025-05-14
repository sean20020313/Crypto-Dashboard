import React from 'react';
import CoinList from './components/CoinList';
import CoinChart from './components/CoinChart';
import Estimator from './components/Estimator';

function App() {
  return (
    <div className="App">
      <h1>Crypto Dashboard</h1>
      <CoinList />
      <CoinChart coinId="bitcoin" />
      <Estimator />
    </div>
  );
}

export default App;
