import { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

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
        setMsg('Logged in')
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
      <div style={{ padding: 20 }}>
        <h2>Log in</h2>
        <form onSubmit={submit}>
          <div>
            <label>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Log in</button>
        </form>
        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 8 }}>Or</div>
          {/* Google OAuth start - opens backend endpoint which will redirect back with a token */}
          <a
            href={(typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE ? process.env.NEXT_PUBLIC_API_BASE : 'http://localhost:4000') + '/api/auth/google'}
            style={{ display: 'inline-block', padding: '8px 12px', background: 'var(--accent)', color: '#fff', borderRadius: 4, textDecoration: 'none' }}
          >
            Continue with Google
          </a>
        </div>
        <div style={{ marginTop: 12 }}>
          <a href="/forgot">Forgot password?</a>
        </div>
        <pre>{msg}</pre>
      </div>
  )
}
