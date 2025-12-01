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
  // On initial load capture `token` and `username` from query params
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const url = new URL(window.location.href)
      const token = url.searchParams.get('token')
      const username = url.searchParams.get('username')
      if (token) {
        localStorage.setItem('token', token)
        if (username) localStorage.setItem('username', username)
        // notify app that auth changed
        window.dispatchEvent(new Event('authChanged'))
        // remove token from URL to avoid leaking it in browser history
        url.searchParams.delete('token')
        url.searchParams.delete('username')
        const clean = url.pathname + (url.search ? ('?' + url.searchParams.toString()) : '') + url.hash
        window.history.replaceState({}, document.title, clean)
      }
    } catch (err) {
      // ignore
    }
  }, [])

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
