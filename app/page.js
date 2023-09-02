'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'

// 1. gather 10 Qs from API
// 2. randomize order of 10 Qs = ? dont need to
// 3. setQuestion(results of randomization) = ? dont need to

// 4. go through list of questions(state) one by one and show on DOM

export default function Home() {
  const [questions, setQuestions] = useState([])
  const [activeQuestion, setActiveQuestion] = useState([])
  const [progress, setProgress] = useState(0)

  //fetch api data:
  const getQuizAPI = async () => {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
    )
    const data = await response.json()
    const questions = data.results

    // console.log(questions)

    //function to return single random question, could be used to randomize answers in cards?:
    // const randomQuestionFunction = (newQuestion) => {
    //   var keys = Object.keys(newQuestion)
    //   return newQuestion[keys[(keys.length * Math.random()) << 0]]
    // }
    // const randomQuestion = randomQuestionFunction(questions)
    // console.log(randomQuestion)

    setQuestions(questions)
  }

  //start game and generate 10 questions:
  const startGame = () => {
    //get 10 questions:
    getQuizAPI()
  }

  //function to return single random question and answers (but can show duplicate questions):
  // const newQuestion = () => {
  //   var keys = Object.keys(questions)
  //   const randomQuestion = questions[keys[(keys.length * Math.random()) << 0]]
  //   setActiveQuestion(randomQuestion)
  //   console.log(activeQuestion)
  // }

  const newQuestion = () => {
    if (progress === totalQuestions) {
      console.log('end game')
      //run end game function
    } else {
      const newQ = questions[0]
      setActiveQuestion(newQ)
      // console.log(activeQuestion)
      const newList = questions.slice(1)
      setQuestions(newList)
      // console.log(newList)
      setProgress(progress + 1)
    }
  }

  const totalQuestions = 10

  return (
    <main className={styles.main}>
      <div className={styles.description}>
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
        <h2>
          Progress Bar: {progress} / {totalQuestions}{' '}
        </h2>
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
        <button onClick={startGame} className={styles.btn}>
          Start Game
        </button>
        <button onClick={newQuestion} className={styles.btn}>
          Next Question
        </button>
        <h2>Score</h2>
        {/* <h2>{question.question}</h2> */}
        <h2>{activeQuestion.question}</h2>
        {/* <h2>{activeQuestion.correct_answer}</h2>
        <h2>{activeQuestion.incorrect_answers}</h2> */}
      </div>

      <div className={styles.grid}>
        <a href='#' className={styles.card} rel='noopener noreferrer'>
          <p>{activeQuestion.correct_answer}</p>
        </a>
        {activeQuestion.incorrect_answers?.map((q, index) => {
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
