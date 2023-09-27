import React from 'react'
import styles from '../page.module.css'
import Score from './components/Score'
import Link from 'next/link'

//test quiz api
async function getScores() {
  const res = await fetch(process.env.POCKETBASE_URL, { cache: 'no-store' })
  const data = await res.json()

  //array of all records in quiz collection:
  const allData = await data.items

  return allData
}

export default async function HighScores() {
  const data = await getScores()
  // //return each score:
  const scores = await data?.map((scores) => {
    // console.log('internal clg scores', scores)
    // console.log('internal clg scores.score', scores.score)
    // console.log('internal clg scores.username', scores.username)
    return scores
  })
  return (
    <div>
      <h1>High Scores</h1>
      <div>
        {scores?.map((score) => {
          return <Score key={score.id} singleScore={score} />
        })}
      </div>
      <Link href='/' className={styles.btnLink}>
        Home
      </Link>
    </div>
  )
}
