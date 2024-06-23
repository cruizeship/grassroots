// screens/LoadingScreen.js
import React, { useEffect } from 'react';
import ReactLoading from "react-loading";
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/feed');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
        <ReactLoading className="loading-icon" type="bars" />
        <h2 style={{textColor:"white"}}>Loading text here</h2>  
    </div>
  );
}

export default LoadingScreen;
