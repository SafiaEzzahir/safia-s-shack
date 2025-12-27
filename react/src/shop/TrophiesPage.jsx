import { useState } from 'react';

import './ShopPage.css'
import MedalIcon from '../assets/icons/medalicon.png'
import CodeSkill from '../assets/icons/codeskill.png'
import LanguagesSkill from '../assets/icons/languagesskill.png'
import RevisionSkill from '../assets/icons/revisionskill.png'
import EventManagementSkill from '../assets/icons/eventmanagementskill.png'
import DebuggingSkill from '../assets/icons/debuggingskill.png'
import YouthLeadershipSkill from '../assets/icons/youthleadershipskill.png'
import PublicSpeakingSkill from '../assets/icons/publicspeakingskill.png'

const Trophies = [
    {image: MedalIcon, title: 'Hack Club Athena Award', skills: {'code': 5}},
    {image: MedalIcon, title: 'WJEC Level 1 Latin Certification (A*)', skills: {'languages': 4, 'revision': 1}},
    {image: MedalIcon, title: 'Hack Club Hackathon Organiser (Sep 2025)', skills: {'event management': 3, 'code': 1, 'debugging': 2}},
    {image: MedalIcon, title: 'WCSC Peer Mentor (2023-24)', skills: {'youth leadership': 4}},
    {image: MedalIcon, title: 'Computer Science Prefect (current)', skills: {'event management': 2, 'youth leadership': 2, 'code': 1}},
    {image: MedalIcon, title: 'Girls Into Coding Guest Speaker', skills: {'public speaking': 4, 'youth leadership': 2}},
    {image: MedalIcon, title: 'Girls Into Coding Assistant Mentor (2024-current)', skills: {'youth leadership': 5, 'code': 1, 'debugging': 3}},
    {image: MedalIcon, title: 'Coding Club Leader', skills: {'code': 2, 'debugging': 4, 'youth leadership': 4}}
]

const SkillIcons = {
    'code': CodeSkill,
    'languages': LanguagesSkill,
    'revision': RevisionSkill,
    'event management': EventManagementSkill,
    'debugging': DebuggingSkill,
    'youth leadership': YouthLeadershipSkill,
    'public speaking': PublicSpeakingSkill
}

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
            <div id="TrophiesSection" className='ScrollSection'>
                {Trophies.map((trophy, i) => (
                    <div className='Trophy' key={i}>
                        <button onClick={() => setWhichOneIsOpen(WhichOneIsOpen === i ? null : i)}>
                            <img className='TrophyImage' src={trophy.image} alt={trophy.title} />
                            <p className='TrophyTitle'>{trophy.title}</p>
                        </button>
                        {WhichOneIsOpen === i && (
                            <div className='TrophySkills'>
                                {Object.entries(trophy.skills).map(([skill, num]) => (
                                    <div className='TrophySkill' key={skill}>
                                        <img className='TrophySkillImage' src={SkillIcons[skill]} alt={skill} />
                                        <div className='TrophySkillTexts'>
                                            <p className='TrophySkillTitle'>{skill}</p>
                                            <p className='TrophySkillScore'>+ {num}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrophiesPage;