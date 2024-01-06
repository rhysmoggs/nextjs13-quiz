'use client'
import React from 'react'
import styles from '../page.module.css'
import Card from './Card'

const Question = ({ question, givenAnswer, disabledClass, progress }) => {
  // console.log('question inside question: ', question)
  return (
    <>
      {
        <div>
          {question?.map((question) => {
            // console.log('mapped q: ', question.question)
            // console.log('mapped q: ', question.answers)
            return (
              <>
                <h1>{question.question}</h1>
                <div>
                  {question.answers.map((answer) => {
                    return (
                      <ul>
                        <li>{answer}</li>
                      </ul>
                    )
                  })}
                </div>
              </>
            )
          })}
        </div>
      }
      {/* <h2>{question.question}</h2>
      <div className={styles.grid}>
        {question?.answers?.map((answer, index) => (
          <Card
            answer={answer}
            key={index}
            givenAnswer={givenAnswer}
            disabled={disabledClass}
            progress={progress}
          />
        ))}
      </div> */}
      {/* {JSON.parse(question)} */}
      {/* {console.log('Question Container', question)} */}
    </>
  )
}

export default Question
