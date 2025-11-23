import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Header() {
  const [username, setUsername] = useState(null)
  const router = useRouter()

  // Fetch current user from server when needed
  async function fetchMe(token) {
    try {
      const r = await fetch('http://localhost:4000/api/auth/me', {
        headers: { Authorization: 'Bearer ' + token }
      })
      if (r.ok) {
        const j = await r.json()
        const uname = (j && j.user && j.user.username) || j.username || null
        if (uname) {
          setUsername(uname)
          localStorage.setItem('username', uname)
          return
        }
      }
      // invalid token or no user
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      setUsername(null)
    } catch (err) {
      console.error('fetch /me failed', err)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    function updateFromStorage() {
      const uname = localStorage.getItem('username')
      const token = localStorage.getItem('token')
      if (uname) {
        setUsername(uname)
      } else if (token) {
        fetchMe(token)
      } else {
        setUsername(null)
      }
    }

    // Initial check
    updateFromStorage()

    // Listen for auth changes dispatched within the same window
    const onAuthChanged = () => updateFromStorage()
    window.addEventListener('authChanged', onAuthChanged)

    // Also listen for storage events from other tabs/windows
    const onStorage = (e) => {
      if (e.key === 'token' || e.key === 'username') updateFromStorage()
    }
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('authChanged', onAuthChanged)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  function logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      // notify other parts of the app
      window.dispatchEvent(new Event('authChanged'))
      router.push('/')
    }
  }

  return (
    <header style={{ padding: 12, borderBottom: '1px solid #ddd', marginBottom: 12 }}>
      <Link href="/"><strong>Daily Diary</strong></Link>
      <span style={{ float: 'right' }}>
        {username ? (
          <>
            <span style={{ marginRight: 12 }}>Hi, {username}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          // If we're on the homepage, don't show login/signup here because
          // the page itself provides those controls. Also hide the login link
          // when we're already on the login page.
          router.pathname === '/' ? null : (
            <>
              {router.pathname !== '/login' && (
                <Link href="/login" className="button-like">Log in</Link>
              )}
              <Link href="/signup" className="button-like">Sign up</Link>
            </>
          )
        )}
      </span>
    </header>
  )
}
