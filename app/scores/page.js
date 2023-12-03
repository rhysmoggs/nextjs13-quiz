import ScoreContainer from '../components/ScoreContainer'
import Link from 'next/link'
import styles from '../page.module.css'

function Scores() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>High Scores: </h1>
        <ScoreContainer />
        <Link href='/' className={styles.btnLink}>
          Home
        </Link>
      </div>
    </main>
  )
}

export default Scores
