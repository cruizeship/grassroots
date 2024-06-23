// screens/FeedScreen.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './FeedScreen.css';

function FeedScreen() {
    const location = useLocation();
    const { articles } = location.state;

    return (
        <div className="container">
            <div className="feed-title">
            <h1>Your daily sprouts!</h1></div>
            <div className="feed-screen">  
                <div className="article-grid">
                    {articles.map((article, index) => (
                        <div key={index} className={`article-card ${index % 3 === 0 ? 'larger' : ''}`}>
                            <img
                                src="https://via.placeholder.com/150"
                                alt={`Article ${index + 1}`}
                                className="article-image"
                            />
                            <h2 className="article-headline">{article.headline}</h2>
                        
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeedScreen;
