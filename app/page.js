'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'

export default function Home() {
  const [questions, setQuestions] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [started, setStarted] = useState(false)
  const [endGame, setEndGame] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  //too much state? reduce or collate more into one state.

  //fetch api data:
  const getQuizAPI = async () => {
    setLoading(true)
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
    setStarted(true)
  }

  //function to return single random question, could be used to randomize answers in cards?:
  // const randomQuestionFunction = (newQuestion) => {
  //   var keys = Object.keys(newQuestion)
  //   return newQuestion[keys[(keys.length * Math.random()) << 0]]
  // }
  // const randomQuestion = randomQuestionFunction(questions)
  // console.log(randomQuestion)

  const newQuestion = (questions) => {
    if (progress === totalQuestions) {
      //reset score, progress and questions to 0/null:
      setQuestions([])
      setProgress(0)
      setScore(0)
      console.log('end game')
      //run end game function:

      //switch Start Game button txt to Restart:
      setEndGame(true)
      //hide question quiz area:
      setStarted(false)
    } else {
      //reset answer state:
      setIsCorrect(false)
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

  //check if answer is correct or not:
  const givenAnswer = (rightAnswer, index) => {
    if (rightAnswer) {
      // console.log('yeeee buddy!')
      // console.log(rightAnswer)
      // console.log(index)
      //link state to index to indicate correct answer, then alter className in DOM:
      setIsCorrect(index)
      setTimeout(() => {
        //wait 1000ms for user to notice style change, then produce next question:
        newQuestion(questions)
      }, 1000)

      setScore(score + 1)
    } else {
      console.log(rightAnswer)
      console.log('nahhh')
      newQuestion(questions)
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
        {endGame && (
          <div>
            <h3>Congratulations!</h3>
            <h2>Score {score}</h2>
            {/* //add name form to save to highscore board: */}
            {/* //save button for name input: */}
          </div>
        )}
        {loading && <p>Loading...</p>}
        {/* if the game has started then show questions */}
        {started ? (
          <div>
            <h2>
              Progress Bar: {progress} / {totalQuestions}
            </h2>
            <h2>Score {score}</h2>
            <h2>{activeQuestion && activeQuestion.question}</h2>
            <div className={styles.grid}>
              {activeQuestion &&
                activeQuestion.answers.map((q, index) => {
                  return (
                    <a
                      ///try something like this?:
                      // id={id}
                      key={index}
                      href='#'
                      onClick={() => givenAnswer(q.rightAnswer, index)}
                      // className={styles.card}
                      className={
                        isCorrect === index ? styles.card2 : styles.card
                      }
                      rel='noopener noreferrer'
                    >
                      <p>{q.answer}</p>
                    </a>
                  )
                })}
            </div>
          </div>
        ) : (
          <button onClick={getQuizAPI} className={styles.btn}>
            {!endGame ? 'Start Game' : 'Restart'}
          </button>
        )}
      </div>
    </main>
  )
}
