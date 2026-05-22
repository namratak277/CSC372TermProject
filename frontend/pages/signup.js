import { useState } from 'react'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    const API_BASE = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE ? process.env.NEXT_PUBLIC_API_BASE : 'http://localhost:4000'
    try {
      console.log('Attempting signup to API_BASE=', API_BASE)
      const r = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (!r.ok) {
        let body
        try { body = await r.json() } catch (e) { body = await r.text().catch(() => '') }
        console.error('Signup failed', r.status, body)
        const msgText = body && (body.error || body.message) ? (body.error || body.message) : JSON.stringify(body)
        setMsg('Signup failed: ' + (msgText || r.status))
        return
      }

      const j = await r.json()
      if (j.ok && j.token) {
        localStorage.setItem('token', j.token)
        if (j.user && j.user.username) localStorage.setItem('username', j.user.username)
        // notify header and other parts of the app
        window.dispatchEvent(new Event('authChanged'))
        setMsg('Signed up and logged in')
        window.location.href = '/journals'
      } else {
        console.error('Signup response did not include token', j)
        setMsg(JSON.stringify(j))
      }
    } catch (err) {
      console.error('Network error during signup fetch', err)
      setMsg('Network error: ' + (err && err.message ? err.message : String(err)))
      alert('Network error while attempting signup. Open the browser console for details.')
    }
  }

  return (
      <div style={{ padding: 20 }}>
        <h2>Sign up</h2>
        <form onSubmit={submit}>
          <div>
            <label>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Sign up</button>
        </form>
        <pre>{msg}</pre>
      </div>
  )
}
