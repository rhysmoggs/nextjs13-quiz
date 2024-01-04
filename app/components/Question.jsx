'use client'
import React from 'react'
import styles from '../page.module.css'
import Card from './Card'

const Question = ({ question, givenAnswer }) => {
  // console.log('question inside question: ', question)
  return (
    <>
      <h2>{question.question}</h2>
      <div className={styles.grid}>
        {question?.answers?.map((answer, index) => (
          <Card answer={answer} key={index} givenAnswer={givenAnswer} />
        ))}
      </div>
      {/* {JSON.parse(question)} */}
      {/* {console.log('Question Container', question)} */}
    </>
  )
}

export default Question
