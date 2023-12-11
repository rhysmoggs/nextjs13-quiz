import React from 'react'
import getDataFromAPI from '../api/API'
import Score from './Score'

const ScoreContainer = async () => {
  const scoreData = await getDataFromAPI()
  // console.log('scoreData: ', scoreData)
  return (
    <div>
      {/* <h1>List of High Scores:</h1> */}
      {/* {scoreData ? <p>{JSON.stringify(scoreData)}</p> : <p>Loading...</p>} */}

      {scoreData.items.map((score) => {
        // const userData = {
        //   id: score.id,
        //   username: score.username,
        //   score: score.score,
        //   created: score.created,
        //   updated: score.updated,
        // }
        // console.log('USER DATA: ', score)
        // console.log('score: ', score.score)
        // return { userData }
        // console.log('Score spread : ', { ...score })
        return <Score key={score.id} {...score} />
      })}
    </div>
  )
}

export default ScoreContainer
