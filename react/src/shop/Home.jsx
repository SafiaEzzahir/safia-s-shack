import './ShopPage.css'

function HomePage({ opened }) {
    return (
        <div id="HomePage">
            <p  className={opened ? "" : "HomePageAnimation"}>
                so this is my shack! here, you can view my collections of trinkets and current projects. <br></br><br></br>
                head to the "fast travel" section to see where you can go, or drop a message in the post box if you have any questions!
            </p>
            <img src="/assets/safia+shack/smilingsafia.png" alt="safia" />
        </div>
    )
}

export default HomePage;