// screens/LoadingScreen.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactLoading from 'react-loading';
import axios from 'axios';

function GeneratingScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const { headline, links, imageLink, articles } = location.state;

    const generateArticles = async () => {
        try {
            console.log(headline)
            console.log(links)
            console.log(imageLink)
            /*
            const response = await axios.post('http://127.0.0.1:5000/generate-article', { headline, links, imageLink });
            const newHeadline = response.headline;
            const newImageLink = response.imageLink;
            const body = response.articleText;
            navigate('/article', { state: { headline : newHeadline, imageLink : newImageLink, body : body } }); */

            const response = await axios.post('http://127.0.0.1:5000/generate-article', { headline, links, imageLink });
            //const summaryData = response.data.txt.map(([item]) => ({item}));
            //console.log(summaryData)
            navigate('/article ', { state: {headline: response.data.txt[0], imageLink: response.data.txt[1], articleText: response.data.txt[2], articles: articles} });
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
