import React, { useEffect, useState } from 'react'
import styles from 'app/page.module.css'

const Card = ({ answers, index, givenAnswer, progress }) => {
  const [selected, setSelected] = useState(false)

  console.log(answers)
  console.log(index)
  console.log('mapped answer: ', answers.rightAnswer)

  const handleClick = () => {
    setSelected(true)
    givenAnswer(answers, index)
  }

  useEffect(() => {
    setSelected(false)
  }, [progress])

  return (
    <a
      key={index}
      // disable={selected}
      href='#'
      // onClick={() => givenAnswer(q.rightAnswer)}
      // className={
      //   q.rightAnswer === true ? cardCorrect : cardIncorrect
      // }
      onClick={handleClick}
      className={`${styles.card} ${
        answers.rightAnswer && selected && styles.cardCorrect
      } : ${!answers.rightAnswer && selected && styles.cardIncorrect}`}
      rel='noopener noreferrer'
    >
      <p>{answers.answer}</p>
    </a>
  )
}

export default Card
