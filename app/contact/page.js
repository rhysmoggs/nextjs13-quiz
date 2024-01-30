import styles from '../page.module.css'
import Logo from '../components/Logo'
import {
  FaXTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaCopyright,
} from 'react-icons/fa6'

function Contact() {
  return (
    <main>
      <Logo />
      <div className={styles.gameArea}>
        <div className={styles.container}>
          <h1>Contact Form & Info:</h1>
          <div>
            <ul className={styles.contactList}>
              <li>
                <a
                  href='https://twitter.com/'
                  target='_blank'
                  rel='noopener'
                  aria-label='link to quiz twitter website (opens in new tab)'
                >
                  <FaXTwitter />
                </a>
              </li>
              <li>
                <a
                  href='https://www.youtube.com/'
                  target='_blank'
                  rel='noopener'
                  aria-label='link to quiz youtube website (opens in new tab)'
                >
                  <FaYoutube />
                </a>
              </li>
              <li>
                <a
                  href='https://www.instagram.com/'
                  target='_blank'
                  rel='noopener'
                  aria-label='link to quiz instagram website (opens in new tab)'
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/rhysmoggs'
                  target='_blank'
                  rel='noopener'
                  aria-label='link to personal gitHub profile (opens in new tab)'
                >
                  <FaGithub />
                </a>
              </li>

              <li>
                <a
                  href='https://www.linkedin.com/in/rhysmoggs/'
                  target='_blank'
                  rel='noopener'
                  aria-label='link to personal linkedin profile (opens in new tab)'
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
            <p>
              copyright <FaCopyright /> rhysmoggs 2024
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact
