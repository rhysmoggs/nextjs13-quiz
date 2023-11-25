import React, { useState } from 'react'

function AddScore({ score }) {
  const [username, setUsername] = useState('')
  console.log('passed score: ', score)
  return (
    <form>
      <div>
        <label>Username: </label>
        <input type='text' value={username} />
      </div>
      {/* dont really need to add score, as it will be displayed anyway: */}
      <div>
        <label>Score: </label>
        <input type='text' value={score} readonly />
      </div>
      <input type='submit' value='Save Score' />
    </form>
  )
}

export default AddScore
