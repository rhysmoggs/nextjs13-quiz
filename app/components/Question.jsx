import React from 'react'
import styles from '../page.module.css'
import Card from './Card'
// import styles from './styles.css'

const Question = ({ ...question }) => {
  // console.log('Score component score = ', score)
  console.log('question: ', question)
  console.log('question.question: ', question.question)
  console.log('question.answers : ', question.answers)
  return (
    <div className={styles.btn}>
      <h2>Question: {question.question}</h2>
      <div>
        {question.answers.map((answer, index) => {
          return <Card answer={answer} key={index} />
        })}
      </div>
    </div>
  )
}

export default Question
