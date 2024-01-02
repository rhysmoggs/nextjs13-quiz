import React from 'react'
import styles from '../page.module.css'

const Question = ({ question }) => {
  console.log('question inside question: ', question)

  return (
    <>
      {/* <h2>Question: {question}</h2> */}
      {JSON.stringify(question)}
      {console.log('Question Container', question)}
    </>
  )
}

export default Question
