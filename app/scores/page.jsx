import React from 'react'
import styles from '../page.module.css'

//test quiz api
async function getScores() {
  const res = await fetch(process.env.POCKETBASE_URL)
  const data = await res.json()
  // console.log(data)
  //array of first record in quiz collection:
  // console.log(data.items[0])

  //array of all records in quiz collection:
  const allData = data.items
  // console.log('allData: ', allData)

  return allData
}

async function HighScores() {
  const allScores = await getScores()
  // console.log('allScores: ', allScores)
  //return each score:
  const scores = allScores?.map((scores) => {
    console.log('internal clg scores', scores)
    console.log('internal clg scores.score', scores.score)
    console.log('internal clg scores.username', scores.username)
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
    </div>
  )
}

function Score({ singleScore }) {
  const { id, username, score } = singleScore || {}
  return (
    //temp styling:
    <div className={styles.card}>
      <p>{id}</p>
      <p>Username: {username}</p>
      <p>Score: {score}</p>
    </div>
  )
}

export default HighScores
