// screens/LoadingScreen.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/feed');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default LoadingScreen;
