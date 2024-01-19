import styles from './page.module.css'
import Link from 'next/link'

import Logo from './components/Logo'

require('dotenv').config()

export default function Home() {
  return (
    <main>
      <Logo />

      <div className={styles.gameArea}>
        <div className={styles.container}>
          <Link href='/game' className={styles.btn}>
            Start
          </Link>
          <Link href='/howtoplay' className={styles.btn}>
            How to Play
          </Link>
          <Link href='/contact' className={styles.btn}>
            Contact
          </Link>
          <Link href='/scores' className={styles.btn}>
            High Scores
          </Link>
        </div>
      </div>
    </main>
  )
}
