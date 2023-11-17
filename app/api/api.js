import ScoreCard from '../components/ScoreCard'

const getHighScores = async () => {
  //function to fetch scores:
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/collections/quiz/records?page=1&perPage=30`,
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
  console.log('data: ', data)

  const allData = await data.items
  console.log('allData clg: ', allData)
  return allData
}

const sortData = async () => {
  const scoreData = await getHighScores()
  return (
    <div>
      <h1>List of High Scores:</h1>
      {/* {scoreData ? <p>{JSON.stringify(scoreData)}</p> : <p>Loading...</p>} */}

      {scoreData.map((score) => {
        const userData = {
          id: score.id,
          username: score.username,
          score: score.score,
          created: score.created,
          updated: score.updated,
        }
        console.log('USER DATA:', userData)
        // return { userData }
        return <ScoreCard score={score.score} />
      })}
    </div>
  )
}

export default sortData
