// screens/FeedScreen.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FeedScreen.css';
import '../variables.css'

function FeedScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const { articles } = location.state;

    const column1 = articles.slice(0, Math.ceil(articles.length / 2));
    var temp = column1.length;
    const column2 = articles.slice(Math.ceil(articles.length / 2));

    const navigateToArticle = (article) => {
        /*history.push('/generating', {
            headline: article.headline,
            links: article.links,
            imageLink: article.imageLink
        });*/
        navigate('/generating', { state: { headline: article.headline,
            links: article.links,
            imageLink: article.imageLink, articles: articles } });
    };

    return (
        <div className="feed-screen">
            <div className="article-grid">
                {/*articles.map((article, index) => (
                    <div key={index} className={`article-card`}>
                        <img
                            src={article.imageLink}
                            alt={`Article ${index + 1}`}
                            className="article-image"
                        />
                        <a href="#" onClick={() => navigateToArticle(article)}>
                            <h2 className="article-headline">{article.headline}</h2>
                        </a>                
                    </div>
                ))*/}
                <div className="grid-column">
                 {column1.map((article, index) => (
                    <div key={index} className="article-card" onClick={() => navigateToArticle(article)}>
                        <img
                            src={article.imageLink}
                            alt={`Article ${index + 1}`}
                            className="article-image"
                        />
                        <h2 className="article-headline">{article.headline}</h2>
                    </div>
                ))}
                </div>
                <div className="grid-column">
                 {column2.map((article, index) => (
                    <div key={index + temp} className="article-card" onClick={() => navigateToArticle(article)}>
                        <img
                            src={article.imageLink}
                            alt={`Article ${index + temp + 1}`}
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
