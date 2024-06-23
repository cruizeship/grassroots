import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import FeedScreen from './screens/FeedScreen';
import ArticleScreen from './screens/ArticleScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/feed" element={<FeedScreen />} />
        <Route path="/article/:articleId" element={<ArticleScreen />} />
      </Routes>
    </Router>
  );
}

export default App;