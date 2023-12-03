import Card from './Card'
import GetQuizQs from '../api/GetQuizQs'

const GameContainer = async () => {
  const runQuiz = await GetQuizQs()
  console.log('runQuiz clg: ', runQuiz)
  return (
    <>
      {runQuiz.answers.map((answer, index) => (
        <Card
          disabled={disabledClass}
          answer={answer}
          key={index}
          givenAnswer={givenAnswer}
          progress={progress}
        />
      ))}
    </>
  )
}

export default GameContainer
