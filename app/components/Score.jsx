import React from 'react'
import styles from '../page.module.css'
// import styles from './styles.css'

const Score = ({ ...score }) => {
  // console.log('Score component score = ', score)
  return (
    <div className={styles.card}>
      <p>Username: {score.username}</p>
      <p>Score: {score.score}</p>
    </div>
  )
}

export default Score
