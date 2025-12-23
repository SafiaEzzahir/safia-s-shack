import './StartPage.css'

function StartPage({ onStartClick, onSkipClick }) {
    return (
        <div id='StartPage'>
            <p>safia ezzahir</p>
            <p>a personal website inspired by text-adventure video games</p>
            <button onClick={onStartClick}>start</button>
            <button onClick={onSkipClick}>click here to skip to my portfolio</button>
        </div>
    )
}

export default StartPage;