import { useEffect } from 'react';

import './ShopPage.css'

// iterate through json file/ !folder!
// add div with title:desc + img from stickers folder in public

// for now, add them manually

//

const images = ['crying orpheus', 'cute lightbulb', 'girls who code clicker']

//var ImagesToUse = {}

//for (var image in images) {
//    image = images[image]
//    image = './' + image;
//    image += '.jpg';
//    ImagesToUse.push(image);
//}

function StickersPage() {
    return (
        <div className='ItemsPage'>
            <h1>STICKERS</h1>
            <img src="./react/public/stickers/crying orpheus.jpg" alt="yhooohoo" />
            <div className='ItemsSection'>
                {images.map((image) => (
                    <div className='Item'>
                        <img className='ItemImage' src={'./' + image + '.jpg'} alt={'a ' + image + ' sticker'} />
                        <p className='ItemText'>{image}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StickersPage;