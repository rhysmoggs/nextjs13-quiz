'use client'
import styles from '../page.module.css'
import AddScore from './AddScore'
import Link from 'next/link'
import getEnvironment from '../getEnvironment.config.js'

const EndGame = ({ score, count }) => {
  // const [loading, setLoading] = useState(true)
  // const [score, setScore] = useState(0)
  // const [spinner, setSpinner] = useState(true)
  console.log(count)

  const addHighScore = async (data) => {
    //function to fetch scores:
    try {
      const response = await fetch(
        `${getEnvironment.currentEnvironment}/api/collections/quiz/records`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <div className={styles.gameArea}>
      <div className={styles.container}>
        {/* {loading && <h2>Loading...</h2>} */}

        <h2 className={styles.scoreTally}>{score} miles travelled</h2>
        <AddScore score={score} addHighScore={addHighScore} />
        <>
          <Link href='/' className={styles.btn}>
            Home
          </Link>

          <Link href='/scores' className={styles.btn}>
            High Scores
          </Link>
        </>
      </div>
    </div>
  )
}

export default EndGame
