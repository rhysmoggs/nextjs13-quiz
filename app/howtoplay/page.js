import styles from '../page.module.css'
import Logo from '../components/Logo'

function HowToPlay() {
  return (
    <main>
      <Logo />
      <div className={styles.gameArea}>
        <div className={styles.container}>
          <h1>How to Play</h1>
        </div>
      </div>
    </main>
  )
}

export default HowToPlay
