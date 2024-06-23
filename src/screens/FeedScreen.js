// screens/FeedScreen.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './FeedScreen.css';

function FeedScreen() {
    const location = useLocation();
    const { articles } = location.state;

    const navigateToArticle = (article) => {
        history.push('/article', {
            headline: article.headline,
            links: article.links,
            imageLink: article.imageLink
        });
    };

    return (
        <div className="feed-screen">
            <div className="article-grid">
                {articles.map((article, index) => (
                    <div key={index} className={`article-card ${index % 3 === 0 ? 'larger' : ''}`}>
                        <img
                            src={article.imageLink}
                            alt={`Article ${index + 1}`}
                            className="article-image"
                        />
                        <a href="#" onClick={() => navigateToArticle(article)}>
                            <h2 className="article-headline">{article.headline}</h2>
                        </a>                
                    </div>
                ))}
        </div>
    </div>
    );
}

export default FeedScreen;
