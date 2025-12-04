import { useState } from 'react'
import { useEffect } from 'react'
import './GameStuff.css'

var level = null

function Level1(props) {
    console.log(props.visited);

    return (
        <div className="speech-window">
                <p className='speech-window-text'>LEVEL 1 {props.visited}</p>
            </div>
    )
}

function SpeechWindow() {
    if (level) {
        console.log("level exists");
    } else {
        //get level from sessionStorage
        //set var level to level
        console.log("level added");
    };

    level = 1;

    if (level === 1) {
        var visitedstr = 'error'; // why does it not go into the loop below?
        // get if the site's been visited before from localStorage
        var visitcheck = localStorage.getItem("visited");

        // check if there is data - if yes, return hey again
        if (visitcheck) {

            console.log("been there done that");
            visitedstr = "been there done that";

        // below is if u want to test and remove visited to see what happens if you haven't
        //localStorage.removeItem("visited");

        } else {
            console.log("ya new here, ain't ya");
            // add visited to localStorage
            localStorage.setItem("visited", "true");
            visitedstr = "ya new here, ain't ya";
        };

        return (
            // return level 1, plus string for corresponding "visited" status
            <Level1 visited={visitedstr} />
         );
    } else if (level === 2) {

    }
}

export default SpeechWindow