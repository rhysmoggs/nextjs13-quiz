'use client'
import React from 'react'
import styles from '../page.module.css'
import Card from './Card'
// import styles from './styles.css'

const Question = ({ questions, onNext }) => {
  const newQ = questions[0]

  return (
    <>
      <h2>Question: {newQ.question}</h2>
      <div className={styles.grid}>
        {newQ.answers.map((answer, index) => {
          return <Card answer={answer} key={index} onNext={onNext} />
        })}
      </div>
    </>
  )
}

export default Question
