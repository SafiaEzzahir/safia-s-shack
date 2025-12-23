import './Shop.css'

// if clicked on shop button - open right section
// else - hide right section

// Page determines what goes next to right section depending on what li has been clicked
function Page(){
    // yo wassup needs to be to the right of li so use flex
    return(
        <p>Yo wassup</p>
    )
}

function RightSection(){
    // side navbar with icons that expand into names on hover? idk yet
    return(
        <div id="RightSection">
            <ul className='list'>

                <button onClick={() => console.log('Helo world!')}>
                    <img src="src/assets/medalicon.png" alt="medal icon" className='ic' />
                    <p>*certs and awards*</p>
                </button>

                <button onClick={() => console.log('Helo world!')}>
                    <img src="src/assets/medalicon.png" alt="medal icon" className='ic' />
                    <p>wardrobe</p>
                </button>
                
                <button>
                    <img src="src/assets/medalicon.png" alt="medal icon" className='ic' />
                    <p>stickers</p>
                </button>
                
                <button>
                    <img src="src/assets/medalicon.png" alt="medal icon" className='ic' />
                    <p>plants</p>
                </button>
                
                <button>
                    <img src="src/assets/medalicon.png" alt="medal icon" className='ic' />
                    <p>fast travel</p>
                </button>
                
                <button>
                    <img src="src/assets/medalicon.png" alt="medal icon" className='ic' />
                    <p>pigeonhole</p>
                </button>
            </ul>

            <div id='RightSectionPage'>
                <Page />
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