import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
    </div>
  );
}

export default App
