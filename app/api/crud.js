import getEnvironment from '../getEnvironment.config.js'

export function addScoreFunction(data) {
  //function to fetch scores:
  try {
    const response = fetch(
      `${getEnvironment.currentEnvironment}/api/collections/quiz/records`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const result = response.json()
    return result
  } catch (error) {
    console.error('Error: ', error)
  }
}
