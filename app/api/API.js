//server side

import getEnvironment from 'app/getEnvironment.config.js'

const getDataFromAPI = async () => {
  //function to fetch scores:
  try {
    const res = await fetch(
      `${getEnvironment.currentEnvironment}/api/collections/quiz/records?page=1&perPage=30`,
      {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await res.json()
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export default getDataFromAPI
