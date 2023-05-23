import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css'

const MainComponent = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        const response = await axios.get(
          
'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f00ae70cdf714eeda4c02bd875df598d'
        );
        console.log(response.data.articles)
        setNewsArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch news articles.');
        setLoading(false);
      }
    };

    fetchNewsArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      {newsArticles.map((article, index) => (
        <div className="card" key={index}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <p>Source: {article.source.name}</p>
          <p>Publication Date: {article.publishedAt}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default MainComponent;
