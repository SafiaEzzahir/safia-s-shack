import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Shop from './shop/Shop.jsx'
import SpeechWindow from './GameStuff.jsx'
import StartPage from './StartPage.jsx'

import ParticleCanvas from './ParticleCanvas.jsx'

function App() {
  const [currentStage, setCurrentStage] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem("currentStage")) {
      console.log("currentstage exists in storage");
      setCurrentStage(sessionStorage.getItem("currentStage"));
    } else {
      console.log("it doesnt exist");
      setCurrentStage('start');
      sessionStorage.setItem("currentStage", "start")
  }}, []);

  // check what stage you're on - start, intro, or shop
  
  if (currentStage === 'start') {

    return (
      <StartPage 
        onStartClick={() => {setCurrentStage('intro'); sessionStorage.setItem("currentStage", 'intro')}}
        onSkipClick={() => {setCurrentStage('shop'); sessionStorage.setItem('currentStage', "shop")}} />
    );

  } else if (currentStage === 'intro'){

    return (
      <div>
        <ParticleCanvas />
        <div className='container'>
          <img className='LowerZIndex' src="/src/assets/safia+shack/safia3.png" alt="safia" />
          <SpeechWindow current={currentStage} onFinishLevels={() => {setCurrentStage('shop'); sessionStorage.setItem("currentStage", "shop")}} />
        </div>
      </div>

    );

  } else if (currentStage === 'shop') {
    
    return(
      <Shop />
    );

  };
}

export default App
