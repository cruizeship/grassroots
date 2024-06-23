// screens/LoadingScreen.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactLoading from 'react-loading';
import axios from 'axios';

function LoadingScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedTopics } = location.state;

    const runPythonLoadArticles = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/run-script', { selectedTopics });
            const articles = response.data.headlines.map(([headline, links, imageLink]) => ({ headline, links, imageLink}));

            console.log(articles); // Log the articles array
            navigate('/feed', { state: { articles } });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        runPythonLoadArticles();
    }, []); // Run once on component mount

    return (
        <div className="loading-container">
        <ReactLoading className="loading-icon" type="bars" />
        <h2 style={{textColor:"white"}}>Loading sprouts...</h2>  
        </div>
    );
}

export default LoadingScreen;
