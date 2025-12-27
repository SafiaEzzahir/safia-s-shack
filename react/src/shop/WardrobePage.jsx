import { useState } from 'react';

import './ShopPage.css'
import AthenaHoodieHanger from '../assets/clothes/athenajumperonhanger.png'
import RailImage from '../assets/rail.png'
import AthenaHoodie from '../assets/clothes/athenajumper.png'

const ClothesList = [
    {image: AthenaHoodieHanger, title: 'athena award hoodie 1', openimage: AthenaHoodie},
    {image: AthenaHoodieHanger, title: "npc safia's dress", openimage: AthenaHoodie},
    {image: AthenaHoodieHanger, title: 'athena award hoodie 2', openimage: AthenaHoodie}
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
            <p id='WardrobePageText'>try some of my projects!</p>
            <Rail />
            <Clothes />
        </div>
    )
}

export default WardrobePage;