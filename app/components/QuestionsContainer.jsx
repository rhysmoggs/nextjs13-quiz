import GetQuizQs from '../api/GetQuizQs'

const QuestionsContainer = async () => {
  //fetch api data:
  const results = await GetQuizQs()

  const questions = results.map((q) => {
    const question = q.question

    //add
    const correct = { answer: q.correct_answer, rightAnswer: true }
    const incorrect = q.incorrect_answers.map((i) => {
      return i
    })

    const lastIncorrect = incorrect.map((inc) => {
      return { answer: inc, rightAnswer: false }
    })
    // console.log(lastCorrect)
    const answers = [...lastIncorrect, correct]

    //randomize order of answers:
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex

      // While there remain elements to shuffle.
      while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ]
      }

      return array
    }
    shuffle(answers)

    return { question, answers }
  })
  console.log(questions.question)

  return (
    <div>
      {questions.map((question) => console.log(question))}
      {questions.map((question, id) => {
        return <ul key={id}>Question: {question.question}</ul>
      })}
      {questions.answers}
    </div>
  )
}

export default QuestionsContainer
