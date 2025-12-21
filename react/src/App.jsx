import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Shop from './shop/Shop.jsx'
import SpeechWindow from './GameStuff.jsx'

function App() {
  const [currentStage, setCurrentStage] = useState('intro')

  // check what stage you're on - intro or shop
  if (currentStage === 'intro'){
    return (
      <div className='container'>
        <img src="src/assets/safia3.png" alt="safia" />
        <SpeechWindow current={currentStage} onFinishLevels={() => setCurrentStage('shop')} />
      </div>
    );
  } else if (currentStage === 'shop') {
    return(
      <Shop />
    );
  };
}

export default App
