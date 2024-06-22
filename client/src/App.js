import React from 'react'
import {useEffect, useState} from "react";
import Landing from './Landing';
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

  const styles = { 

    backgroundColor: 'blue', 
   
    color: 'white', 
   
    fontSize: '16px', 
   
   }; 

  return (
    <>
        <Landing />
        <h1>MERN App!</h1>
        <p>Data from server: {data}</p>
    </>
  );
}

export default App;
