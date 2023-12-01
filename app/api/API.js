//server side
import getEnvironment from 'app/getEnvironment.config.js'

const getDataFromAPI = async () => {
  //function to fetch scores:
  try {
    const res = await fetch(
      `${getEnvironment.currentEnvironment}/api/collections/quiz/records?page=1&perPage=30`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    )
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error: ', error)
  }
}

export default getDataFromAPI
