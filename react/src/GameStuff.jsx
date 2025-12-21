import { useState } from 'react'
import { useEffect } from 'react'
import './GameStuff.css'

//                        |
// wtf is happening here \|/    ok girlie basically it's using fetch API <3
// - use json file like an api, then i can store on server
// - don't get CORS error pls!!
fetch('/levels.json')
    .then((response) => response.json())
    //.then((json) => console.log(json))
    .catch(error => console.error('error number 0 - fetch error', error))

function Level1(props) {
    return (
        <div className="speech-window">
                <p className='speech-window-text'>{props.visited}</p>
            </div>
    )
}

// level template
function Level(props) {
    return (
        <div className='speech-window'>
            <p className='speech-window-text'>{props.text}</p>
        </div>
    )
}

function SpeechWindow() {
    const [level, setLevel] = useState(1);
    const [levels, setLevels] = useState({});

    // fetch level script useEffect
    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('/levels.json');
                if (!res.ok) {
                    console.error('error number 1 - bad response', res.status);
                    return;
                }
                const data = await res.json();
                setLevels(data);
            } catch (error) {
                console.error('error number 2 - fetch failed', error);
            }
        }
        load();
    })

    // clicks useEffect
    useEffect(() => {
        // check for and handle clicks
        const handleClick = () => {
            setLevel(prevLevel => {
                // condition ? true : false
                const newLevel = prevLevel ? prevLevel + 1 : 1;

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
            visitedstr = "Welcome back, adventurer. I presume you know what you're looking for?";

        // below is if u want to test and remove visited to see what happens if you haven't
        //localStorage.removeItem("visited");

        } else {
            // add visited to localStorage
            localStorage.setItem("visited", "true");
            visitedstr = "Welcome, adventurer. Let me give you a tour of my shop!";
        };

        return (
            // return level 1, plus string for corresponding "visited" status
            <Level1 visited={visitedstr} />
         );
    } else{
        var levelstring = String(level)
        return (
        <Level text={String(levels[levelstring])}/>
    )};
};

export default SpeechWindow