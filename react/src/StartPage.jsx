import './StartPage.css'
import ParticleCanvas from './ParticleCanvas.jsx'

function StartPage({ onStartClick, onSkipClick }) {
    return (
        <div>
            <ParticleCanvas />
            <div id='StartPage'>
                <p id='Title'>safia ezzahir</p>
                <p id="Desc">a personal website inspired by text-adventure video games</p>
                <button onClick={onStartClick}>start</button>
                <button onClick={onSkipClick}>click here to skip to my portfolio</button>
            </div>
        </div>
    )
}

export default StartPage;