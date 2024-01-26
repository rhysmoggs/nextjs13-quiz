import React from 'react'
import styles from '../page.module.css'

const Score = ({ ...score }) => {
  return (
    <div className={styles.scoreCard}>
      <p>Username: {score.username}</p>
      <p>Score: {score.score}</p>
    </div>
  )
}

export default Score
