'use client'
import { useEffect, useState } from 'react'
import styles from '../page.module.css'
// import styles from './styles.css'

const Card = ({ answer, index, givenAnswer, disabled, progress }) => {
  const [selected, setSelected] = useState(false)
  const handleClick = () => {
    console.log('clicked card')
    givenAnswer(answer, index)
  }

  useEffect(() => {
    setSelected(false)
  }, [progress])
  return (
    <a
      key={index}
      href='#'
      onClick={handleClick}
      // className={styles.card}
      className={`${styles.card} ${disabled && styles.disabled} ${
        answer.rightAnswer && selected && styles.cardCorrect
      } : ${!answer.rightAnswer && selected && styles.cardIncorrect}`}
      rel='noopener noreferrer'
    >
      <p>{answer.answer}</p>
    </a>
  )
}

export default Card
