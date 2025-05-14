import React, { useState } from 'react';

const Estimator = () => {
  const [price, setPrice] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [circulatingSupply, setCirculatingSupply] = useState('');

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    if (e.target.value && circulatingSupply) {
      setMarketCap(e.target.value * circulatingSupply);
    }
  };

  const handleMarketCapChange = (e) => {
    setMarketCap(e.target.value);
    if (e.target.value && circulatingSupply) {
      setPrice(e.target.value / circulatingSupply);
    }
  };

  const handleCirculatingSupplyChange = (e) => {
    setCirculatingSupply(e.target.value);
    if (price && e.target.value) {
      setMarketCap(price * e.target.value);
    }
  };

  return (
    <div>
      <h2>Market Cap / Price Estimator</h2>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={handlePriceChange}
      />
      <input
        type="number"
        placeholder="Market Cap"
        value={marketCap}
        onChange={handleMarketCapChange}
      />
      <input
        type="number"
        placeholder="Circulating Supply"
        value={circulatingSupply}
        onChange={handleCirculatingSupplyChange}
      />
    </div>
  );
};

export default Estimator;
