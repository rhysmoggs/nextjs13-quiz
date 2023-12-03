'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'
import Link from 'next/link'
import getEnvironment from './getEnvironment.config.js'

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
      <div className={styles.logoArea}>
        <h1 className={styles.logoHeading}>
          <a href='#' rel='noopener noreferrer'>
            <Image
              src='/logo.png'
              alt='Globe Trotters Logo'
              className={styles.logoGlobe}
              width={220}
              height={220}
              priority
            />
          </a>
          <span className={styles.span}>Globe Trotter Quiz</span>
        </h1>
      </div>

      {loading && <p>Loading...</p>}
      {/* if the game has started then show questions */}
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
    </main>
  )
}
