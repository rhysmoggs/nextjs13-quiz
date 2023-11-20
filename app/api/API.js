//server side

require('dotenv').config()

// function chooseEnv() {
//   if ((process.env.DEVELOPMENT = 'True')) {
//     const url = process.env.NEXT_PUBLIC_POCKETBASE_URL
//     return url
//   }
//   console.log('URL IS: ', url)
//   //need to return url here:
// }

const devURL = process.env.NEXT_PUBLIC_POCKETBASE_URL
const prodURL = process.env.POCKETBASE_URL

const URL = process.env.NODE_ENV === 'development' ? devURL : prodURL

const getDataFromAPI = async () => {
  //function to fetch scores:
  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/collections/quiz/records?page=1&perPage=30`,
    `${URL}/api/collections/quiz/records?page=1&perPage=30`,
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
