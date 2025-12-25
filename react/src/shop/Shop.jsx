import { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css';

import ParticleCanvas from '../ParticleCanvas';

import StickersPage from './StickersPage';
import HomePage from './Home';
import TrophiesPage from './TrophiesPage';
import WardrobePage from './WardrobePage';
import PlantsPage from './PlantsPage';
import FasttravelPage from './FasttravelPage';
import PostboxPage from './PostboxPage';

// if clicked on shop button - open right section
// else - hide right section

// Page determines what goes next to right section depending on what li has been clicked
function Page({ pagetype }){
    console.log(pagetype)
    if (pagetype == 'trophies') {
        return (
            <TrophiesPage />
        )
    } else if (pagetype == 'wardrobe') {
        return (
            <WardrobePage />
        )
    } else if (pagetype == 'stickers') {
        return (
            <StickersPage />
        )
    } else if (pagetype == 'plants') {
        return (
            <PlantsPage />
        )
    } else if (pagetype == 'fast travel') {
        return (
            <FasttravelPage />
        )
    } else if (pagetype == 'postbox') {
        return (
            <PostboxPage />
        )
    } else if (pagetype == 'home') {
        return (
            <HomePage />
        )
    } else {
        return (
            <div>! - - - - ERROR - - - - !</div>
        )
    }
}

function RightSection(){
    const [PageType, setPageType] = useState('home')

    function changePageType(type) {
        console.log('changing')
        if (PageType == type) {
            setPageType('home')
        } else {
            setPageType(type)
        }
    }

    // side navbar with icons that expand into names on hover? idk yet
    return(
        <div id="RightSection">
            <ul className='list'>

                <button onClick={() => changePageType('trophies')}>
                    <img src="src/assets/medalicon.png" alt="medal icon" className='ic' />
                    <p>trophies</p>
                </button>

                <button onClick={() => changePageType('wardrobe')}>
                    <img src="src/assets/wardrobeicon.png" alt="dress hanging on a hanger icon" className='ic' />
                    <p>wardrobe</p>
                </button>
                
                <button onClick={() => changePageType('stickers')}>
                    <img src="./public/stickericon.png" alt="sticker icon" className='ic' />
                    <p>stickers</p>
                </button>
                
                <button onClick={() => changePageType('plants')}>
                    <img src="src/assets/planticon.png" alt="plant in a pot icon" className='ic' />
                    <p>plants</p>
                </button>
                
                <button onClick={() => changePageType('fast travel')}>
                    <img src="src/assets/medalicon.png" alt="medal icon" className='ic' />
                    <p>fast travel</p>
                </button>
                
                <button onClick={() => changePageType('postbox')}>
                    <img src="src/assets/medalicon.png" alt="medal icon" className='ic' />
                    <p>post box</p>
                </button>
            </ul>

            <div id='RightSectionPage'>
                <Page pagetype={PageType} />
            </div>
        </div>
    )
}

function LeftSection({ ClickFunction }){
    return (
        <div id='LeftSection'>
            <button onClick={ClickFunction}>
                <img id='Shack' src="./public/shack.png" alt="safia's shack" />
            </button>
            <a href='./public/cv.pdf' download='safiaezzahir.pdf' id='DownloadCV'>download cv</a>
        </div>
    )
}

function Shop(){
    const [ShopOpened, SetShopOpened] = useState(false)

    function OpenShop() {
        if (ShopOpened) {
            SetShopOpened(false)
        } else {
            SetShopOpened(true)
        }
    }
    
    if (ShopOpened) {
        return (
            <div id="shop">
                <ParticleCanvas cursorParticles={false}/>
                <LeftSection ClickFunction={OpenShop} />
                <RightSection />
            </div>
        )
    } else {
        return (
            <div>
                <ParticleCanvas cursorParticles={false} />
                <LeftSection ClickFunction={OpenShop} />
            </div>
        )
    }
}

export default Shop