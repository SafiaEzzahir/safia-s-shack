import { useState } from 'react';

import './ShopPage.css'

const Trophies = [
    {image: './src/assets/medalicon.png', title: 'Hack Club Athena Award', skils: {'code': 5}},
    {image: './src/assets/medalicon.png', title: 'WJEC Level 1 Latin Certification(A*)', skills: {'languages': 4, 'revision': 1}},
    {image: './src/assets/medalicon.png', title: 'Hack Club Hackathon Organiser (Sep 2025)', skills: {'event management': 3, 'code': 1, 'debugging': 2}},
    {image: './src/assets/medalicon.png', title: 'WCSC Peer Mentor (2023-24)', skills: {'youth leadership': 4, 'advice': 2}},
    {image: './src/assets/medalicon.png', title: 'Computer Science Prefect (current)', skills: {'event management': 2, 'youth leadership': 2, 'code': 1}},
    {image: './src/assets/medalicon.png', title: 'Girls Into Coding Guest Speaker', skills: {'public speaking': 4, 'youth leadership': 2}},
    {image: './src/assets/medalicon.png', title: 'Girls Into Coding Assistant Mentor (2024-current)', skills: {'youth leadership': 5, 'code': 1, 'debugging': 3}},
    {image: './src/assets/medalicon.png', title: 'Coding Club Leader', skills: {'code': 2, 'debugging': 4, 'youth leadership': 4}}
]

// can't put an if in there
// if trophy has been clicked on:
//      if trophy.open:
//          trophy.open = false
//      else:
//          trophy.open = true
// return (below trophy button):
//      

function TrophiesPage() {
    const [WhichOneIsOpen, setWhichOneIsOpen] = useState(null)
    return (
        <div id='TrophiesPage'>
            <h1 className='ItemsText' id='TrophiesText'>TROPHIES</h1>
            <div id="TrophiesSection">
                {Trophies.map((trophy, i) => (
                    <div className='Trophy' key={i}>
                        <button onClick={() => setWhichOneIsOpen(WhichOneIsOpen === i ? null : i)}>
                            <img className='TrophyImage' src={trophy.image} alt={trophy.title} />
                            <p>{trophy.title}</p>
                        </button>
                        {WhichOneIsOpen === i && (
                            <div className='TrophySkills'>
                                (trophy.skills.map((skill, num) => {

                                }))
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrophiesPage;