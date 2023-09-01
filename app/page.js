'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'

export default function Home() {
  const [question, setQuestion] = useState([])
  const [score, setScore] = useState(0)
  // const [answers, setAnswers] = useState([])

  const getQuizAPI = async () => {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
    )
    const data = await response.json()
    const questions = data.results.map((question) => {
      const newQuestion = {
        question: question.question,
        correct_answer: question.correct_answer,
        incorrect_answers: question.incorrect_answers,
      }
      return newQuestion
    })
    const randomProperty = (newQuestion) => {
      var keys = Object.keys(newQuestion)
      return newQuestion[keys[(keys.length * Math.random()) << 0]]
    }

    const randomQ = randomProperty(questions)
    console.log(randomQ)

    setQuestion(randomQ)
  }

  const handleClickEvent = () => {
    getQuizAPI()
  }

  // getQuestion(question)

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
        <button onClick={handleClickEvent} className={styles.btn}>
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
        {/* <ul>
          {question.map((q, index) => {
            // console.log(q)
            return (
              <li key={index}>
                {q.question}
                {q.correct_answer}
                {q.incorrect_answers}
              </li>
            )
          })}
        </ul> */}
        <h2>Score {score}</h2>
        <h2>{question.question}</h2>
      </div>

      <div className={styles.grid}>
        <a href='#' className={styles.card} rel='noopener noreferrer'>
          <p>{question.correct_answer}</p>
        </a>
        {question.incorrect_answers?.map((q, index) => {
          return (
            <a
              key={index}
              href='#'
              className={styles.card}
              rel='noopener noreferrer'
            >
              <p>{q}</p>
            </a>
          )
        })}
      </div>
    </main>
  )
}
