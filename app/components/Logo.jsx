import Image from 'next/image'
import styles from '../page.module.css'
import Link from 'next/link'

const Logo = () => {
  return (
    <div className={styles.logoArea}>
      <h1 className={styles.logoHeading}>
        <Link href='/'>
          <>
            <Image
              src='/logo.png'
              alt='Globe Trotters Logo'
              className={styles.logoGlobe}
              width={220}
              height={220}
              priority
            />
          </>
        </Link>
        <span className={styles.span}>Globe Trotter Quiz</span>
      </h1>
    </div>
  )
}

export default Logo
