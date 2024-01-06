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
  const [disabledClass, setDisabledClass] = useState(false)
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
      // return questions
      setQuizQuestions(questions)
      console.log('internal clg: ', questions)
    }
    // const getOneQ = async (quizQuestions) => {
    //   console.log('getOneQ quizQuestions: ', quizQuestions)
    //   const results = await getQuestions()
    //   if (results !== undefined) {
    //     const soloQuestion = await results[0]
    //     setActiveQuestion('activeQuestion: ', soloQuestion)
    //     const newList = quizQuestions.slice(1)
    //     setQuizQuestions('totalQuestionsLeft: ', newList)
    //     console.log(activeQuestion)
    //     setProgress(progress + 1)
    //   } else {
    //     console.log('awaiting promise')
    //   }
    // }
    getQuestions()
    // getOneQ()
    // const getOneQ = async () => {
    //   const results = await getQuestions()
    //   if (results !== undefined) {
    //     const soloQuestion = await results[0]
    //     setActiveQuestion(soloQuestion)
    //     console.log(activeQuestion)
    //     setProgress(progress + 1)
    //   } else {
    //     console.log('awaiting promise')
    //   }
    // }
    // getOneQ()
    setStarted(true)
  }, [])

  //declare function to get one set of questions from , then pass as props to Question container:
  const getOneQ = async (quizQuestions) => {
    console.log('getOneQ quizQuestions: ', quizQuestions)
    const results = await getQuestions()
    if (results !== undefined) {
      const soloQuestion = await results[0]
      setActiveQuestion('activeQuestion: ', soloQuestion)
      const newList = quizQuestions.slice(1)
      setQuizQuestions('totalQuestionsLeft: ', newList)
      console.log(activeQuestion)
      setProgress(progress + 1)
    } else {
      console.log('awaiting promise')
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
    } else {
      console.log('nahhh')
    }
    setTimeout(() => {
      setDisabledClass(false)
    }, 1000)
  }

  const totalQuestions = 2

  return (
    <>
      {console.log('quizQuestions: ', quizQuestions)}
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

      {started ? <Question question={quizQuestions} /> : <h2>Loading...</h2>}
    </>
  )
}

export default QuestionsContainer
