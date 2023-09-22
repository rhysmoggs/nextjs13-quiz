import React from 'react'
// import styles from '../page.module.css'

//test quiz api
async function getScores() {
  const res = await fetch(process.env.POCKETBASE_URL)
  const data = await res.json()
  // console.log(data)
  //array of all records in quiz collection:
  // console.log(data.items)
  //array of first record in quiz collection:
  // console.log(data.items[0])

  const newData = data.items

  const singleScore = newData.map((singleScore) => {
    console.log('internal clg', singleScore)
    console.log('internal clg', singleScore.score)
    console.log('internal clg', singleScore.username)
    return singleScore
  })

  return singleScore
}

async function Score() {
  const scores = await getScores()
  return (
    <div>
      <h1>High Scores</h1>
      <div>
        <p>
          {scores?.map((score) => {
            return <SingleScore key={score.id} score={score} />
          })}
        </p>
      </div>
    </div>
  )
}

function SingleScore(score) {
  return (
    <div>
      <p>{score}</p>
    </div>
  )
}

export default Score
