import styles from '../page.module.css'
import Logo from '../components/Logo'
import QuestionsContainer from '../components/QuestionsContainer'
import Error from './error'

function Game() {
  return (
    <main>
      <Logo />
      <div className={styles.gameArea}>
        <div className={styles.container}>
          <Error />
          <QuestionsContainer />
        </div>
      </div>
    </main>
  )
}

export default Game
