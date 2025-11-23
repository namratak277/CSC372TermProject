import { useState } from 'react'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    const r = await fetch('http://localhost:4000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const j = await r.json()
    if (j.ok && j.token) {
      localStorage.setItem('token', j.token)
      if (j.user && j.user.username) localStorage.setItem('username', j.user.username)
      // notify header and other parts of the app
      window.dispatchEvent(new Event('authChanged'))
      setMsg('Signed up and logged in')
      window.location.href = '/journals'
    } else {
      setMsg(JSON.stringify(j))
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
