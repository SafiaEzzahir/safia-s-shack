import { useState } from 'react'
import { useEffect } from 'react'
import './GameStuff.css'

function Level1(props) {
    //console.log(props.visited);

    return (
        <div className="speech-window">
                <p className='speech-window-text'>{props.visited}</p>
            </div>
    )
}

function SpeechWindow() {
    const [level, setLevel] = useState(null);

    useEffect(() => {
        const handleClick = () => {
            setLevel(prevLevel => {
                const newLevel = prevLevel ? prevLevel + 1 : 1;
                console.log("clicky");
                console.log(newLevel);
                return newLevel;
            });
        };
        document.body.addEventListener('click', handleClick);
        return () => document.body.removeEventListener('click', handleClick);
    }, []);

    if (level === 1) {
        var visitedstr = 'error';
        // get if the site's been visited before from localStorage
        var visitcheck = localStorage.getItem("visited");

        // check if there is data - if yes, return hey again
        if (visitcheck) {

            console.log("been there done that");
            visitedstr = "Welcome back, adventurer. I presume you know what you're looking for?";

        // below is if u want to test and remove visited to see what happens if you haven't
        localStorage.removeItem("visited");

        } else {
            console.log("ya new here, ain't ya");
            // add visited to localStorage
            localStorage.setItem("visited", "true");
            visitedstr = "Welcome, adventurer. Let me give you a tour of my shop!";
        };

        return (
            // return level 1, plus string for corresponding "visited" status
            <Level1 visited={visitedstr} />
         );
    } else if (level === 2) {
        console.log("level 2");
        return (
            <div>hullo</div>
        );
    } else if (level === 3) {
        console.log("level 3");
        return (
            <div>heelol</div>
        );
    }
}

export default SpeechWindow