import styles from '../styles/BuildsSection.module.scss'
import { useEffect, useState } from 'react'
import BuildRow from './BuildRow'


export default function BuildsSection(props) {
    const [renderedMatches, setRenderedMatches] = useState([]);
    const [renderedMatchesFullArray, setRenderedMatchesFullArray] = useState([]);
    const [isPopoutMenuActive, setPopoutMenu] = useState(false);
    const [isGodMenuActive, setGodMenu] = useState(false);
    const [isPlayerMenuActive, setPlayerMenu] = useState(false);
    const [isAssassinMenuActive, setAssassinMenu] = useState(false);
    const [isHunterMenuActive, setHunterMenu] = useState(false);
    const [isMageMenuActive, setMageMenu] = useState(false);
    const [isWarriorMenuActive, setWarriorMenu] = useState(false);
    const [isGuardianMenuActive, setGuardianMenu] = useState(false);
    const [doMatchesExist, setMatchesExist] = useState(true);
    const [areAllMatchesDisplayed, setAreAllMatchesDisplayed] = useState(false);

    /////// START - FILTER AND ORDER MATCHES

    const matches = [];
    const matchValues = Object.values(props.matches);

    matchValues.forEach(el => {
        matches.push(...el);
    });
    
    const filteredMatches = matches.filter((match) => {
        if (match.Match_Queue_Id === 426 || match.Match_Queue_Id === 440 || match.Match_Queue_Id === 451 || match.Match_Queue_Id === 435) {
            return true;
        } else {
            return false;
        }
    });

    const orderedIds = filteredMatches.map((match) => {
        return match.Match;
    });

    orderedIds.sort(function (a, b) { return b - a });

    const orderedMatches = [];
    
    for (let i = 0; i < orderedIds.length; i++) {
        orderedMatches.push(...filteredMatches.filter((match) => {
            if (match.Match === orderedIds[i]) {
                return true;
            }
        }))
    } 
    
    ///// Somehow duplicate entries made their way into the match array. Here I remove any duplicates. 

    const removedDuplicates = [];
    
    orderedMatches.forEach((el) => {
        if (!removedDuplicates.includes(el)) {
            removedDuplicates.push(el);
        }
    });    
    
    ///// RENDER FIRST MATCHES SHOWN ON PAGE ARRIVAL

    const firstMatchGroup = removedDuplicates.slice(0, 5);    

    useEffect(() => {
        if (renderedMatches.length === 0) {             
            setRenderedMatches(firstMatchGroup);
            setRenderedMatchesFullArray(removedDuplicates);
        }
    }, []);  
     
    ////// END FILTER AND ORDER MATCHES

    const filterBuildsByName = (name) => {
        const filteredByName = removedDuplicates.filter((match) => match.playerName.toLowerCase() == name);
        setRenderedMatchesFullArray(filteredByName);
        setRenderedMatches(filteredByName.slice(0, 5));
        setPopoutMenu(false);
        setMatchesExist(true);
        setAreAllMatchesDisplayed(false);        
    }

    const filterBuildsByGod = (god) => {
        const filteredByGod = removedDuplicates.filter((match) => match.God == god);
        setRenderedMatchesFullArray(filteredByGod);
        setRenderedMatches(filteredByGod.slice(0, 5));        
        setPopoutMenu(false);
        setAreAllMatchesDisplayed(false);
        filteredByGod.length === 0 ?  setMatchesExist(false) : setMatchesExist(true);
    }
  
    const togglePopoutMenu = () => {
        if (isPopoutMenuActive === false) {            
            setPopoutMenu(true);            
        } else if (isPopoutMenuActive === true) {
            setPopoutMenu(false);            
        }
    }

    const toggleGodMenu = () => {
        if (isGodMenuActive === false) {            
            setGodMenu(true);
            setPlayerMenu(false);
        } else if (isGodMenuActive === true) {
            setGodMenu(false);
        }
    }

    const togglePlayerMenu = () => {
        if (isPlayerMenuActive === false) {            
            setPlayerMenu(true);
            setGodMenu(false);
        } else if (isPlayerMenuActive === true) {
            setPlayerMenu(false);
        }
    }

    const toggleAssassinMenu = () => {
        if (isAssassinMenuActive === false) {            
            setAssassinMenu(true);             
            setHunterMenu(false);             
            setWarriorMenu(false);             
            setMageMenu(false);             
            setGuardianMenu(false);             
        } else if (isAssassinMenuActive === true) {
            setAssassinMenu(false);
        }
    }

    const toggleHunterMenu = () => {
        if (isHunterMenuActive === false) {            
            setHunterMenu(true);             
            setAssassinMenu(false);             
            setWarriorMenu(false);             
            setMageMenu(false);             
            setGuardianMenu(false);             
        } else if (isHunterMenuActive === true) {
            setHunterMenu(false);
        }
    }

    const toggleMageMenu = () => {
        if (isMageMenuActive === false) {            
            setMageMenu(true);             
            setHunterMenu(false);             
            setWarriorMenu(false);             
            setAssassinMenu(false);             
            setGuardianMenu(false);             
        } else if (isMageMenuActive === true) {
            setMageMenu(false);
        }
    }

    const toggleWarriorMenu = () => {
        if (isWarriorMenuActive === false) {            
            setWarriorMenu(true);             
            setHunterMenu(false);             
            setAssassinMenu(false);             
            setMageMenu(false);             
            setGuardianMenu(false);             
        } else if (isWarriorMenuActive === true) {
            setWarriorMenu(false);
        }
    }

    const toggleGuardianMenu = () => {
        if (isGuardianMenuActive === false) {            
            setGuardianMenu(true);             
            setHunterMenu(false);             
            setWarriorMenu(false);             
            setMageMenu(false);             
            setAssassinMenu(false);             
        } else if (isGuardianMenuActive === true) {
            setGuardianMenu(false);
        }
    }

    const renderNoMatchesMessage = () => {
        if (doMatchesExist === false) {
            return (
                <div className="nomatch-message">
                    <p>There are no recent games with that god.</p>
                </div>
            )
        } else {
            return null;
        }
    }

    const loadNextMatches = () => {
        const currentLength = renderedMatches.length;
        const nextMatches = renderedMatchesFullArray.slice(0, currentLength + 5);
        if (currentLength === 0) {
            return;
        } else {
            currentLength === nextMatches.length ? setAreAllMatchesDisplayed(true) : setAreAllMatchesDisplayed(false);
            setRenderedMatches(nextMatches);
        }
    };
      
    return (        
        <div className={styles.buildsSection}>
            <div className={`popout-menu ${isPopoutMenuActive ? "active" : null}`}>
                <div onClick={() => togglePlayerMenu()} className="playermenu-control">
                    <div className="wrapper">
                        <div>
                            <span>Players</span>
                        </div>
                        <div>
                            <img alt="Arrow image denoting clicking will open a submenu" className={`${isPlayerMenuActive ? "active" : null}`} src="/images/icons/downarrow.png"></img>
                        </div>
                    </div>
                </div>
                <div className={`playermenu ${isPlayerMenuActive ? "active" : null}`}>
                    <ul>
                        <li onClick={() => filterBuildsByName("cyclonespin") }>CycloneSpin</li>                                            
                        <li onClick={() => filterBuildsByName("fineokay") }>FineOkay</li>                                            
                        <li onClick={() => filterBuildsByName("inbowned") }>Inbowned</li>                                            
                        <li onClick={() => filterBuildsByName("lasbra") }>Lasbra</li>
                        <li onClick={() => filterBuildsByName("layers") }>Layers</li>
                        <li onClick={() => filterBuildsByName("nika") }>Nika</li>
                        <li onClick={() => filterBuildsByName("polarbearmike") }>PolarBearMike</li>                        
                        <li onClick={() => filterBuildsByName("vote") }>Vote</li>
                        <li onClick={() => filterBuildsByName("zapman") }>Zapman</li>
                    </ul>
                </div>
                <div onClick={() => toggleGodMenu()} className="godmenu-control">
                    <div className="wrapper">
                        <div>
                            <span>Gods</span>
                        </div>
                        <div>
                            <img alt="Arrow image denoting clicking will open a submenu" className={`${isGodMenuActive ? "active" : null}`} src="/images/icons/downarrow.png"></img>
                        </div>
                    </div>
                </div>
                <div className={`godmenu ${isGodMenuActive ? "active" : null}`}>
                    <div onClick={() => toggleAssassinMenu()}>
                        <div className="wrapper">
                            <div>
                                <span>Assassins</span>
                            </div>
                            <div>
                                <img alt="Arrow image denoting clicking will open a submenu" className={`${isAssassinMenuActive ? "active" : null}`} src="/images/icons/downarrow.png"></img>
                            </div>
                        </div>
                    </div>
                    <ul className={`assassins-menu sub-menu ${isAssassinMenuActive ? "active" : null}`}>
                        <li onClick={() => filterBuildsByGod("Arachne") }>Arachne</li>
                        <li onClick={() => filterBuildsByGod("Awilix") }>Awilix</li>
                        <li onClick={() => filterBuildsByGod("Bakasura") }>Bakasura</li>
                        <li onClick={() => filterBuildsByGod("Bastet") }>Bastet</li>
                        <li onClick={() => filterBuildsByGod("Camazotz") }>Camazotz</li>
                        <li onClick={() => filterBuildsByGod("Da_Ji") }>Da Ji</li>
                        <li onClick={() => filterBuildsByGod("Fenrir") }>Fenrir</li>
                        <li onClick={() => filterBuildsByGod("Hun_Batz") }>Hun Batz</li>
                        <li onClick={() => filterBuildsByGod("Kali") }>Kali</li>
                        <li onClick={() => filterBuildsByGod("Loki") }>Loki</li>
                        <li onClick={() => filterBuildsByGod("Mercury") }>Mercury</li>
                        <li onClick={() => filterBuildsByGod("Ne_Zha") }>Ne Zha</li>
                        <li onClick={() => filterBuildsByGod("Nemesis") }>Nemesis</li>
                        <li onClick={() => filterBuildsByGod("Pele") }>Pele</li>
                        <li onClick={() => filterBuildsByGod("Ratatoskr") }>Ratatoskr</li>
                        <li onClick={() => filterBuildsByGod("Ravana") }>Ravana</li>
                        <li onClick={() => filterBuildsByGod("Serqet") }>Serqet</li>
                        <li onClick={() => filterBuildsByGod("Set") }>Set</li>
                        <li onClick={() => filterBuildsByGod("Susano") }>Susano</li>
                        <li onClick={() => filterBuildsByGod("Thanatos") }>Thanatos</li>
                        <li onClick={() => filterBuildsByGod("Thor") }>Thor</li>
                        <li onClick={() => filterBuildsByGod("Tsukuyomi") }>Tsukuyomi</li>
                    </ul>
                    <div onClick={() => toggleHunterMenu()}>
                          <div className="wrapper">
                            <div>
                                <span>Hunters</span>
                            </div>
                            <div>
                                <img alt="Arrow image denoting clicking will open a submenu" className={`${isHunterMenuActive ? "active" : null}`} src="/images/icons/downarrow.png"></img>
                            </div>
                        </div>
                    </div>
                    <ul className={`hunter-menu sub-menu ${isHunterMenuActive ? "active" : null}`}>
                        <li onClick={() => filterBuildsByGod("Ah_Muzen_Cab") }>Ah Muzen Cab</li>                    
                        <li onClick={() => filterBuildsByGod("Anhur") }>Anhur</li>                    
                        <li onClick={() => filterBuildsByGod("Apollo") }>Apollo</li>                    
                        <li onClick={() => filterBuildsByGod("Artemis") }>Artemis</li>                    
                        <li onClick={() => filterBuildsByGod("Cernunnos") }>Cernunnos</li>                    
                        <li onClick={() => filterBuildsByGod("Chernobog") }>Chernobog</li>                    
                        <li onClick={() => filterBuildsByGod("Chiron") }>Chiron</li>                    
                        <li onClick={() => filterBuildsByGod("Cupid") }>Cupid</li>                    
                        <li onClick={() => filterBuildsByGod("Danzaburou") }>Danzaburou</li>                    
                        <li onClick={() => filterBuildsByGod("Hachiman") }>Hachiman</li>                    
                        <li onClick={() => filterBuildsByGod("Heimdallr") }>Heimdallr</li>                    
                        <li onClick={() => filterBuildsByGod("Hou_Yi") }>Hou Yi</li>                    
                        <li onClick={() => filterBuildsByGod("Izanami") }>Izanami</li>                    
                        <li onClick={() => filterBuildsByGod("Jing_Wei") }>Jing Wei</li>                    
                        <li onClick={() => filterBuildsByGod("Medusa") }>Medusa</li>                    
                        <li onClick={() => filterBuildsByGod("Neith") }>Neith</li>                    
                        <li onClick={() => filterBuildsByGod("Rama") }>Rama</li>                    
                        <li onClick={() => filterBuildsByGod("Skadi") }>Skadi</li>                    
                        <li onClick={() => filterBuildsByGod("Ullr") }>Ullr</li>                    
                        <li onClick={() => filterBuildsByGod("Xbalanque") }>Xbalanque</li>                    
                    </ul>
                    <div onClick={() => toggleMageMenu()}>
                          <div className="wrapper">
                            <div>
                                <span>Mages</span>
                            </div>
                            <div>
                                <img alt="Arrow image denoting clicking will open a submenu" className={`${isMageMenuActive ? "active" : null}`} src="/images/icons/downarrow.png"></img>
                            </div>
                        </div>
                    </div>
                    <ul className={`mage-menu sub-menu ${isMageMenuActive ? "active" : null}`}>
                        <li onClick={() => filterBuildsByGod("Agni") }>Agni</li>                    
                        <li onClick={() => filterBuildsByGod("Ah_Puch") }>Ah Puch</li>                    
                        <li onClick={() => filterBuildsByGod("Anubis") }>Anubis</li>                    
                        <li onClick={() => filterBuildsByGod("Ao_Kuang") }>Ao Kuang</li>                    
                        <li onClick={() => filterBuildsByGod("Aphrodite") }>Aphrodite</li>                    
                        <li onClick={() => filterBuildsByGod("Baba_Yaga") }>Baba Yaga</li>                    
                        <li onClick={() => filterBuildsByGod("Baron_Samedi") }>Baron Samedi</li>                    
                        <li onClick={() => filterBuildsByGod("ChangE") }>Chang&#39;E</li>                    
                        <li onClick={() => filterBuildsByGod("Chronos") }>Chronos</li>                    
                        <li onClick={() => filterBuildsByGod("Discordia") }>Discordia</li>                    
                        <li onClick={() => filterBuildsByGod("Eset") }>Eset</li>                    
                        <li onClick={() => filterBuildsByGod("Freya") }>Freya</li>                    
                        <li onClick={() => filterBuildsByGod("Hades") }>Hades</li>                    
                        <li onClick={() => filterBuildsByGod("He_Bo") }>He Bo</li>                    
                        <li onClick={() => filterBuildsByGod("Hel") }>Hel</li>                    
                        <li onClick={() => filterBuildsByGod("Hera") }>Hera</li>                    
                        <li onClick={() => filterBuildsByGod("Janus") }>Janus</li>                    
                        <li onClick={() => filterBuildsByGod("Kukulkan") }>Kukulkan</li>                    
                        <li onClick={() => filterBuildsByGod("Merlin") }>Merlin</li>                    
                        <li onClick={() => filterBuildsByGod("Morgan_Le_Fay") }>Morgan Le Fay</li>                    
                        <li onClick={() => filterBuildsByGod("Nox") }>Nox</li>                    
                        <li onClick={() => filterBuildsByGod("Nu_Wa") }>Nu Wa</li>                    
                        <li onClick={() => filterBuildsByGod("Olorun") }>Olorun</li>                    
                        <li onClick={() => filterBuildsByGod("Persephone") }>Persephone</li>                    
                        <li onClick={() => filterBuildsByGod("Poseidon") }>Poseidon</li>                    
                        <li onClick={() => filterBuildsByGod("Ra") }>Ra</li>                    
                        <li onClick={() => filterBuildsByGod("Raijin") }>Raijin</li>                    
                        <li onClick={() => filterBuildsByGod("Scylla") }>Scylla</li>                    
                        <li onClick={() => filterBuildsByGod("Sol") }>Sol</li>                    
                        <li onClick={() => filterBuildsByGod("The_Morrigan") }>The Morrigan</li>                    
                        <li onClick={() => filterBuildsByGod("Thoth") }>Thoth</li>                    
                        <li onClick={() => filterBuildsByGod("Tiamat") }>Tiamat</li>                    
                        <li onClick={() => filterBuildsByGod("Vulcan") }>Vulcan</li>                    
                        <li onClick={() => filterBuildsByGod("Zeus") }>Zeus</li>                    
                        <li onClick={() => filterBuildsByGod("Zhong_Kui") }>Zhong Kui</li>                    
                    </ul>
                    <div onClick={() => toggleWarriorMenu()}>
                          <div className="wrapper">
                            <div>
                                <span>Warriors</span>
                            </div>
                            <div>
                                <img alt="Arrow image denoting clicking will open a submenu" className={`${isWarriorMenuActive ? "active" : null}`} src="/images/icons/downarrow.png"></img>
                            </div>
                        </div>
                    </div>
                    <ul className={`warrior-menu sub-menu ${isWarriorMenuActive ? "active" : null}`}>
                        <li onClick={() => filterBuildsByGod("Achilles") }>Achilles</li>                    
                        <li onClick={() => filterBuildsByGod("Amaterasu") }>Amaterasu</li>                    
                        <li onClick={() => filterBuildsByGod("Bellona") }>Bellona</li>                    
                        <li onClick={() => filterBuildsByGod("Chaac") }>Chaac</li>                    
                        <li onClick={() => filterBuildsByGod("Cu_Chulainn") }>Cu Chulainn</li>                    
                        <li onClick={() => filterBuildsByGod("Erlang_Shen") }>Erlang Shen</li>                    
                        <li onClick={() => filterBuildsByGod("Gilgamesh") }>Gilgamesh</li>                    
                        <li onClick={() => filterBuildsByGod("Guan_Yu") }>Guan Yu</li>                    
                        <li onClick={() => filterBuildsByGod("Hercules") }>Hercules</li>                    
                        <li onClick={() => filterBuildsByGod("Horus") }>Horus</li>                    
                        <li onClick={() => filterBuildsByGod("King_Arthur") }>King Arthur</li>                    
                        <li onClick={() => filterBuildsByGod("Mulan") }>Mulan</li>                    
                        <li onClick={() => filterBuildsByGod("Nike") }>Nike</li>                    
                        <li onClick={() => filterBuildsByGod("Odin") }>Odin</li>                    
                        <li onClick={() => filterBuildsByGod("Osiris") }>Osiris</li>                    
                        <li onClick={() => filterBuildsByGod("Sun_Wukong") }>Sun Wukong</li>                    
                        <li onClick={() => filterBuildsByGod("Tyr") }>Tyr</li>                    
                        <li onClick={() => filterBuildsByGod("Vamana") }>Vamana</li>                    
                    </ul>
                    <div onClick={() => toggleGuardianMenu()}>
                          <div className="wrapper">
                            <div>
                                <span>Guardians</span>
                            </div>
                            <div>
                                <img alt="Arrow image denoting clicking will open a submenu" className={`${isGuardianMenuActive ? "active" : null}`} src="/images/icons/downarrow.png"></img>
                            </div>
                        </div>
                    </div>
                    <ul className={`guardian-menu sub-menu ${isGuardianMenuActive ? "active" : null}`}>
                        <li onClick={() => filterBuildsByGod("Ares") }>Ares</li>                    
                        <li onClick={() => filterBuildsByGod("Artio") }>Artio</li>                    
                        <li onClick={() => filterBuildsByGod("Athena") }>Athena</li>                    
                        <li onClick={() => filterBuildsByGod("Bacchus") }>Bacchus</li>                    
                        <li onClick={() => filterBuildsByGod("Cabrakan") }>Cabrakan</li>                    
                        <li onClick={() => filterBuildsByGod("Cerberus") }>Cerberus</li>                    
                        <li onClick={() => filterBuildsByGod("Cthulu") }>Cthulu</li>                    
                        <li onClick={() => filterBuildsByGod("Fafnir") }>Fafnir</li>                    
                        <li onClick={() => filterBuildsByGod("Ganesha") }>Ganesha</li>                    
                        <li onClick={() => filterBuildsByGod("Geb") }>Geb</li>                    
                        <li onClick={() => filterBuildsByGod("Jormungandr") }>Jormungandr</li>                    
                        <li onClick={() => filterBuildsByGod("Khepri") }>Khepri</li>                    
                        <li onClick={() => filterBuildsByGod("Kumbhakarna") }>Kumbhakarna</li>                    
                        <li onClick={() => filterBuildsByGod("Kuzenbo") }>Kuzenbo</li>                    
                        <li onClick={() => filterBuildsByGod("Sobek") }>Sobek</li>                    
                        <li onClick={() => filterBuildsByGod("Sylvanus") }>Sylvanus</li>                    
                        <li onClick={() => filterBuildsByGod("Terra") }>Terra</li>                    
                        <li onClick={() => filterBuildsByGod("Xing_Tian") }>Xing Tian</li>                    
                        <li onClick={() => filterBuildsByGod("Yemoja") }>Yemoja</li>                    
                        <li onClick={() => filterBuildsByGod("Ymir") }>Ymir</li>                    
                    </ul>
                </div>
            </div>
            <div onClick={() => togglePopoutMenu()} className={`popout-backdrop ${isPopoutMenuActive ? "active" : null}`}>
            </div>
            <div className={styles.buildsFilter}>                            
                <div className={styles.buildsFilter__button_div}>
                    <button className="button buildsrow-button filter-button" onClick={() => togglePopoutMenu()}>
                        Filter 
                    </button>
                </div>
                {renderedMatches.length == 0 ? <h2>The Smite API is currently down. Check back later for updated builds!</h2> : null} 
            </div>          
            {renderNoMatchesMessage()}
            <div className={`${styles.container} buildspage-builds-container`}>
                {renderedMatches.map((match) => {
                    return <BuildRow
                        key={match.Match + match.playerName}
                        player={match.playerName}
                        god={match.God}
                        active1={match.Active_1}
                        active2={match.Active_2}
                        kills={match.Kills}
                        deaths={match.Deaths}
                        assists={match.Assists}
                        damage={match.Damage}
                        winStatus={match.Win_Status}
                        item1={match.Item_1}
                        item2={match.Item_2}
                        item3={match.Item_3}
                        item4={match.Item_4}
                        item5={match.Item_5}
                        item6={match.Item_6}                        
                        date={match.Match_Time}
                        qID={match.Match_Queue_Id}
                        gold={match.Gold}
                        items={props.items}
                    />
                })}
            </div>            
            <div className="loadmore-row">
                <p className={areAllMatchesDisplayed ? "active" : null}>{areAllMatchesDisplayed ? "There are no more matches." : null}</p>
                <button className="button buildsrow-button" onClick={() => loadNextMatches()}>Load more matches</button>
            </div>
        </div>
    )
}