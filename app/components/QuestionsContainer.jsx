'use client'
import { useEffect, useState } from 'react'
import GetQuizQs from '../api/GetQuizQs'
import Question from './Question'
import styles from '../page.module.css'
import getEnvironment from '../getEnvironment.config.js'
import EndGame from './EndGame'
import Timer from './Timer'

const QuestionsContainer = () => {
  const [quizQuestions, setQuizQuestions] = useState()
  const [activeQuestion, setActiveQuestion] = useState([])
  const [endGame, setEndGame] = useState(false)
  const [started, setStarted] = useState(false)
  //integrate loading state:
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [disabledClass, setDisabledClass] = useState(false)
  const [count, setCount] = useState(5)
  // const [spinner, setSpinner] = useState(true)

  //fetch api data:
  const getQuestions = async () => {
    const results = await GetQuizQs()
    newQuestion(results)
    setLoading(false)
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

  const totalQuestions = 2

  return (
    <div className={styles.gameArea}>
      <div className={styles.container}>
        {loading && <h2>Loading...</h2>}
        {started && (
          <>
            <Timer />
            <h2>
              Question: {progress} / {totalQuestions}
            </h2>
            <h2 className={styles.scoreTally}>{score} miles travelled</h2>
            <Question
              question={activeQuestion}
              givenAnswer={givenAnswer}
              disabled={disabledClass}
              progress={progress}
            />
          </>
        )}
        {endGame && <EndGame score={score} count={count} />}
      </div>
    </div>
  )
}

export default QuestionsContainer
