import React from 'react'

const page = () => {
  //function to fetch scores:
  const getScores = async () => {
    const res = await fetch(
      // `${process.env.POCKETBASE_URL}/api/collections/quiz/records?page=1&perPage=30`,
      // { cache: 'no-store' }
      // process.env.POCKETBASE_URL +
      //   '/api/collections/quiz/records?page=1&perPage=30',
      // { cache: 'no-store' }
      'http://127.0.0.1:8090/api/collections/quiz/records?page=1&perPage=30',
      {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    console.log('res: ', res)
    const data = await res.json()
    console.log('data: ', data)

    const allData = await data.items
    // console.log(allData)
    return allData
  }

  getScores()

  // const displayScores = async () => {
  //   const res = await getScores()
  //   console.log(res)
  // }
  // displayScores()

  //instead of returning this, just export current code as components and create new Page, then import and <Score /> it.
  return <div>Hello</div>
}

export default page
