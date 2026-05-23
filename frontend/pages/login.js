import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const router = useRouter()

  // Handle Google OAuth callback
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const { token, username: googleUsername, error } = router.query
    
    if (error) {
      setMsg('Google sign-in failed. Please try again or use traditional login.')
      return
    }
    
    if (token) {
      // Store token from Google OAuth callback
      localStorage.setItem('token', token)
      if (googleUsername) localStorage.setItem('username', googleUsername)
      window.dispatchEvent(new Event('authChanged'))
      setMsg('Successfully signed in with Google!')
      setTimeout(() => {
        window.location.href = '/journals'
      }, 500)
    }
  }, [router.query])

  async function submit(e) {
    e.preventDefault()
    const API_BASE = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE ? process.env.NEXT_PUBLIC_API_BASE : 'http://localhost:4000'
    try {
      console.log('Attempting login to API_BASE=', API_BASE)
      const r = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (!r.ok) {
        // Try to parse JSON error body, otherwise fallback to text
        let body
        try { body = await r.json() } catch (e) { body = await r.text().catch(() => '') }
        console.error('Login failed', r.status, body)
        const msgText = body && (body.error || body.message) ? (body.error || body.message) : JSON.stringify(body)
        setMsg('Login failed: ' + (msgText || r.status))
        return
      }

      const j = await r.json()
      if (j.ok && j.token) {
        localStorage.setItem('token', j.token)
        if (j.user && j.user.username) localStorage.setItem('username', j.user.username)
        // notify header and other parts of the app
        window.dispatchEvent(new Event('authChanged'))
        setMsg('Logged in successfully')
        window.location.href = '/journals'
      } else {
        console.error('Login response did not include token', j)
        setMsg(JSON.stringify(j))
      }
    } catch (err) {
      // Network-level error (CORS, DNS, server unreachable, etc.)
      console.error('Network error during login fetch', err)
      setMsg('Network error: ' + (err && err.message ? err.message : String(err)))
      alert('Network error while attempting login. Open the browser console for details.')
    }
  }

  return (
      <div style={{ padding: 20, maxWidth: '400px', margin: '0 auto' }}>
        <h2>Log in</h2>
        <form onSubmit={submit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>Username</label>
            <input 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
          <button 
            type="submit" 
            style={{ width: '100%', padding: '10px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
          >
            Log in
          </button>
        </form>
        
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #eee' }}>
          <div style={{ marginBottom: 12, textAlign: 'center', color: '#666' }}>Or sign in with</div>
          <a
            href={(typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE ? process.env.NEXT_PUBLIC_API_BASE : 'http://localhost:4000') + '/api/auth/google'}
            style={{ 
              display: 'block', 
              padding: '12px', 
              background: '#4285F4', 
              color: '#fff', 
              borderRadius: 4, 
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: 12
            }}
          >
            🔐 Sign in with Google
          </a>
        </div>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <a href="/forgot" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Forgot password?</a>
        </div>

        {msg && (
          <div style={{ marginTop: 16, padding: 12, background: '#f5f5f5', borderRadius: 4, color: '#d32f2f', fontSize: '14px' }}>
            {msg}
          </div>
        )}
      </div>
  )
}

export default dynamic(() => Promise.resolve(Login), { ssr: false })
