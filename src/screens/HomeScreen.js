import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import LocationSearch from '../LocationSearch.js';
import treeImage from '../tree1.png'; // Import the tree image
import monkeyImage from '../monkey.png'; // Corrected import
import '../variables.css';
import './HomeScreen.css';

const topics = [
    'Local Government',
    'Crime and Public Safety',
    'Readathon',
    'Transportation',
    'Healthcare',
    'Business and Economy',
    'Environment',
    'Community Events',
    'Housing',
    'Weather',
    'Sports',
    'Arts and Culture',
    'Social Issues',
    'Local Infrastructure',
    'Local History',
    'Food and Dining',
    'Technology',
    'Volunteerism and Charity',
    'Local Businesses',
];

function HomeScreen() {
    const navigate = useNavigate();
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [isMonkeySliding, setIsMonkeySliding] = useState(false);

    const handleTopicClick = (topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((item) => item !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const handleSubmit = () => {
        if (selectedTopics.length >= 3) {
            navigate('/loading', { state: { selectedTopics } });
        } else {
            alert('Please select ' + (3 - selectedTopics.length) + ' more topics!');
        }
    };

    const nextPageRef = useRef(null);

    const scrollToNextPage = () => {
        window.scrollTo({
            top: 750,
            behavior: 'smooth'
        });
    };

    const scrollToNextPage2 = () => {
        window.scrollTo({
            top: 5300,
            behavior: 'smooth'
        });
    };

    const handleLocationSelect = (location) => {
    };

    const handleMonkeyClick = () => {
        setIsMonkeySliding(true); // Start the sliding effect
        setTimeout(() => scrollToNextPage(), 500); // Scroll down after the sliding effect
    };

    return (
        <div className="home-page">
            <div className="tree-container">
                <img src={treeImage} alt="Tree" />
            </div>
            <div className="title-page">
                <h1 className="title-text">Grassroots</h1>
            </div>
            <div className={`monkey ${isMonkeySliding ? 'slide-down' : ''}`} onClick={handleMonkeyClick}>
                <img src={monkeyImage} alt="Monkey" />
            </div>
            <div class="header-container">
            <h1 className="header-text">First, lay your roots!</h1>
            </div>
            <div className="location-search-container">
                <LocationSearch onSelect={handleLocationSelect} />
            </div>
            <FontAwesomeIcon className="scroll-button2" onClick={scrollToNextPage2} icon={faChevronDown} />
            <p ref={nextPageRef}>Select a minimum of 3 preferred topics you'd like to see in your feed!</p>
            
            <div className="topic-buttons">
                {topics.map((topic, index) => (
                    <button
                        key={index}
                        className={selectedTopics.includes(topic) ? 'selected' : ''}
                        onClick={() => handleTopicClick(topic)}
                    >
                        {topic}
                    </button>
                ))}
            </div>
            <button className="submit-button" onClick={handleSubmit}>
                Continue
            </button>
        </div>
    );
}

export default HomeScreen;
