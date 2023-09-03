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
  const [activeQuestion, setActiveQuestion] = useState(null)
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
    const results = data.results

    const questions = results.map((q) => {
      const question = q.question

      //add
      const correct = { answer: q.correct_answer, rightAnswer: true }
      const incorrect = q.incorrect_answers.map((i) => {
        // return { incorrect_answers: i, rightAnswer: 'false' }
        return i
      })

      const lastCorrect = incorrect.map((inc) => {
        return { answer: inc, rightAnswer: false }
      })
      // console.log(lastCorrect)
      const answers = [...lastCorrect, correct]

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
      console.log(answers)

      return { question, answers }
    })

    setIsLoading(false)
    setQuestions(questions)
  }

  //start game on click and generate 10 questions:
  const startGame = () => {
    setScore(0)
    setProgress(0)
    setEndGame(false)
    //get 10 questions:
    getQuizAPI().catch((e) => console.log(e.message, 'cannot fetch questions'))
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
      console.log(newQ)

      const newList = questions.slice(1)
      setQuestions(newList)
      setProgress(progress + 1)
    }
  }

  //check if answer is correct or not:
  const givenAnswer = (rightAnswer) => {
    if (rightAnswer) {
      console.log('yeeee buddy!')
      console.log(rightAnswer)
      setScore(score + 1)
    } else {
      console.log(rightAnswer)
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
        {!endGame ? (
          <div></div>
        ) : (
          <div>
            <h3>Niiiiice</h3>
            <h2>Score {score}</h2>
          </div>
        )}
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
            <h2>{activeQuestion && activeQuestion.question}</h2>
            <div className={styles.grid}>
              {activeQuestion &&
                activeQuestion.answers.map((q, index) => {
                  // console.log(q.incorrect_answers)
                  return (
                    <a
                      key={index}
                      href='#'
                      onClick={() => givenAnswer(q.rightAnswer)}
                      className={styles.card}
                      rel='noopener noreferrer'
                    >
                      <p>{q.answer}</p>
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
