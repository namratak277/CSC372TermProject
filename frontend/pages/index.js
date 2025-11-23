import Link from 'next/link'

export default function Home() {
  return (
      <div style={{ padding: 20 }}>
        <h1>Daily Diary</h1>
        <p style={{ marginBottom: 18 }}>Welcome — choose an action below to continue.</p>

        <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 320px', minWidth: 260, background: 'rgba(122,75,42,0.06)', padding: 18, borderRadius: 6 }}>
            <h3>Log in</h3>
            <p>Have an account? Log in to view and manage your journal entries.</p>
            <Link href="/login">
              <button style={{ background: '#7a4b2a', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 4, cursor: 'pointer' }}>Log in</button>
            </Link>
          </div>

          <div style={{ flex: '1 1 320px', minWidth: 260, background: 'rgba(122,75,42,0.03)', padding: 18, borderRadius: 6 }}>
            <h3>Sign up</h3>
            <p>New here? Create an account to start journaling and keep your entries private.</p>
            <Link href="/signup">
              <button style={{ background: '#5a3a24', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 4, cursor: 'pointer' }}>Sign up</button>
            </Link>
          </div>
        </div>

      </div>
  )
}
