'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [questions, setQuestions] = useState([])

  const getQuizAPI = async () => {
    fetch(
      'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
    )
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results)
        console.log(data.results)
      })
  }

  // useEffect(() => {
  //   getQuizAPI()
  // }, [])

  // useEffect(() => {
  //   async function getQuizAPI() {
  //     const response = await fetch('https://opentdb.com/api.php?amount=10')
  //     const data = await response.json()
  //     setQuestions(data)
  //   }
  //   getQuizAPI()
  //   console.log(questions)
  // }, [])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <button onClick={getQuizAPI} className={styles.btn}>
          Generate
        </button>
        <div>
          <h1 className={styles.heading}>
            <a href='#' rel='noopener noreferrer'>
              <Image
                src='/logo.png'
                alt='Globe Trotters Logo'
                className={styles.globeLogo}
                width={220}
                height={220}
                priority
              />
            </a>
            <span className={styles.span}>Globe Trotter Quiz</span>
          </h1>
        </div>
      </div>

      <div className={styles.center}>
        <h2>Progress Bar</h2>
        <ul>
          {questions.map((q, index) => {
            return <li key={index}>{q.question}</li>
          })}
        </ul>
        <h2>Score</h2>
        <h2>Question</h2>
      </div>

      <div className={styles.grid}>
        <a
          href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className={styles.card}
          rel='noopener noreferrer'
        >
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className={styles.card}
          rel='noopener noreferrer'
        >
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className={styles.card}
          rel='noopener noreferrer'
        >
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className={styles.card}
          rel='noopener noreferrer'
        >
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
