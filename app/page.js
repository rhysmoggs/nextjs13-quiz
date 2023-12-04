'use client'
import styles from './page.module.css'
import { useState } from 'react'
import Link from 'next/link'
import getEnvironment from './getEnvironment.config.js'
import Logo from './components/Logo'

require('dotenv').config()

export default function Home() {
  const [loading, setLoading] = useState(false)

  //clean up functions and seperate into componenets or pages once tested:

  const addHighScore = async (data) => {
    //function to fetch scores:
    try {
      const response = await fetch(
        `${getEnvironment.currentEnvironment}/api/collections/quiz/records`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <main>
      <Logo />

      {loading && <p>Loading...</p>}

      <div className={styles.gameArea}>
        <div className={styles.container}>
          <Link href='/game' className={styles.btn}>
            Start
          </Link>
          <Link href='/' className={styles.btn}>
            How to Play
          </Link>
          <Link href='/' className={styles.btn}>
            Contact
          </Link>
          <Link href='/scores' className={styles.btn}>
            High Scores
          </Link>
        </div>
      </div>
    </main>
  )
}
