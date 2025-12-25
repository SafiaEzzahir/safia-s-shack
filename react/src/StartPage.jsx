import './StartPage.css'
import ParticleCanvas from './ParticleCanvas.jsx'

function StartPage({ onStartClick, onSkipClick }) {
    return (
        <div>
            <ParticleCanvas cursorParticles={true} />
            <div id='StartPage'>
                <h1 id='Title'>safia ezzahir</h1>
                <p id="Desc">a personal website inspired by text-adventure video games</p>
                <button id='Start' onClick={onStartClick}>start</button>
                <button id='Skip' onClick={onSkipClick}>click here to skip to my portfolio</button>
            </div>
        </div>
    )
}

export default StartPage;