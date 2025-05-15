import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoNews = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // 你可以換成 CryptoNews API 或其他免費新聞API
        const res = await axios.get('https://cryptonews-api.com/api/v1/category', {
          params: {
            section: 'general',
            items: 10,
            token: 'YOUR_API_KEY',
          },
        });
        setNewsList(res.data.data || []);
      } catch (error) {
        console.error('Fetching news failed:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h3>最新加密貨幣新聞</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {newsList.map(news => (
          <li key={news.news_id} style={{ marginBottom: '1rem' }}>
            <a href={news.news_url} target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7', textDecoration: 'none' }}>
              {news.title}
            </a>
            <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{new Date(news.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoNews;
