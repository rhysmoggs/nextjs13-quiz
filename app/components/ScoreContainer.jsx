import React from 'react'
import getDataFromAPI from '../api/API'
import Score from './Score'
import styles from '../page.module.css'

const ScoreContainer = async () => {
  const scoreData = await getDataFromAPI()
  return (
    <div className={styles.scoreContainer}>
      {scoreData.items.map((score) => {
        return <Score key={score.id} {...score} />
      })}
    </div>
  )
}

export default ScoreContainer
