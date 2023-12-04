import Card from './Card'
import GetQuizQs from '../api/GetQuizQs'
import { useState } from 'react'
import styles from '../styles.css'

const GameContainer = async () => {
  const [questions, setQuestions] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [started, setStarted] = useState(false)
  const [endGame, setEndGame] = useState(false)
  //set state for answer
  const [disabledClass, setDisabledClass] = useState(false)

  const orderQuetions = async () => {
    const runQuiz = await GetQuizQs()
    const questions = runQuiz.map((q) => {
      const question = q.question

      //add
      const correct = { answer: q.correct_answer, rightAnswer: true }
      const incorrect = q.incorrect_answers.map((i) => {
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
  }

  // generate new question:
  const newQuestion = (questions) => {
    if (progress === totalQuestions) {
      //reset score, progress and questions to 0/null:
      setQuestions([])
      setProgress(0)
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
  return (
    <>
      <div className={styles.container}>
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
      {questions.map((question, answer) => {
        return console.log('test: ', question, answer)
      })}
    </>
  )
}

export default GameContainer
