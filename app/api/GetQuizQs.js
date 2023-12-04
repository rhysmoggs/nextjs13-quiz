//fetch api data:
const GetQuizQs = async () => {
  try {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
    )
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Error: ', error)
  }
}

export default GetQuizQs
