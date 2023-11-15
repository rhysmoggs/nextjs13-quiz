//client side render, no use of hooks/state
'use client'
import React, { useState } from 'react'
import styles from '../page.module.css'

const page = () => {
  const [scoreData, getScoreData] = useState(null)
  //function to fetch scores:
  const getScores = async () => {
    const res = await fetch(
      // `${process.env.POCKETBASE_URL}/api/collections/quiz/records?page=1&perPage=30`,
      // { cache: 'no-store' }
      // process.env.POCKETBASE_URL +
      //   '/api/collections/quiz/records?page=1&perPage=30',
      // { cache: 'no-store' }
      'http://127.0.0.1:8090/api/collections/quiz/records?page=1&perPage=30',
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
    getScoreData(allData)
  }

  console.log('SCORE DATA: ', scoreData)

  //what is the purpose of this function?:
  const displayScores = async () => {
    const res = await getScores()
    //currently showing as undefined:
    console.log(res)
  }

  //instead of returning this, just export current code as components and create new Page, then import and <Score /> it.
  return (
    <div>
      <button onClick={displayScores} className={styles.btn}>
        Add new High Score
      </button>
      {/* test just to display data: */}
      <p>{JSON.stringify(scoreData)}</p>
    </div>
  )
}

export default page
