import React from 'react'
import ScoreContainer from '../components/ScoreContainer'
import Link from 'next/link'
import styles from '../page.module.css'

function page() {
  console.log('hello')
  return (
    <div>
      <h1>High Score: </h1>
      <ScoreContainer />
      <Link href='/' className={styles.btnLink}>
        Home
      </Link>
    </div>
  )
}

export default page
