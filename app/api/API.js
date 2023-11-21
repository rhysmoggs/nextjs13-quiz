//server side

import getEnvironment from 'app/getEnvironment.config.js'

const getDataFromAPI = async () => {
  //function to fetch scores:
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
  // console.log('res: ', res)
  const data = await res.json()
  // Serialization: need to stringify data to be able to use server side data on client-side??
  // JSON.stringify(data)

  // console.log('data: ', data)
  return data
}

export default getDataFromAPI
