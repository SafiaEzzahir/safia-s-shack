import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import SpeechWindow from './GameStuff.jsx'

function App() {
  useEffect(() => {
    var visited = localStorage.getItem("visited");

    if (visited) {
      console.log("been there done that");
      visited = true
      //localStorage.removeItem("visited");
    } else {
      console.log("ya new here, ain't ya");
      localStorage.setItem("visited", "true")
    };
  }, []);

  return (
    <div className='container'>
      <img src="src/assets/safia3.png" alt="safia" />
      <SpeechWindow />
    </div>
  );
}

export default App
