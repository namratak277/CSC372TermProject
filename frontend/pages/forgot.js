import { useState } from 'react'

export default function Forgot() {
  const [username, setUsername] = useState('')
  const [msg, setMsg] = useState('')
  const [token, setToken] = useState(null)

  async function submit(e) {
    e.preventDefault()
    setMsg('')
    try {
      const r = await fetch('http://localhost:4000/api/auth/forgot', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })
      const j = await r.json()
      if (j.ok) {
        setMsg('If that username exists, a reset token was generated.')
        if (j.token) setToken(j.token)
      } else {
        setMsg(JSON.stringify(j))
      }
    } catch (err) {
      setMsg('Network error')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Forgot password</h2>
      <form onSubmit={submit}>
        <div>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <button type="submit">Request password reset</button>
      </form>
      <p style={{ marginTop: 12 }}>{msg}</p>
      {token && (
        <div style={{ marginTop: 12 }}>
          <p>Reset token (for local testing):</p>
          <pre style={{ background: '#f0f0f0', padding: 8 }}>{token}</pre>
          <p>You can open the reset page directly: <a href={`/reset/${token}`}>Reset link</a></p>
        </div>
      )}
    </div>
  )
}
