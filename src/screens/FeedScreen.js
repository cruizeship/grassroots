// screens/FeedScreen.js
import React from 'react';
import { Link } from 'react-router-dom';

const articles = [
  { id: '1', title: 'Article 1' },
  { id: '2', title: 'Article 2' },
  { id: '3', title: 'Article 3' },
];

function FeedScreen() {
  return (
    <div>
      <h1>Feed Screen</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedScreen;
