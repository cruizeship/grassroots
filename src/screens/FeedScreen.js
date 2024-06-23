// screens/FeedScreen.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './FeedScreen.css';

function FeedScreen() {
    const location = useLocation();
    const { articles } = location.state || { articles: [] };

    return (
        <div className="feed-page">
            <h1>Feed Screen</h1>
            <div className="article-grid">
                {articles.map((article, index) => (
                    <div key={index} className="article-card">
                        <img src={article.image_url} alt={article.headline} />
                        <h2>{article.headline}</h2>
                        <p>Article Content...</p>
                        <a href="#">Read More</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeedScreen;
