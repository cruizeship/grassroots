import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Article.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ArticleScreen() {

    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.state);

    const summaryData = location.state;
    const articles = summaryData.articles

    const handleSubmit = () => {
        navigate('/feed', { state: { articles } });
    };

    return (
        <div className="container">
            
        <header>
        <button className="back-button" onClick={handleSubmit}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
          <h1>{summaryData.headline}</h1>
        </header>
        <div className="content">
          <div className="article">
            {/*<div className="image-and-key-takeaways">
              <img src={summaryData.imageLink} alt="Image not Found" />
              {/*<section className="key-takeaways">

                <h2>{summaryData.articleText}</h2>


                <h2 className="key-takeaways-title">APEC Summit Details:</h2>
                <ul>
                  <li className="text">The United States hosts the annual APEC summit for the first time since 2011.</li>
                  <li className="text">Leaders from the 21-member Asia-Pacific Economic Cooperation group discuss trade and economic growth.</li>
                  <li className="text">The key event is the meeting between President Joe Biden and Chinese President Xi Jinping amidst strained U.S.-China relations.</li>
                </ul>
              </section>}
            </div>
            <section className="text-section">
              <p>{summaryData.articleText}</p>
            </section> */}
            <div className="image-and-text">
                <img src={summaryData.imageLink} alt="Image not Found" />
                <p>{summaryData.articleText}</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ArticleScreen;
