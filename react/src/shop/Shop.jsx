import './Shop.css'

// if clicked on shop button - open right section
// else - hide right section

function RightSection(){
    // side navbar with icons that expand into names on hover? idk yet
    return(
        <div id="RightSection">
            <ul>
                <li>this</li>
                <li>is</li>
                <li>the</li>
                <li>right</li>
                <li>section</li>
            </ul>
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