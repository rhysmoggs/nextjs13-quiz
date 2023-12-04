import ScoreContainer from '../components/ScoreContainer'
import Link from 'next/link'
import styles from '../page.module.css'
import Logo from '../components/Logo'

function Scores() {
  return (
    <main>
      <Logo />
      <div className={styles.gameArea}>
        <div className={styles.container}>
          <h1>High Scores: </h1>
          <ScoreContainer />
          <Link href='/' className={styles.btnLink}>
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Scores
