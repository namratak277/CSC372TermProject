import { useEffect } from 'react'

export default function Logout() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      window.dispatchEvent(new Event('authChanged'))
      window.location.href = '/'
    }
  }, [])

  return (
      <div style={{ padding: 20 }}>Logging out…</div>
  )
}
