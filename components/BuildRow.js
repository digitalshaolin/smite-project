import styles from '../styles/BuildRow.module.scss'
import Tooltip from './Tooltip';
import { useEffect } from 'react';

export default function BuildRow(props) {    

    const item1Details = props.items.find(item => item.DeviceName == props.item1);
    const item2Details = props.items.find(item => item.DeviceName == props.item2);
    const item3Details = props.items.find(item => item.DeviceName == props.item3);
    const item4Details = props.items.find(item => item.DeviceName == props.item4);
    const item5Details = props.items.find(item => item.DeviceName == props.item5);
    const item6Details = props.items.find(item => item.DeviceName == props.item6);   
    const active1Details = props.items.find(item => item.DeviceName == props.active1);   
    const active2Details = props.items.find(item => item.DeviceName == props.active2);   

    function convertMatchTime() {
        const splitDate = props.date.split(" ")[0];
        const newDate = new Date(splitDate).getTime();
        const currentDate = new Date().getTime();
        const timeDiff = currentDate - newDate;
        const elapsedDays = timeDiff / (1000 * 3600 * 24);        
        return Math.floor(elapsedDays);
    }

    const daysElapsed = convertMatchTime();

    function daysSinceMatch() {
        switch (daysElapsed) {
            case 0:
                return "Today";
                break;
            case -1:
                return "Today";
                break;
            case 1:
                return `1 Day Ago`;
                break;
            default:
                return `${daysElapsed} Days Ago`;                
        }
    }
    
    function matchQueue() {     
        switch (props.qID) {
            case 426:
                return "Normal: Conquest";
                break;
            case 451:
                return "Ranked: Conquest";
                break;
            case 440:
                return "Ranked: Duel";
                break;
            case 435:
                return "Normal: Arena";
                break;
            default:
                return props.q;
        }
    }
    const hideToolTip = e => {
        e.currentTarget.classList.remove('activeTooltip');
    }

    return (
        <div className={styles.buildRow}>
            <div className={styles.headerSection}>
                <div className={styles.player}>
                    <p>{props.player}</p>                    
                </div>
                <div className={styles.gameMode}>
                    <p>{matchQueue()}</p>                    
                </div>
                <div className={styles.daysElapsed}>
                    <p>{daysSinceMatch()}</p>                    
                </div>
            </div>
            <div className={styles.contentSection}>
                <div className={styles.godWrapper}>
                    <div className={styles.godImage}>                      
                        <img width="64" height="64" alt="" src={"/images/gods/" + props.god.replace(/\_/g, '-').replace(/'/g, "").toLowerCase() + ".jpg"} loading="lazy"></img>
                    </div>
                </div>
                <div className={styles.firstInfo}>
                    <h3>{props.god.replace(/\_/g, ' ')}</h3>
                    <p>Damage: {props.damage}</p>
                </div>
                <div className={styles.secondInfo}>
                    <h3>{props.kills} / <span>{props.deaths}</span> / {props.assists}</h3>
                    <p>Gold: {props.gold}</p>
                </div>
                <div className="buildrow-actives">
                    <div className="buildrow-active" onMouseLeave={hideToolTip}>
                        <img width="64" height="64" alt={`Smite in game item: ${props.active1}`} src={"/images/" + props.active1.replace(/\s+/g, '-').replace(/'/g, "").toLowerCase() + ".jpg"} loading="lazy"></img>
                        {active1Details ? <Tooltip item={active1Details} itemName={props.active1} /> : null}
                    </div>
                    <div className="buildrow-active" onMouseLeave={hideToolTip}>
                        <img width="64" height="64" alt={`Smite in game item: ${props.active2}`} src={"/images/" + props.active2.replace(/\s+/g, '-').replace(/'/g, "").toLowerCase() + ".jpg"} loading="lazy"></img>
                        {active2Details ? <Tooltip item={active2Details} itemName={props.active2} /> : null}
                    </div>
                </div>
                <div className="buildrow-items">
                    <div className="build-item" onMouseLeave={hideToolTip}>
                        {props.item1 ? <img width="64" height="64" alt={`Smite in game item: ${props.item1}`} src={"/images/" + props.item1.replace(/\s+/g, '-').replace(/'/g, "").toLowerCase() + ".jpg"} loading="lazy"></img> : null}                    
                        {item1Details ? <Tooltip item={item1Details} itemName={props.item1} /> : null}
                    </div>
                    <div className="build-item" onMouseLeave={hideToolTip}>
                        {props.item2 ? <img width="64" height="64" alt={`Smite in game item: ${props.item2}`} src={"/images/" + props.item2.replace(/\s+/g, '-').replace(/'/g, "").toLowerCase() + ".jpg"} loading="lazy"></img> : null}
                        {item2Details ? <Tooltip item={item2Details} itemName={props.item2} /> : null}
                    </div>
                    <div className="build-item" onMouseLeave={hideToolTip}>
                        {props.item3 ? <img width="64" height="64" alt={`Smite in game item: ${props.item3}`} src={"/images/" + props.item3.replace(/\s+/g, '-').replace(/'/g, "").toLowerCase() + ".jpg"} loading="lazy"></img> : null}
                        {item3Details ? <Tooltip item={item3Details} itemName={props.item3} /> : null}
                    </div>
                    <div className="build-item" onMouseLeave={hideToolTip}>
                        {props.item4 ? <img width="64" height="64" alt={`Smite in game item: ${props.item4}`} src={"/images/" + props.item4.replace(/\s+/g, '-').replace(/'/g, "").toLowerCase() + ".jpg"} loading="lazy"></img> : null}
                        {item4Details ? <Tooltip item={item4Details} itemName={props.item4} /> : null}
                    </div>
                    <div className="build-item" onMouseLeave={hideToolTip}>
                        {props.item5 ? <img width="64" height="64" alt={`Smite in game item: ${props.item5}`}  src={"/images/" + props.item5.replace(/\s+/g, '-').replace(/'/g, "").toLowerCase() + ".jpg"} loading="lazy"></img> : null}
                        {item5Details ? <Tooltip item={item5Details} itemName={props.item5} /> : null}
                    </div>
                    <div className="build-item" onMouseLeave={hideToolTip}>
                        {props.item6 ? <img width="64" height="64" alt={`Smite in game item: ${props.item6}`}  src={"/images/" + props.item6.replace(/\s+/g, '-').replace(/'/g, "").toLowerCase() + ".jpg"} loading="lazy"></img> : null}
                        {item6Details ? <Tooltip item={item6Details} itemName={props.item6} /> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}