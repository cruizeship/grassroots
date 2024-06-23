// screens/HomeScreen.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
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
    'Education'
];

function HomeScreen() {
    const navigate = useNavigate();
    const [selectedTopics, setSelectedTopics] = useState([]);

    const handleTopicClick = (topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((item) => item !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const handleSubmit = () => {
        if (selectedTopics.length >= 5) {
            navigate('/loading', { state: { selectedTopics } });
        } else {
            alert('Please select ' + (5 - selectedTopics.length) + ' more topics!');
        }
    };

    const nextPageRef = useRef(null);

  const scrollToNextPage = () => {
    window.scrollTo({
      top: nextPageRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

    return (
        <div className="home-page">
            <div className="title-page">
                <h1 className="title-text">Grassroots</h1>
                <FontAwesomeIcon className="scroll-button" onClick={scrollToNextPage} icon={faChevronDown} />
            </div>
            <p ref={nextPageRef}>Select a minimum of 5 preferred topics you'd like to see in your feed!</p>
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
            <button onClick={handleSubmit}>
                Go to Loading Screen
            </button>
        </div>
    );
}

export default HomeScreen;
