import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import './GameStuff.css'

const end = "end"

//                        |
// wtf is happening here \|/    ok girlie basically it's using fetch API <3 
// - use json file like an api, then i can store on server
// - don't get CORS error pls!!

function Level1(props) {
    return (
        <div className="speech-window LowerZIndex">
                <p className='speech-window-text'>{props.visited}</p>
            </div>
    )
}

// level template
function Level(props) {
    return (
        <div className='speech-window LowerZIndex'>
            <p key={props.text} className='speech-window-text'>{props.text}</p>
        </div>
    )
}

// end level template
//how do i get the stage to change on the other one
// detect what the element is?
// check a variable every time?
// send message in speechwindow?
// have an attribute of speechwindow which determines the stage?

function SpeechWindow({ onFinishLevels }) {
    const [level, setLevel] = useState(1);
    const [levels, setLevels] = useState({});
    const [visited, setVisited] = useState(false);
    const skipFirstClickRef = useRef(true);

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

                localStorage.removeItem('visited');

                // detect if site has been visited before and persist flag
                const visitcheck = localStorage.getItem("visited");
                if (visitcheck) {
                    setVisited(true);
                } else {
                    localStorage.setItem("visited", "true");
                    setVisited(false);
                }
            } catch (error) {
                console.error('error number 2 - fetch failed', error);
            }
        }
        load();
    }, [])

    // clicks useEffect
    useEffect(() => {

        // check for and handle clicks
        const handleClick = (e) => {
            if (skipFirstClickRef.current) return;
            setLevel(prevLevel => {
                const last = levels && levels[end];
                // if we're at the last level, signal finish instead of advancing
                if (typeof last !== 'undefined' && String(prevLevel) === String(last)) {
                    if (typeof onFinishLevels === 'function') onFinishLevels();
                    return prevLevel;
                }

                // compute next level deterministically (no module-level state)
                if (prevLevel === 1) {
                    return visited ? 3 : 2;
                }
                return prevLevel + 1;
            });
        };

        // avoid handling the click that caused this component to mount
        const skipTimeout = setTimeout(() => { skipFirstClickRef.current = false; }, 0);
        document.body.addEventListener('click', handleClick);
        return () => { clearTimeout(skipTimeout); document.body.removeEventListener('click', handleClick); };
    }, [levels, visited, onFinishLevels]);

    // call onFinishLevels as a post-render side-effect when we reach the final level
    useEffect(() => {
        const last = levels && levels[end];
        if (typeof last !== 'undefined' && String(level) === String(last)) {
            if (typeof onFinishLevels === 'function') onFinishLevels();
        }
    }, [level, levels, onFinishLevels]);

    if (level == levels[end]) {
        console.log(level);
        return null;
    } else if (level === 1) {
        console.log(level);

        var visitedstr = 'error';
        // determine visited string from state set during load
        if (visited) {
            visitedstr = "Welcome back, adventurer. i presume you know what you're looking for?";
        } else {
            visitedstr = "welcome, adventurer. i'm sure you've heard a lot about me ;)";
        }

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