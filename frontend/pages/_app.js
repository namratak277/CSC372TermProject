import '../styles/styles.css'
import { useEffect } from 'react'
import Header from '../components/Header'

function AppLayout({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') document.body.classList.add('journal-theme')
    return () => {
      if (typeof window !== 'undefined') document.body.classList.remove('journal-theme')
    }
  }, [])

  return (
    <>
      <Header />
      <div className="notebook">
        {children}
      </div>
    </>
  )
}

export default function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
