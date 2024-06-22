import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
    const runPythonScript = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/run-script');
            console.log(response.data.message); // Log the success message from the backend
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={runPythonScript}>Run Python Script</button>
      </header>
    </div>
  );
}

export default App;