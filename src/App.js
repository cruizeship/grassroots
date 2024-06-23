import React, { useState } from 'react';
import logo from './logo.svg';
import HomePage from './components/HomePage.js';
import Article from './components/Article.js';
import './App.css';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const runPythonScript = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/run-script', { prompt });
      console.log(response.data.message); // Log the success message from the backend
      setResponse(response.data.message);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">  
        {/*<HomePage>/</HomePage>
        <input 
          type="text" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Enter your prompt"
        />
        <button onClick={runPythonScript}>Run Python Script</button>
        <p>Response: {response}</p>*/}
        <Article />
      </header>
    </div>

  );
}

export default App;
