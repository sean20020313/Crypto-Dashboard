import React from 'react';
import CoinChart from './CoinChart';
import Estimator from './Estimator';

const CoinDetail = ({ coin }) => {
  return (
    <div>
      <h2>{coin.name} 詳細資料</h2>
      <CoinChart coinId={coin.id} />
      <Estimator circulatingSupply={coin.circulating_supply} />
    </div>
  );
};

export default CoinDetail;
