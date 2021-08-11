import styles from '../styles/BuildspageHero.module.scss'

export default function BuildsPageHero() {
    return (
        <section className={`${styles.buildspageHero} buildspage-hero`}>
            <div className={styles.container}>
                <h1>Smite pro builds</h1>               
            </div>
            <style jsx>{`
                .buildspage-hero {
                    height: 600px;
                }
                @media (max-width: 1000px){
                    .buildspage-hero {
                        height: 400px
                    }
                }
            `}
            </style>
        </section>
    )
}