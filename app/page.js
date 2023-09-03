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
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [started, setStarted] = useState(false)
  const [endGame, setEndGame] = useState(false)

  //fetch api data:
  const getQuizAPI = async () => {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
    )
    const data = await response.json()
    const questions = data.results

    // console.log(questions)
    setIsLoading(false)
    setQuestions(questions)
  }

  //start game on click and generate 10 questions:
  const startGame = () => {
    setScore(0)
    setProgress(0)
    //get 10 questions:
    getQuizAPI().catch((e) => console.log(e.message, 'offline beyy'))
    //add loader while API data is fetched?:
    setIsLoading(true)
    //display question area and hide Start button
    setStarted(true)
  }

  //function to return single random question, could be used to randomize answers in cards?:
  // const randomQuestionFunction = (newQuestion) => {
  //   var keys = Object.keys(newQuestion)
  //   return newQuestion[keys[(keys.length * Math.random()) << 0]]
  // }
  // const randomQuestion = randomQuestionFunction(questions)
  // console.log(randomQuestion)

  const newQuestion = () => {
    if (progress === totalQuestions) {
      console.log('end game')
      //run end game function:

      //switch Start Game button txt to Restart:
      setEndGame(true)
      //hide question quiz area:
      setStarted(false)
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

  //check if answer is correct or not:
  //this works but is very buggy and can sometimes return wrong answer:
  const givenAnswer = (e) => {
    const btnTxt = e.target.innerHTML
    if (btnTxt === activeQuestion.correct_answer) {
      console.log('yeeee buddy!')
      setScore(score + 1)
    } else {
      console.log('nahhh')
    }
    newQuestion()
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
        {isLoading && <p>Loading...</p>}
        {!started ? (
          <button onClick={startGame} className={styles.btn}>
            {!endGame ? 'Start Game' : 'Restart'}
          </button>
        ) : (
          <div>
            <h2>
              Progress Bar: {progress} / {totalQuestions}
            </h2>
            <h2>Score {score}</h2>
            <button onClick={newQuestion} className={styles.btn}>
              Next Question
            </button>
            <h2>{activeQuestion.question}</h2>
            <div className={styles.grid}>
              <a
                href='#'
                onClick={givenAnswer}
                className={styles.card}
                rel='noopener noreferrer'
              >
                <p>{activeQuestion.correct_answer}</p>
              </a>
              {activeQuestion.incorrect_answers?.map((q, index) => {
                return (
                  <a
                    key={index}
                    href='#'
                    onClick={givenAnswer}
                    className={styles.card}
                    rel='noopener noreferrer'
                  >
                    <p>{q}</p>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
