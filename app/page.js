'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'
import Card from './components/Card'
import Link from 'next/link'
import pb from 'lib/pocketbase.js'

export default function Home() {
  const [questions, setQuestions] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(null)
  const [started, setStarted] = useState(false)
  const [endGame, setEndGame] = useState(false)
  //set state for answer
  const [disabledClass, setDisabledClass] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  // trial this:
  const [getData, setGetData] = useState(null)

  //too much state? reduce or collate more into one state.

  //clean up functions and seperate into componenets or pages once tested:

  //trialing fetching all data from pocketbase:
  async function getScores() {
    const records = await pb.collection('quiz').getFullList({
      sort: '-created',
      requestKey: null,
    })

    return records
  }

  const HighScores = async () => {
    const data = await getScores()
    // console.log(data)
    // //return each score:
    // const scores = await data.map((scores) => {
    //   console.log(scores)
    // })
    setHighScore(data)
    setIsToggled(!isToggled)
  }

  // example create data
  const data = {
    username: 'test',
    score: 123,
  }

  //trialing creating new record to pocketbase db:
  async function newHighScore() {
    const record = pb.collection('quiz').create(data)
    return record
  }

  const dev = process.env.POCKETBASE_URL
  console.log(dev)

  //check API response:
  async function getTestScore() {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log('test result:' + req)

    return fetch(
      // 'https://globe-trotter-quiz.pockethost.io/api/collections/quiz/records'
      process.env.POCKETBASE_URL + '/api/collections/quiz/records'
      // 'http://127.0.0.1:8090/api/collections/quiz/records'
    )
      .then((res) => res.json())
      .then((data) =>
        // data.items.map((item) => console.log('items array: ', item))
        // data.items.map((item) => item.score)
        // data.items.map((item) => {
        //   return <p>{item.score}</p>
        // })
        // console.log(data)
        // console.log(data.items)
        mapGetData(data.items)
      )
      .catch((err) => console.log(err, 'stuff went wrong'))
  }

  function mapGetData(items) {
    const listedGetData = items.map((item) => {
      return item.score
    })
    console.log(listedGetData)
    setGetData(listedGetData)
  }

  //fetch api data:
  const getQuizAPI = async () => {
    setLoading(true)
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
    )
    const data = await response.json()
    const results = data.results

    const questions = results.map((q) => {
      const question = q.question

      //add
      const correct = { answer: q.correct_answer, rightAnswer: true }
      const incorrect = q.incorrect_answers.map((i) => {
        // return { incorrect_answers: i, rightAnswer: 'false' }
        return i
      })

      const lastIncorrect = incorrect.map((inc) => {
        return { answer: inc, rightAnswer: false }
      })
      // console.log(lastCorrect)
      const answers = [...lastIncorrect, correct]

      //randomize order of answers:
      function shuffle(array) {
        let currentIndex = array.length,
          randomIndex

        // While there remain elements to shuffle.
        while (currentIndex > 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex--

          // And swap it with the current element.
          ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ]
        }

        return array
      }
      shuffle(answers)

      return { question, answers }
    })

    setLoading(false)

    setQuestions(questions)
    newQuestion(questions)
    setScore(0)
    setStarted(true)
    //can improve this by toggling? if started is true then end is false?
    setEndGame(false)
    // console.log(questions)
  }

  // generate new question:
  const newQuestion = (questions) => {
    if (progress === totalQuestions) {
      //reset score, progress and questions to 0/null:
      setQuestions([])
      setProgress(0)
      // setScore(0)
      // console.log('end game')
      //run end game function:

      //switch Start Game button txt to Restart:
      setEndGame(true)
      //hide question quiz area:
      setStarted(false)
    } else {
      //reset answer state:

      //take first question set:
      const newQ = questions[0]
      setActiveQuestion(newQ)
      //remove question from set of questions:
      const newList = questions.slice(1)
      // update:
      setQuestions(newList)
      setProgress(progress + 1)
    }
  }

  // check if selected answer is correct or not:
  const givenAnswer = (answer) => {
    setDisabledClass(true)
    // console.log('answer passed is: ', answer)
    // console.log('answer passed is: ', answer.rightAnswer)
    // console.log('answer options are: ', activeQuestion['answers'])
    const defoCorrect = activeQuestion['answers'].find(
      (item) => item.rightAnswer === true
    )
    // console.log('defoCorrect is: ', defoCorrect)
    // console.log('actual correct answer is: ', defoCorrect.rightAnswer)

    // console.log('user selected answer was: ', answer)

    if (answer.rightAnswer === defoCorrect.rightAnswer) {
      // console.log('yeeee buddy!')

      setScore(score + 1)
    } else {
      // console.log('nahhh')
      //write logic for wrong answer or visual UX?
    }
    setTimeout(() => {
      newQuestion(questions)
      setDisabledClass(false)
    }, 1000)
  }

  const totalQuestions = 2

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <h1 className={styles.heading}>
            <a href='#' rel='noopener noreferrer'>
              <Image
                src='/logo.png'
                alt='Globe Trotters Logo'
                className={styles.globeLogo}
                width={220}
                height={220}
                priority
              />
            </a>
            <span className={styles.span}>Globe Trotter Quiz</span>
          </h1>
        </div>
      </div>

      {/* <div>
        <button onClick={HighScores} className={styles.btn}>
          {!endGame ? 'Show Score' : 'Hide Score'}
        </button>
        <h1>High Scores</h1>
        <p>{JSON.stringify(scores)}</p>
      </div> */}
      <div>
        <button onClick={HighScores} className={styles.btn}>
          Show HighScore
          {/* {isToggled ? <p>{JSON.stringify(highScore)}</p> : ''} */}
          {isToggled ? (
            <>
              {highScore?.map((score) => {
                return (
                  <>
                    <p>id: {score.id}</p>
                    <p>Username: {score.username}</p>
                    <p>Score: {score.score}</p>
                  </>
                )
              })}
            </>
          ) : (
            ''
          )}
        </button>
      </div>
      <div>
        <button onClick={newHighScore} className={styles.btn}>
          Add new High Score
        </button>
      </div>
      <div>
        <button onClick={getTestScore} className={styles.btn}>
          Show GET req Score:
          {getData?.map((score) => {
            return (
              <>
                <p>{score}</p>
              </>
            )
          })}
        </button>
      </div>

      <div className={styles.center}>
        {endGame && (
          <div>
            <h3>Congratulations!</h3>
            <h2>Score {score}</h2>
            <Link href='/scores' className={styles.btnLink}>
              High Scores
            </Link>
            {/* //add name form to save to highscore board: */}
            {/* //save button for name input: */}
          </div>
        )}
        {loading && <p>Loading...</p>}
        {/* if the game has started then show questions */}
        {started ? (
          <div>
            <h2>
              Progress Bar: {progress} / {totalQuestions}
            </h2>
            <h2>Score {score}</h2>
            <h2>{activeQuestion && activeQuestion.question}</h2>
            <div className={styles.grid}>
              {activeQuestion &&
                activeQuestion.answers.map((answer, index) => (
                  <Card
                    disabled={disabledClass}
                    answer={answer}
                    key={index}
                    givenAnswer={givenAnswer}
                    progress={progress}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className={styles.menuContainer}>
            <button onClick={getQuizAPI} className={styles.btn}>
              {!endGame ? 'Start Game' : 'Restart'}
            </button>
            {!endGame && (
              <>
                <Link href='/' className={styles.btn}>
                  How to Play
                </Link>
                <Link href='/' className={styles.btn}>
                  Contact
                </Link>
                <Link href='/scores' className={styles.btn}>
                  High Scores
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
