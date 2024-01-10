'use client'
import { useEffect, useState } from 'react'
import GetQuizQs from '../api/GetQuizQs'
import Question from './Question'

const QuestionsContainer = () => {
  const [quizQuestions, setQuizQuestions] = useState()
  const [activeQuestion, setActiveQuestion] = useState([])
  const [firstQ, setFirstQ] = useState()
  const [started, setStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [disabledClass, setDisabledClass] = useState(false)
  //fetch api data:

  const getQuestions = async () => {
    const results = await GetQuizQs()
    newQuestion(results)
    // console.log('results:', results)
    // return results
  }

  useEffect(() => {
    getQuestions()
  }, [])

  //take one question from quizQuestions array:
  const newQuestion = (quizQuestions) => {
    if (progress === totalQuestions) {
      setQuizQuestions([])
      setProgress(0)
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

  const totalQuestions = 2

  return (
    <>
      {console.log('quizQuestions: ', quizQuestions)}
      {console.log('activeQuestion: ', activeQuestion)}
      {/* {console.log('activeQuestion: ', activeQuestion)}
      {started && (
        <>
          <h2>
            Question: {progress} / {totalQuestions}
          </h2>
          <Question
            question={activeQuestion}
            givenAnswer={givenAnswer}
            disabled={disabledClass}
            progress={progress}
          />
        </>
      )} */}
      {/* {activeQuestion?.map((question) => {
        return <Question question={question} />
      })} */}

      <h2>
        Question: {progress} / {totalQuestions}
      </h2>
      <h2>{score} miles travelled</h2>

      {
        <Question
          question={activeQuestion}
          givenAnswer={givenAnswer}
          disabled={disabledClass}
          progress={progress}
        />
      }
    </>
  )
}

export default QuestionsContainer
