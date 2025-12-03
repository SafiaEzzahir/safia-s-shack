import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import SpeechWindow from './GameStuff.jsx'

function App() {

  return (
    <div className='container'>
      <img src="src/assets/safia3.png" alt="safia" />
      <SpeechWindow />
    </div>
  );
}

export default App
