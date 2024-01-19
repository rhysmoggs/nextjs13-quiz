import styles from '../page.module.css'
import Logo from '../components/Logo'

function Contact() {
  return (
    <main>
      <Logo />
      <div className={styles.gameArea}>
        <div className={styles.container}>
          <h1>Contact Form & Info:</h1>
        </div>
      </div>
    </main>
  )
}

export default Contact
