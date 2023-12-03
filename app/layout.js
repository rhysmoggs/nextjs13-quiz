import { Inter } from 'next/font/google'
import './styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Globe Trotter Quiz',
  description: 'Multiple-choicegeography quiz',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
