import styles from '../styles/Home.module.scss'
import { useEffect, useState } from 'react'
import BuildRow from './BuildRow'
import Link from 'next/link'


export default function BuildsSection(props) {
    const [renderedMatches, setRenderedMatches] = useState([]);
    const [renderedMatchesFullArray, setRenderedMatchesFullArray] = useState([]);    
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

          
    return (        
        <div className={styles.buildsSection}>             
            <div className={styles.buildsFilter}>
                {renderedMatches.length == 0 ? <h2>The Smite API is currently down. Check back later for updated builds!</h2> : <h2>Latest Builds</h2>}                
            </div>    
            <div className={`${styles.container} homepage-builds-container`}>
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
            <div className={styles.buildpageLink}>                
                <Link href="/builds">
                    <a className="button buildsrow-button">Go to builds page</a>
                </Link>
            </div>
        </div>
                
    )
}