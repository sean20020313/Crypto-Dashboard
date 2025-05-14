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

// 註冊Chart.js所需的元素
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: '7', // 保持7天數據
            },
          }
        );
        const prices = response.data.prices;
        
        // 只顯示一週內的日期（去除時間）
        const labels = prices.map((price) =>
          new Date(price[0]).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        );

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
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    if (coinId) {
      fetchChartData();
    }
  }, [coinId]);

  return chartData ? (
    <Line
      data={chartData}
      options={{
        plugins: {
          legend: {
            display: false, // 隱藏圖例
          },
        },
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
            // 設置X軸顯示為一周的日期
            ticks: {
              autoSkip: true, // 跳過某些日期以避免重疊
              maxRotation: 45, // 旋轉標籤，防止重疊
              minRotation: 45,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price in USD',
            },
            ticks: {
              beginAtZero: false,
              callback: function (value) {
                return '$' + value.toFixed(2); // 格式化Y軸顯示
              },
            },
          },
        },
      }}
    />
  ) : (
    <p>Loading chart...</p>
  );
};

export default CoinChart;
