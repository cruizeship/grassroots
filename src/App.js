// App.js
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
                <Route path="/article" element={<ArticleScreen />} />
                <Route path = "/generating" element={<GeneratingScreen />} />
            </Routes>
        </Router>
    );
}

export default App;
