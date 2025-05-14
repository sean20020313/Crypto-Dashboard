import React, { useState } from 'react';

const Estimator = ({ initialPrice = '', initialSupply = '', initialMarketCap = '' }) => {
  const [price, setPrice] = useState(initialPrice);
  const [marketCap, setMarketCap] = useState(initialMarketCap);
  const [circulatingSupply, setCirculatingSupply] = useState(initialSupply);
  const [targetPrice, setTargetPrice] = useState('');
  const [profit, setProfit] = useState(null);
  const [requiredMarketCap, setRequiredMarketCap] = useState(null);
  const [marketShare, setMarketShare] = useState(null);

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    if (e.target.value && circulatingSupply) {
      setMarketCap(e.target.value * circulatingSupply);
    }
  };

  const handleTargetPriceChange = (e) => {
    setTargetPrice(e.target.value);
    if (e.target.value && circulatingSupply) {
      const newProfit = (e.target.value - price) * circulatingSupply;
      setProfit(newProfit);
      setRequiredMarketCap(e.target.value * circulatingSupply);
      setMarketShare(((e.target.value * circulatingSupply) / (marketCap || 1)) * 100);  // 計算市占率
    }
  };

  const handleSupplyChange = (e) => {
    setCirculatingSupply(e.target.value);
    if (price && e.target.value) {
      setMarketCap(price * e.target.value);
    }
  };

  return (
    <div>
      <h3>Market Cap Estimator</h3>
      <div>
        <label>Current Price (USD): </label>
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter price"
        />
      </div>
      <div>
        <label>Target Price (USD): </label>
        <input
          type="number"
          value={targetPrice}
          onChange={handleTargetPriceChange}
          placeholder="Enter target price"
        />
      </div>
      <div>
        <label>Circulating Supply: </label>
        <input
          type="number"
          value={circulatingSupply}
          onChange={handleSupplyChange}
          placeholder="Enter circulating supply"
        />
      </div>
      <div>
        <p>Estimated Market Cap: ${marketCap.toLocaleString()}</p>
        {profit !== null && (
          <p>Potential Profit: ${profit.toLocaleString()}</p>
        )}
        {requiredMarketCap !== null && (
          <p>Required Market Cap for Target Price: ${requiredMarketCap.toLocaleString()}</p>
        )}
        {marketShare !== null && (
          <p>Market Share: {marketShare.toFixed(2)}%</p>
        )}
      </div>
    </div>
  );
};

export default Estimator;
