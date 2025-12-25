import './ShopPage.css'

const imagesModules = import.meta.glob('../assets/plants/*.{png,jpg,jpeg,gif}', { eager: true, as: 'url' });
const imagesList = Object.entries(imagesModules).map(([path, url]) => {
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    const name = filename.replace(/\.(png|jpg|jpeg|gif)$/i, '');
    return { name, url };
});

function PlantsPage() {
    return (
        <div className='ItemsPage'>
            <h1 className='ItemsText'>PLANTS</h1>
            <div className='ItemsSection'>
                {imagesList.map((image) => (
                    <div className='Item'>
                        <img className='ItemImage' src={image.url} alt={'a ' + image.name + ' sticker'} />
                        <p className='ItemText'>{image.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlantsPage;