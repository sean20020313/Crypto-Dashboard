import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: '7',
          },
        }
      );
      const prices = response.data.prices;
      const labels = prices.map((price) => new Date(price[0]).toLocaleTimeString());
      const data = prices.map((price) => price[1]);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Price in USD',
            data,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      });
    };
    fetchChartData();
  }, [coinId]);

  return chartData ? <Line data={chartData} /> : <p>Loading chart...</p>;
};

export default CoinChart;
