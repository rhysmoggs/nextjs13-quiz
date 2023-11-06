import React from 'react'
import styles from '../page.module.css'

function Score({ singleScore }) {
  // const { id, username, score } = singleScore || {}
  const { id, username, score } = singleScore || null
  return (
    //temp styling:
    <div className={styles.card}>
      <p>{id}</p>
      <p>Username: {username}</p>
      <p>Score: {score}</p>
    </div>
  )
}

export default Score
