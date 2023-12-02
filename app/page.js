'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'
import Card from './components/Card'
import Link from 'next/link'
import AddScore from './components/AddScore'
import getEnvironment from './getEnvironment.config.js'

require('dotenv').config()

export default function Home() {
  const [questions, setQuestions] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [started, setStarted] = useState(false)
  const [endGame, setEndGame] = useState(false)
  //set state for answer
  const [disabledClass, setDisabledClass] = useState(false)

  //too much state? reduce or collate more into one state.

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

  //fetch api data:
  const getQuizAPI = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
      )
      console.log('questions response clg: ', response)
      const data = await response.json()
      const results = data.results

      const questions = results.map((q) => {
        const question = q.question

        //add
        const correct = { answer: q.correct_answer, rightAnswer: true }
        const incorrect = q.incorrect_answers.map((i) => {
          // return { incorrect_answers: i, rightAnswer: 'false' }
          return i
        })

        const lastIncorrect = incorrect.map((inc) => {
          return { answer: inc, rightAnswer: false }
        })
        // console.log(lastCorrect)
        const answers = [...lastIncorrect, correct]

        //randomize order of answers:
        function shuffle(array) {
          let currentIndex = array.length,
            randomIndex

          // While there remain elements to shuffle.
          while (currentIndex > 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            // And swap it with the current element.
            ;[array[currentIndex], array[randomIndex]] = [
              array[randomIndex],
              array[currentIndex],
            ]
          }

          return array
        }
        shuffle(answers)

        return { question, answers }
      })

      setLoading(false)

      setQuestions(questions)
      newQuestion(questions)
      setScore(0)
      setStarted(true)
      //can improve this by toggling? if started is true then end is false?
      setEndGame(false)
      // console.log(questions)
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  // generate new question:
  const newQuestion = (questions) => {
    if (progress === totalQuestions) {
      //reset score, progress and questions to 0/null:
      setQuestions([])
      setProgress(0)
      // setScore(0)
      // console.log('end game')
      //run end game function:

      //switch Start Game button txt to Restart:
      setEndGame(true)
      //hide question quiz area:
      setStarted(false)
    } else {
      //reset answer state:

      //take first question set:
      const newQ = questions[0]
      setActiveQuestion(newQ)
      //remove question from set of questions:
      const newList = questions.slice(1)
      // update:
      setQuestions(newList)
      setProgress(progress + 1)
    }
  }

  // check if selected answer is correct or not:
  const givenAnswer = (answer) => {
    setDisabledClass(true)
    const defoCorrect = activeQuestion['answers'].find(
      (item) => item.rightAnswer === true
    )

    if (answer.rightAnswer === defoCorrect.rightAnswer) {
      // console.log('yeeee buddy!')

      setScore(score + 1000)
    } else {
      // console.log('nahhh')
      //write logic for wrong answer or visual UX?
    }
    setTimeout(() => {
      newQuestion(questions)
      setDisabledClass(false)
    }, 1000)
  }

  const totalQuestions = 2

  return (
    <main>
      <div className={styles.logoArea}>
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

      <div className={styles.gameArea}>
        <div className={styles.container}>
          {endGame && (
            <div>
              <h3>Congratulations!</h3>
              <h2 className={styles.scoreTally}>{score} miles travelled</h2>
              <AddScore score={score} addHighScore={addHighScore} />
            </div>
          )}
          {loading && <p>Loading...</p>}
          {/* if the game has started then show questions */}
          {started ? (
            <div>
              <h2>
                Question: {progress} / {totalQuestions}
              </h2>
              <h2 className={styles.scoreTally}>{score} miles travelled</h2>
              <h2>{activeQuestion && activeQuestion.question}</h2>
              <div className={styles.grid}>
                {activeQuestion &&
                  activeQuestion.answers.map((answer, index) => (
                    <Card
                      disabled={disabledClass}
                      answer={answer}
                      key={index}
                      givenAnswer={givenAnswer}
                      progress={progress}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className={styles.container}>
              <button onClick={getQuizAPI} className={styles.btn}>
                {!endGame ? 'Start Game' : 'Restart'}
              </button>
              {!endGame && (
                <>
                  <Link href='/' className={styles.btn}>
                    How to Play
                  </Link>
                  <Link href='/' className={styles.btn}>
                    Contact
                  </Link>
                  <Link href='/scores' className={styles.btn}>
                    High Scores
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
