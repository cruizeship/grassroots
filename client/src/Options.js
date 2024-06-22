import React from 'react'
import './Options.css'
import {useEffect, useState} from "react";

export const title = 'Topics of Interest';
export const options = ['Crime and Public Safety', 'Local Government and Politics', 'Education', 'Community Events', 'Weather and Natural Disasters', 'Business and Economy', 'Health and Wellness', 'Transportation and Traffic', 'Sports', 'Human Interest Stories'];
  
  const Options = () => {
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [result, setResult] = useState({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    })

    const onClickNext = () => {
      // again reset the selectedAnwerIndex, so it won't effect next question
      
    }
  
    const onAnswerSelected = (answer, index) => {
        if (selectedAnswers.includes(answer)) {
            const tempArray = selectedAnswers.map(i => i);
            tempArray.splice(selectedAnswers.indexOf(answer), 1)
            setSelectedAnswers(tempArray)
        } else {
            setSelectedAnswers([...selectedAnswers, answer])
        }
        
      console.log(selectedAnswers);
      
    }
  
    return (
      <div className="quiz-container">
        <h2>{title}</h2>
        <div className="options-container">
          {options.map((answer, index) => (
            <div
              onClick={() => onAnswerSelected(answer, index)}
              key={index}
              className={selectedAnswers.includes(answer) ? 'selected-answer options' : 'options'}>
              {answer}
            </div>
          ))}
        </div>
        <div className="options-container"></div>
        <div className="options-container"></div>
      </div>
    )
  }
  
  export default Options