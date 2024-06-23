// screens/HomeScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';
const topics = [
    'Local Government',
    'Crime and Public Safety',
    'Education',
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

  const handleTopicClick = (index) => {
    if (selectedTopics.includes(index)) {
      setSelectedTopics(selectedTopics.filter((item) => item !== index));
    } else {
      setSelectedTopics([...selectedTopics, index]);
    }
  };

  const handleSubmit = () => {
    if (selectedTopics.length >= 5) {
        navigate('/loading');
    } else {
        alert('Please select ' + (5 - selectedTopics.length) + ' more topics!');
    }
  };
  return (
    <>
    <div className="home-page">
      <p>Select a minimum of 5 preferred topics you'd like to see in your feed!</p>
      <div className="topic-buttons">
        {topics.map((topic, index) => (
          <button
            key={index}
            className={selectedTopics.includes(index) ? 'selected' : ''}
            onClick={() => handleTopicClick(index)}
          >
            {topic}
          </button>
        ))}
        </div>
      <button onClick={(handleSubmit)}>
        Go to Loading Screen</button>
    </div>
    </>
  );
  
}

export default HomeScreen;
