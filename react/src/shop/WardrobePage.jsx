import { useState } from 'react';

import './ShopPage.css'
import AthenaHoodieHanger from '../assets/clothes/athenajumperonhanger.png'
import PinkDressHanger from '../assets/clothes/pinkdressonhanger.png'
import RailImage from '../assets/rail.png'


const ClothesList = [
    {image: AthenaHoodieHanger, title: 'athena award hoodie 1', name: 'task-setter' , desc: 'full stack web app for the athena award, made my own api and react frontend', demo: 'https://safias-task-setter.onrender.com', code: 'https://github.com/SafiaEzzahir/task-setter/'},
    {image: PinkDressHanger, title: "npc safia's dress", name: 'safia-s-shack', desc: 'this website! went in-depth with react and started exploring creative coding', demo: 'https://safia-s-shack.vercel.app', code: 'https://github.com/SafiaEzzahir/safia-s-shack'},
    {image: AthenaHoodieHanger, title: 'athena award hoodie 2', name: 'parthenon', desc: 'vanilla js typing game made for parthenon (a hackathon!)', demo: 'https://yanellaft.github.io/Parthenon/', code: 'https://github.com/YanellaFT/Parthenon'}
]

// rail
// clothes on hangers (e.g. athena hoodie x2, this site dress, roulette outfit, other projects..)
// ^^^ pixel art
// hover moves clothes
// button? click brings it forward and shows div of info + projects

function Rail() {
    return (
        <img id='RailImage' src={RailImage} alt='wardrobe rail'/>
    )
}

function Clothes() {
    const [WhatClothesIsOpen, setWhatClothesIsOpen] = useState(null)

    // we love .map(), will probably use that function here too
    // how do we get the image to stay in the background? idk
    return (
        <div id='Clothes'>
            {ClothesList.map((clothe, i) => (
                <div className='ClotheWrapper' key={i}>
                    <button className='Clothe' key={i} onClick={() => setWhatClothesIsOpen(WhatClothesIsOpen === i ? null : i)}>
                        <img className='ClotheImage' src={clothe.image} alt={clothe.title} />
                    </button>
                    {WhatClothesIsOpen === i && (
                        <div className='OpenClothe' style={{backgroundImage: `url(${clothe.openimage})`}}>
                            <p className='OpenClotheTitle'>{clothe.title}</p>
                            <p className='OpenClotheName'>{clothe.name}</p>
                            <p className='OpenClotheDesc'>{clothe.desc}</p>
                            <a className='OpenClotheDemo' href={clothe.demo}>try it!</a>
                            <a className='OpenClotheCode' href={clothe.code}>see the code</a>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

function WardrobePage() {
    return (
        <div id='WardrobePage'>
            <h1 id='WardrobePageTitle'>WARDROBE</h1>
            <p id='WardrobePageText'>try some of my projects :)</p>
            <Rail />
            <Clothes />
        </div>
    )
}

export default WardrobePage;