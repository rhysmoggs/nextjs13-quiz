import styles from '../page.module.css'
import Logo from '../components/Logo'
import QuestionsContainer from '../components/QuestionsContainer'

function Game() {
  return (
    <main>
      <Logo />
      <div className={styles.gameArea}>
        <div className={styles.container}>
          <QuestionsContainer />
        </div>
      </div>
    </main>
  )
}

export default Game
