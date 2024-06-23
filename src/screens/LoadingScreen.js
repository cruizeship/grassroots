// screens/LoadingScreen.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function LoadingScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedTopics } = location.state;

    const runPythonLoadArticles = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/run-script', { selectedTopics });
            console.log(response.data.articles); // Log the articles array
            navigate('/feed', { state: { articles: response.data.articles } });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        runPythonLoadArticles();
    }, []); // Run once on component mount

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
}

export default LoadingScreen;
