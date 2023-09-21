import React, { useEffect, useState } from 'react'
import styles from 'app/page.module.css'

const Card = ({ disabled, answer, index, givenAnswer, progress }) => {
  const [selected, setSelected] = useState(false)

  const handleClick = () => {
    setSelected(true)
    givenAnswer(answer, index)
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

      onClick={handleClick}
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
