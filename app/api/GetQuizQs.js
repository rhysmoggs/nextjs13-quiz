//fetch api data:
const GetQuizQs = async () => {
  try {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
    )
    const data = await response.json()
    const questions = await data.results?.map((q) => {
      const question = q.question

      //add
      const correct = { answer: q.correct_answer, rightAnswer: true }
      const incorrect = q.incorrect_answers.map((i) => {
        return i
      })

      const lastIncorrect = incorrect.map((inc) => {
        return { answer: inc, rightAnswer: false }
      })
      const answers = [...lastIncorrect, correct]

      return { question, answers }
    })
    return questions
  } catch (error) {
    console.error('Error: ', error)
  }
}

export default GetQuizQs
