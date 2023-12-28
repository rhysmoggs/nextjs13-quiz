import React from 'react'
import styles from '../page.module.css'
import Card from './Card'

const Question = ({ question }) => {
  return (
    <>
      <h2>{question.question}</h2>
      {/* <h2>Question: {newQ?.question}</h2>
      <div className={styles.grid}>
        {newQ?.answers.map((answer, index) => {
          return <Card answer={answer} key={index} />
        })}
      </div> */}
      {console.log('Question Container', question.question)}
    </>
  )
}

export default Question
