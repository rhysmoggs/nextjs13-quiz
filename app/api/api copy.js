//client side render, no use of hooks/state
'use client'
import React, { useEffect, useState } from 'react'
import Score from '../components/ScoreContainer'

const page = () => {
  const [scoreData, setScoreData] = useState(null)

  //create url variable which holds either dev or production env variable depending on environment?:

  useEffect(() => {
    //function to fetch scores:
    const getScores = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/collections/quiz/records?page=1&perPage=30`,
        // process.env.NEXT_PUBLIC_POCKETBASE_URL +
        //   '/api/collections/quiz/records?page=1&perPage=30',
        // { cache: 'no-store' }
        // 'http://127.0.0.1:8090/api/collections/quiz/records?page=1&perPage=30',
        {
          cache: 'no-store',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      console.log('res: ', res)
      const data = await res.json()
      console.log('data: ', data)

      const allData = await data.items
      console.log('allData clg: ', allData)
      setScoreData(allData)
    }
    getScores()
  }, [])

  //instead of returning this, just export current code as components and create new Page, then import and <Score /> it.
  return (
    <div>
      <h1>List of High Scores:</h1>
      {/* {scoreData ? <p>{JSON.stringify(scoreData)}</p> : <p>Loading...</p>} */}
      {scoreData ? (
        scoreData.map((score) => {
          console.log(score.score)
          // return <Score score={score} />
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default page
