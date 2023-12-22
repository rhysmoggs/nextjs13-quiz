import React from 'react'
import styles from '../page.module.css'
import Card from './Card'

const Question = ({ questions }) => {
  const oneQ = questions[0]
  return (
    <>
      {/* {questions?.map((question) => {
        console.log('mapped Q: ', question)
      })} */}
      {oneQ?.map((question) => {
        return (
          <>
            <h2>{question}</h2>
            <div className={styles.grid}>
              {question.answers.map((answer, index) => {
                return <Card answer={answer} key={index} />
              })}
            </div>
          </>
        )
      })}

      {/* <h2>Question: {newQ?.question}</h2>
      <div className={styles.grid}>
        {newQ?.answers.map((answer, index) => {
          return <Card answer={answer} key={index} />
        })}
      </div> */}
      {console.log('Question Container', questions)}
    </>
  )
}

export default Question
