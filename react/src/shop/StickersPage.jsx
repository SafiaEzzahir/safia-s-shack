import './ShopPage.css'

// Load sticker images from src/assets/stickers (supports png/jpg/jpeg/gif)
const imagesModules = import.meta.glob('../assets/stickers/*.{png,jpg,jpeg,gif}', { eager: true, as: 'url' });
const imagesList = Object.entries(imagesModules).map(([path, url]) => {
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    const name = filename.replace(/\.(png|jpg|jpeg|gif)$/i, '');
    return { name, url };
});

if (imagesList.length === 0) console.warn('No stickers found in src/assets/stickers');

function StickersPage() {
    return (
        <div className='ItemsPage'>
            <h1 className='ItemsText'>STICKERS</h1>
            <div className='ItemsSection'>
                {imagesList.map((image) => (
                    <div className='Item' key={image.name}>
                        <img className='ItemImage' src={image.url} alt={'a ' + image.name + ' sticker'} />
                        <p className='ItemText'>{image.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StickersPage;