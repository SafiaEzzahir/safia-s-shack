import { useState } from 'react';

import './ShopPage.css'

const ClothesList = [
    {image: './src/assets/planticon.png', title: 'athena award hoodie 1'},
    {image: './src/assets/stickericon.png', title: "npc safia's dress"},
    {image: './src/assets/planticon.png', title: 'athena award hoodie 2'}
]

// rail
// clothes on hangers (e.g. athena hoodie x2, this site dress, roulette outfit, other projects..)
// ^^^ pixel art
// hover moves clothes
// button? click brings it forward and shows div of info + projects

function Rail() {
    return (
        <p>this is the rail - a long horizontal cylinder</p>
    )
}

function Clothes() {
    const [WhatClothesIsOpen, setWhatClothesIsOpen] = useState(null)

    function OpenClothes() {
        console.log('clothing rn')
    }

    // we love .map(), will probably use that function here too
    // how do we get the image to stay in the background? idk
    return (
        <div id='Clothes'>
            {ClothesList.map((clothe, i) => (
                <button className='Clothe'>
                    <img src={clothe.image} alt={clothe.title} />
                </button>
            ))}
        </div>
    )
}

function WardrobePage() {
    return (
        <div className='WardrobePage'>
            <Rail />
            <Clothes />
        </div>
    )
}

export default WardrobePage;