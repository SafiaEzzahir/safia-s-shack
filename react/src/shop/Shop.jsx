import { useState } from 'react';
import './Shop.css';

import ParticleCanvas from '../ParticleCanvas';

import StickersPage from './StickersPage';
import HomePage from './Home';
import TrophiesPage from './TrophiesPage';
import WardrobePage from './WardrobePage';
import PlantsPage from './PlantsPage';
import FasttravelPage from './FasttravelPage';
import medalicon from '../assets/icons/medalicon.png';
import wardrobeicon from '../assets/icons/wardrobeicon.png';
import stickericonv from '../assets/icons/stickericonv.png';
import planticon from '../assets/icons/planticon.png';
import fasttravelicon from '../assets/icons/fasttravelicon.png';
import shackImg from '../assets/safia+shack/shack.png';
import cvPdf from '../assets/cv.pdf';

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
    } else if (pagetype == 'home') {
        let HomeOpened = sessionStorage.getItem('homeopened')
        if (!HomeOpened) {
            HomeOpened = false
            sessionStorage.setItem('homeopened', true)
        };

        return (
            <HomePage opened={HomeOpened} />
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
                    <img src={medalicon} alt="medal icon" className='ic' />
                    <p>trophies</p>
                </button>

                <button onClick={() => changePageType('wardrobe')}>
                    <img src={wardrobeicon} alt="dress hanging on a hanger icon" className='ic' />
                    <p>wardrobe</p>
                </button>
                
                <button onClick={() => changePageType('stickers')}>
                    <img src={stickericonv} alt="sticker icon" className='ic' />
                    <p>stickers</p>
                </button>
                
                <button onClick={() => changePageType('plants')}>
                    <img src={planticon} alt="plant in a pot icon" className='ic' />
                    <p>plants</p>
                </button>
                
                <button onClick={() => changePageType('fast travel')}>
                    <img src={fasttravelicon} alt="medal icon" className='ic' />
                    <p>fast travel</p>
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
            <button id='ShackButton' onClick={ClickFunction}>
                <img id='Shack' src={shackImg} alt="safia's shack" />
            </button>
            <a href={cvPdf} download='safiaezzahir.pdf' id='DownloadCV'>download cv</a>
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