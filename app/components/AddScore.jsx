import { useState } from 'react'
import styles from '/app/page.module.css'
// import styles from './styles.css'

const AddScore = ({ score, addHighScore }) => {
  const [username, setUsername] = useState('')
  const [submitting, isSubmitting] = useState(false)
  const [hiddenForm, ishiddenForm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    //validate form:
    if (!username) {
      alert('Please enter your username')
      return
    }

    isSubmitting(true)

    addHighScore({ score, username }).then(
      setTimeout(() => {
        //alter Submit button txt
        isSubmitting(false)
        //hide form and display msg
        ishiddenForm(true)
      }, 1500)
    )
    console.log('High Score added!')

    //clear form after user input:
    setUsername('')
  }

  return (
    <div className={styles.formContainer}>
      {!hiddenForm ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.formInputs}>
            <label>Username: </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* dont really need to add score, as it will be displayed anyway: */}
          <div className={styles.formInputs}>
            <label>Score: </label>
            <input type='text' value={score} readOnly />
          </div>
          <input
            type='submit'
            value={!submitting ? 'Save Score' : 'Submitting...'}
          />
        </form>
      ) : (
        <p>Successfully added!</p>
      )}
    </div>
  )
}

export default AddScore
