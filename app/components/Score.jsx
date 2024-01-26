import React from 'react'
import styles from '../page.module.css'

const Score = ({ ...score }) => {
  //add logic to hightlight top score in Gold colour
  return (
    <div className={styles.scoreCard}>
      <p>Username: {score.username}</p>
      <p>Score: {score.score}</p>
    </div>
  )
}

export default Score
