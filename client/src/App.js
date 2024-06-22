import React from 'react'
import {useEffect, useState} from "react";
import Landing from './Landing';
import './App.css';
const API_URL = process.env.REACT_APP_API;

function App() {
  const [data, setData] = useState("No data :(");
  
  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/hello`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data.msg);
    }
    getData();
  }, []); 

  return (
    <div className={'landing'}>
        <Landing />
    </div>
  );
}

export default App;
