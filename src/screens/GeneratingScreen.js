// screens/LoadingScreen.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactLoading from 'react-loading';
import axios from 'axios';

function GeneratingScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const { headline, links, imageLink } = location.state;

    const generateArticles = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/generate-article', { headline, links, imageLink });
            const articles = response.data.map((headline, imageLink, body) => ({ headline, imageLink, body}));

            navigate('/article', { state: { articles } });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        generateArticles();
    }, []); // Run once on component mount

    return (
        <div className="loading-container">
        <ReactLoading className="loading-icon" type="bars" />
        <h2 style={{textColor:"white"}}>Loading sprout...</h2>  
        </div>
    );
}

export default GeneratingScreen;
