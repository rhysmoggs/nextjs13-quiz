'use client'
import styles from '../page.module.css'
// import styles from './styles.css'

const Card = ({ answer, index, givenAnswer }) => {
  const handleClick = () => {
    console.log('clicked card')
    givenAnswer(answer, index)
  }
  return (
    <a
      key={index}
      href='#'
      onClick={handleClick}
      className={styles.card}
      rel='noopener noreferrer'
    >
      <p>{answer.answer}</p>
    </a>
  )
}

export default Card
