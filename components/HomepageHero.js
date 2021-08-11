import styles from '../styles/HomepageHero.module.scss'

export default function HomepageHero() {
    return (
        <section className={`${styles.homepageHero} homepage-hero`}>
            <div className={styles.container}>
                <h1>Welcome to Smite Nexus<span>Real builds from the games of SPL players - updated daily</span></h1>
            </div>
            <style jsx>{`
                .homepage-hero {
                    height: 600px;
                }
                @media (max-width: 1000px){
                    .homepage-hero {
                        height: 400px
                    }
                }
            `}
            </style>
        </section>
    )
}