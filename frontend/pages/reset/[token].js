import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function ResetPage() {
  const router = useRouter()
  const { token } = router.query
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!token) return
    setMsg('')
  }, [token])

  async function submit(e) {
    e.preventDefault()
    setMsg('')
    try {
      const r = await fetch('http://localhost:4000/api/auth/reset', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      })
      const j = await r.json()
      if (j.ok) {
        setMsg('Password reset. You can now log in with your new password.')
        setTimeout(() => router.push('/login'), 1500)
      } else {
        setMsg(JSON.stringify(j))
      }
    } catch (err) {
      setMsg('Network error')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Reset password</h2>
      <form onSubmit={submit}>
        <div>
          <label>New password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Set new password</button>
      </form>
      <p style={{ marginTop: 12 }}>{msg}</p>
    </div>
  )
}
