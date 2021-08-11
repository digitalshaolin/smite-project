import styles from '../styles/BuildspageInfo.module.scss'

export default function BuildsPageInstructions() {
    return (
        <section className={styles.buildspageInfo}>
            <div className={styles.container}>
                <h2>Builds Finder</h2>
                <div>
                    <p>The most current matches are pulled from the Smite API throughout the day so it&lsquo;s always up to date.</p>
                    <p>Filter by player or god.</p>
                </div>
            </div>
        </section>
    )
}