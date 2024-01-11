import React from 'react'
import getDataFromAPI from '../api/API'
import Score from './Score'

const ScoreContainer = async () => {
  const scoreData = await getDataFromAPI()
  return (
    <div>
      {scoreData.items.map((score) => {
        return <Score key={score.id} {...score} />
      })}
    </div>
  )
}

export default ScoreContainer
