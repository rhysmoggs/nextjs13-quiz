//server side

require('dotenv').config()

const getDataFromAPI = async () => {
  //function to fetch scores:
  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/collections/quiz/records?page=1&perPage=30`,
    `${process.env.POCKETBASE_URL}/api/collections/quiz/records?page=1&perPage=30`,
    // process.env.NEXT_PUBLIC_POCKETBASE_URL +
    //   '/api/collections/quiz/records?page=1&perPage=30',
    // { cache: 'no-store' }
    // 'http://127.0.0.1:8090/api/collections/quiz/records?page=1&perPage=30',
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

  console.log('data: ', data)
  return data
}

export default getDataFromAPI
