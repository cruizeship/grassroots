import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Article.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ArticleScreen() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/feed');
    };

    return (
        <div className="container">
            
        <header>
        <button className="back-button" onClick={handleSubmit}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
          <h1>2023 APEC Summit in San Francisco</h1>
        </header>
        <div className="content">
          <div className="article">
            <div className="image-and-key-takeaways">
              <img src="path/to/your/image.png" alt="Image not Found" />
              <section className="key-takeaways">
                <h2 className="key-takeaways-title">APEC Summit Details:</h2>
                <ul>
                  <li className="text">The United States hosts the annual APEC summit for the first time since 2011.</li>
                  <li className="text">Leaders from the 21-member Asia-Pacific Economic Cooperation group discuss trade and economic growth.</li>
                  <li className="text">The key event is the meeting between President Joe Biden and Chinese President Xi Jinping amidst strained U.S.-China relations.</li>
                </ul>
              </section>
            </div>
            <section className="text-section">
              <h2>Backdrop and Key Issues:</h2>
              <ul>
                <li className="text">The United States hosts the annual APEC summit for the first time since 2011.</li>
              </ul>
            </section>
            <section className="text-section">
              <h2>APEC's Role and Recent Developments:</h2>
              <ul>
                <li className="text">The United States hosts the annual APEC summit for the first time since 2011.</li>
              </ul>
            </section>
            <section className="text-section">
              <h2>Local Impact and Community Response:</h2>
              <ul>
                <li className="text">The United States hosts the annual APEC summit for the first time since 2011.</li>
              </ul>
            </section>
            <section className="text-section">
              <h2>Security and Logistics:</h2>
              <ul>
                <li className="text">The United States hosts the annual APEC summit for the first time since 2011.</li>
              </ul>
            </section>
          </div>
          {/*<aside className="poll">
            <h2>Poll</h2>
          </aside>*/}
        </div>
        {/*<footer>
          <a href="#comments">Click to view comments</a>
        </footer>*/}
      </div>
    );
}

export default ArticleScreen;
