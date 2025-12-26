import './ShopPage.css';

import PostBoxForm from './PostBoxForm.jsx'
import medalicon from '../assets/icons/medalicon.png'

function PostBox() {
    return (
        <div className="PostBox">
            <p>this is the post box</p>
            <PostBoxForm />
        </div>
    )
}

// style title like other Page titles
// add padding to links
// change link color and decoration

function FasttravelPage() {
    return (
        <div id="FasttravelPage">
            <h1 id='FasttravelText'>FAST TRAVEL</h1>
            <div id='FasttravelSection' className='ScrollSection'>
                <div id="FasttravelLinks">
                    <div className="FasttravelLink" id="Github">
                        <img className='FasttravelLinkIcon' src={medalicon} alt="github icon" />
                        <a className='FasttravelLinkLink' href="https://github.com/SafiaEzzahir">github.com/SafiaEzzahir</a>
                    </div>
                    <div className="FasttravelLink" id="SchoolEmail">
                        <img className='FasttravelLinkIcon' src={medalicon} alt="the winston churchill school icon" />
                        <a className='FasttravelLinkLink' href="mailto:ezzahirs22@student.wcsc.org.uk">ezzahirs22@student.wcsc.org.uk</a>
                    </div>
                    <div className="FasttravelLink" id="Email">
                        <img className='FasttravelLinkIcon' src={medalicon} alt="microsoft outlook icon" />
                        <a className='FasttravelLinkLink' href="mailto:safia.ezzahir@hotmail.com">safia.ezzahir@hotmail.com</a>
                    </div>
                </div>
                <PostBox />
            </div>
        </div>
    )
}

export default FasttravelPage;