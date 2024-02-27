import { useState } from 'react'
import styles from '/app/scores/page.module.css'
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
    // console.log('High Score added!')

    //clear form after user input:
    setUsername('')
  }

  return (
    <>
      {!hiddenForm ? (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type='text'
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button
            className={styles.btn}
            type='submit'
            value={!submitting ? 'Save Score' : 'Submitting...'}
          >
            Save Score
          </button>
        </form>
      ) : (
        <p>Successfully added!</p>
      )}
    </>
  )
}

export default AddScore
