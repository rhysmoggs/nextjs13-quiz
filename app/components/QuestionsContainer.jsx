'use client'
import { useEffect, useState } from 'react'
import GetQuizQs from '../api/GetQuizQs'
import Question from './Question'

const QuestionsContainer = () => {
  const [quizQuestions, setQuizQuestions] = useState()
  const [activeQuestion, setActiveQuestion] = useState([])
  const [firstQ, setFirstQ] = useState()
  const [started, setStarted] = useState(false)
  //fetch api data:

  // useEffect(() => {
  //   const getQuestions = async () => {
  //     const results = await GetQuizQs()
  //     const questions = results?.map((q) => {
  //       const question = q.question

  //       //add
  //       const correct = { answer: q.correct_answer, rightAnswer: true }
  //       const incorrect = q.incorrect_answers.map((i) => {
  //         return i
  //       })

  //       const lastIncorrect = incorrect.map((inc) => {
  //         return { answer: inc, rightAnswer: false }
  //       })
  //       const answers = [...lastIncorrect, correct]

  //       return { question, answers }
  //     })
  //     setQuizQuestions(questions)
  //   }
  //   getQuestions()
  // }, [])

  useEffect(() => {
    const getQuestions = async () => {
      const results = await GetQuizQs()
      const questions = await results?.map((q) => {
        const question = q.question

        //add
        const correct = { answer: q.correct_answer, rightAnswer: true }
        const incorrect = q.incorrect_answers.map((i) => {
          return i
        })

        const lastIncorrect = incorrect.map((inc) => {
          return { answer: inc, rightAnswer: false }
        })
        const answers = [...lastIncorrect, correct]

        return { question, answers }
      })
      return questions
    }
    const getOneQ = async () => {
      const results = await getQuestions()
      const soloQuestion = results[0]
      //try this, or should it be done on getquizqs.js api section:
      // const serializedQ = JSON.stringify(soloQuestion)
      setActiveQuestion(soloQuestion)
      console.log(activeQuestion)
    }
    getOneQ()
    setStarted(true)
  }, [])

  //declare function to get one set of questions from , then pass as props to Question container

  return (
    <>
      {console.log('activeQuestion: ', activeQuestion)}
      {started && <Question question={activeQuestion} />}
      {/* {activeQuestion?.map((question) => {
        return <Question question={question} />
      })} */}

      {/* {started ? <Question questions={quizQuestions} /> : <h2>Loading...</h2>} */}
    </>
  )
}

export default QuestionsContainer
