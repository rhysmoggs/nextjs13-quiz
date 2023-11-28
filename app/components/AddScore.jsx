import React, { useState } from 'react'

const AddScore = ({ score, addHighScore }) => {
  const [username, setUsername] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    //validate form:
    if (!username) {
      alert('Please enter your username')
      return
    }

    addHighScore({ score, username })
    console.log('High Score added!')

    //clear form after user input:
    setUsername('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username: </label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {/* dont really need to add score, as it will be displayed anyway: */}
      <div>
        <label>Score: </label>
        <input type='text' value={score} readOnly />
      </div>
      <input type='submit' value='Save Score' />
    </form>
  )
}

export default AddScore
