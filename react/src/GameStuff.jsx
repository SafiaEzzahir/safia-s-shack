import { useState } from 'react'
import { useEffect } from 'react'
import './GameStuff.css'

var level = null

function SpeechWindow() {
    if (level) {
        console.log("level exists");
    } else {
        //get level from sessionStorage
        //set var level to level
        console.log("level added");
    };

    return (
        <div className="speech-window">
            <p>This is the speech window.</p>
        </div>
    )
}

export default SpeechWindow