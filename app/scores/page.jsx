import React from 'react'
import pb from 'lib/pocketbase.js'
import styles from '../page.module.css'
import Score from '../components/Score'
import Link from 'next/link'

//test quiz api
// async function getScores() {
//   const res = await fetch(
//     process.env.POCKETBASE_URL +
//       '/api/collections/quiz/records?page=1&perPage=30',
//     { cache: 'no-store' }
//   )
//   const data = await res.json()

//   const allData = await data.items

//   return allData
// }

async function getScores() {
  const records = await pb.collection('quiz').getFullList({
    sort: '-created',
    requestKey: null,
  })

  return records
}

// export default async function HighScores() {
//   const data = await getScores()
//   // //return each score:
//   const scores = await data.map((scores) => {
//     // console.log('internal clg scores', scores)
//     // console.log('internal clg scores.score', scores.score)
//     // console.log('internal clg scores.username', scores.username)
//     return scores
//   })
//   return (
//     <div>
//       <h1>High Scores</h1>
//       <div>
//         {scores?.map((score) => {
//           // return <Score key={score.id} singleScore={score} />
//           return <Score key={score.id} singleScore={score || null} />
//         })}
//       </div>
//       <Link href='/' className={styles.btnLink}>
//         Home
//       </Link>
//     </div>
//   )
// }
export default async function HighScores() {
  const data = await getScores()
  // //return each score:
  const scores = await data.map((scores) => {
    return scores
  })
  return (
    <div>
      <h1>High Scores</h1>
      <div>
        {scores?.map((score) => {
          // return <Score key={score.id} singleScore={score} />
          return <p>singleScore={score || null} </p>
        })}
      </div>
      <Link href='/' className={styles.btnLink}>
        Home
      </Link>
    </div>
  )
}
