import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Article.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ArticleScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const summaryData = location.state;
  const articles = summaryData.articles;
  const links = summaryData.links;

  const handleSubmit = () => {
    navigate('/feed', { state: { articles } });
  };

  // Function to add tabs and new lines to the article text
  const formatArticleText = (text) => {
    const sentences = text.match(/[^.!?]+[.!?]+["']?|[^.!?]+$/g);
    if (!sentences) return text;
    
    return sentences.map((sentence, index) => 
      (index % 2 === 1 ? `\t${sentence.trim()}\n` : `${sentence.trim()}\n`)
    ).join(' ');
  };

  return (
    <div className="container">
      <header>
        <button className="back-button" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <h1 className="headline">{summaryData.headline}</h1>
      </header>
      <div className="content">
        <div className="image-and-text">
          <img src={summaryData.imageLink} alt="Image not Found" />
          <div className="text-wrapper">
            {formatArticleText(summaryData.articleText).split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="further-reading">
          <h1>Further:</h1>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <a href={link}>{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ArticleScreen;