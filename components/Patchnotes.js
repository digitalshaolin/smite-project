import styles from '../styles/Patchnotes.module.scss'
import Link from 'next/link'

export default function Patchnotes() {
    return (
        <section className={styles.patchnotes_row}>           
            <div className={styles.container}>
                <h2 className={styles.heading}>8.7 Bonus Update Part 1 Notes - Live July&nbsp;27</h2>
                <p className={styles.author}>Author: <span>TitanCupcake</span></p>
                <div className={styles.image}>
                    <img loading="eager" alt="" width="96" height="96" src="/images/gods/morgan-le-fay.jpg"/>
                </div>
                <h2 className={styles.subheading}>Morgan Le Fay</h2>
                <p className={styles.blockquote}>The Dark Enchantress continues to weave her spells to great effect on the battleground. Overall players have really learned to utilize her multiple sigils and maximize the tradeoff between playing aggressive vs. losing her safety. With all this experience she continues to be overperforming so we are lowering the raw damage Sigil Mastery can dish out.</p>
                <div className={styles.changes}>
                    <h2 className={styles.changes_heading}>Sigil Mastery</h2>
                    <ul>
                        <li>Decreased Magical Power Scaling from 55% to 50% on the inner area</li>
                        <li>Decreased Magical Power Scaling from 35% to 30% on the outer area</li>
                    </ul>                    
                </div>
                <div className={styles.image}>
                    <img loading="lazy" alt="" width="96" height="96" src="/images/gods/gilgamesh.jpg"/>
                </div>
                <h2 className={styles.subheading}>Gilgamesh</h2>
                <p className={styles.blockquote}>Gilgamesh may as well be immortal at this point, showing a huge resilience to nerfs that traditionally would tank other gods. This round we are looking toward Sun-Forged Scimitar and the initial burst. With its low cooldown the damage of this ability can really stack up, especially in more offensive builds. This should relieve enemies from some of this pressure and allow them to fight back.</p>
                <div className={styles.changes}>
                    <h2 className={styles.changes_heading}>Sun-Forged Scimitar</h2>
                    <ul>
                        <li>Decreased Physical Power Scaling of the Initial AoE hit from 60% to 50%</li>                        
                    </ul>                    
                </div>
                <a onClick={() => { window.open("https://www.smitegame.com/news/8-7-bonus-update-notes-live-july-27/", "_blank", "noreferrer")}} className={`${styles.button} button`}>full patch notes</a>
            </div>           
        </section>
    )
}