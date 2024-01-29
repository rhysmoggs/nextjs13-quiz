import styles from '../page.module.css'
import Logo from '../components/Logo'

function HowToPlay() {
  return (
    <main>
      <Logo />
      <div className={styles.gameArea}>
        <div className={styles.container}>
          <h1>How to Play</h1>

          <div className={styles.howToText}>
            <p>You have 10 questions to travel the world.</p>
            <p>
              Click the <strong>START</strong> button and answer the questions.
            </p>
            <p>
              Every correct answer is another{' '}
              <span className={styles.goldBackground}>
                2500 miles travelled.
              </span>
            </p>
            <p>
              It takes{' '}
              <span className={styles.goldBackground}>25000 miles</span> to
              travel the world.
            </p>
            <p>
              See if you can travel to the top of the{' '}
              <span className={styles.goldBackground}>High Scores list!</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HowToPlay
