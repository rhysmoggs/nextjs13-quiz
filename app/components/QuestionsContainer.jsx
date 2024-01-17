'use client'
import { useEffect, useState } from 'react'
import GetQuizQs from '../api/GetQuizQs'
import Question from './Question'
import styles from '../page.module.css'
import AddScore from './AddScore'
import Link from 'next/link'
import getEnvironment from '../getEnvironment.config.js'

const QuestionsContainer = () => {
  const [quizQuestions, setQuizQuestions] = useState()
  const [activeQuestion, setActiveQuestion] = useState([])
  const [endGame, setEndGame] = useState(false)
  const [started, setStarted] = useState(false)
  //integrate loading state:
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [disabledClass, setDisabledClass] = useState(false)
  const [count, setCount] = useState(5)

  //set timer to countdown from 0 to 5 seconds and then End Game, unless answer is selected in that time frame, then clear:
  useEffect(() => {
    // Exit early if countdown is finished
    if (count <= 0) {
      console.log('END GAME')
      //set end game logic:
      setStarted(false)
      //alter msg in End Game to be "Time Out"
      setEndGame(true)
      return
      // return () => clearInterval(timer)
    }

    // Set up timer:
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1)
    }, 1000)

    // Clear timer history:
    return () => clearInterval(timer)
  }, [count])

  //fetch api data:
  const getQuestions = async () => {
    const results = await GetQuizQs()
    newQuestion(results)
    setStarted(true)
  }

  useEffect(() => {
    getQuestions()
  }, [])

  //take one question from quizQuestions array:
  const newQuestion = (quizQuestions) => {
    if (progress === totalQuestions) {
      setQuizQuestions([])
      setProgress(0)
      setStarted(false)
      setEndGame(true)
      //set end game logic here:
    } else {
      if (quizQuestions != undefined) {
        console.log('quizQuestions: ', quizQuestions)
        const soloQuestion = quizQuestions[0]
        setActiveQuestion(soloQuestion)
        //remove question from set of questions:
        const newList = quizQuestions.slice(1)
        // update:
        setQuizQuestions(newList)
        setProgress(progress + 1)
        //trial resetTimer:
        // resetTimer()
        setCount(5)
      } else {
        console.log('awaiting promise')
      }
    }
  }

  //Check answer:
  const givenAnswer = (answer) => {
    setDisabledClass(true)
    const defoCorrect = activeQuestion['answers'].find(
      (item) => item.rightAnswer === true
    )

    if (answer.rightAnswer === defoCorrect.rightAnswer) {
      console.log('yeeee buddy!')
      setScore(score + 2500)
    } else {
      console.log('nahhh')
    }
    setTimeout(() => {
      newQuestion(quizQuestions)
      setDisabledClass(false)
    }, 1000)
  }

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

  const totalQuestions = 5

  return (
    <>
      {started && (
        <>
          <p>Time left: {count} seconds</p>
          <h2>
            Question: {progress} / {totalQuestions}
          </h2>
          <h2>{score} miles travelled</h2>
          <Question
            question={activeQuestion}
            givenAnswer={givenAnswer}
            disabled={disabledClass}
            progress={progress}
          />
        </>
      )}
      {endGame && (
        <>
          {loading && <p>Loading...</p>}
          <>
            <h3>
              {count <= 0
                ? `Unlucky! You ran out of time.`
                : `Congratulations!`}
            </h3>
            <h2 className={styles.scoreTally}>{score} miles travelled</h2>
            <AddScore score={score} addHighScore={addHighScore} />

            <Link href='/' className={styles.btn}>
              Home
            </Link>

            <Link href='/scores' className={styles.btn}>
              High Scores
            </Link>
          </>
        </>
      )}
    </>
  )
}

export default QuestionsContainer
