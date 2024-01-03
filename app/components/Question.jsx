'use client'
import React from 'react'
import styles from '../page.module.css'
import Card from './Card copy'

const Question = ({ question }) => {
  // console.log('question inside question: ', question)
  return (
    <>
      <h2>Question: {question.question}</h2>
      <div className={styles.grid}>
        {question.answers.map((answer, index) => {
          return <Card answer={answer} key={index} />
        })}
      </div>
      {/* {JSON.parse(question)} */}
      {/* {console.log('Question Container', question)} */}
    </>
  )
}

export default Question
