import { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css';

import StickersPage from './StickersPage';
import HomePage from './Home'

// if clicked on shop button - open right section
// else - hide right section

// Page determines what goes next to right section depending on what li has been clicked
function Page({ pagetype }){
    console.log(pagetype)
    if (pagetype == 'awards') {
        return (
            <div>awards</div>
        )
    } else if (pagetype == 'wardrobe') {
        return (
            <div>wardrobe</div>
        )
    } else if (pagetype == 'stickers') {
        return (
            <StickersPage />
        )
    } else {
        return (
            <HomePage />
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

                <button onClick={() => changePageType('awards')}>
                    <img src="src/assets/medalicon.png" alt="medal icon" className='ic' />
                    <p>*certs and awards*</p>
                </button>

                <button onClick={() => changePageType('wardrobe')}>
                    <img src="src/assets/wardrobeicon.png" alt="dress hanging on a hanger icon" className='ic' />
                    <p>wardrobe</p>
                </button>
                
                <button onClick={() => changePageType('stickers')}>
                    <img src="src/assets/stickericon.png" alt="sticker icon" className='ic' />
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
                
                <button onClick={() => changePageType('pigeonhole')}>
                    <img src="src/assets/medalicon.png" alt="medal icon" className='ic' />
                    <p>pigeonhole</p>
                </button>
            </ul>

            <div id='RightSectionPage'>
                <Page pagetype={PageType} />
            </div>
        </div>
    )
}

function Shop(){
    return(
        <div id="shop">
            <p>hello this is the shop</p>
            <RightSection />
        </div>
    )
}

export default Shop