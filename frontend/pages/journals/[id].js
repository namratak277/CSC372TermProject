import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function EditJournal() {
  const router = useRouter()
  const { id } = router.query
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const [habitCompleted, setHabitCompleted] = useState(false)

  function authHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }
  }

  useEffect(() => {
    if (!id) return
    async function load() {
      try {
        const r = await fetch(`http://localhost:4000/api/journals/${id}`, { headers: authHeaders() })
        if (!r.ok) {
          setMsg('Failed to load entry: ' + r.status)
          setLoading(false)
          return
        }
        const j = await r.json()
        setTitle(j.title || '')
        setContent(j.content || '')
        setCreatedAt(j.created_at || '')
        setHabitCompleted(!!j.habit_completed)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setMsg('Network error')
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function save(e) {
    e.preventDefault()
    try {
      const r = await fetch(`http://localhost:4000/api/journals/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ title, content })
      })
      if (!r.ok) {
        const err = await r.json().catch(() => ({}))
        setMsg('Save failed: ' + (err.error || r.status))
        return
      }
      // On success, backend returns updated entry (with updated created_at)
      const updated = await r.json()
      // redirect back to list
      router.push('/journals')
    } catch (err) {
      console.error(err)
      setMsg('Network error')
    }
  }

  async function toggleHabit() {
    try {
      const r = await fetch(`http://localhost:4000/api/journals/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ habit_completed: !habitCompleted })
      })
      if (!r.ok) {
        const err = await r.json().catch(() => ({}))
        setMsg('Toggle failed: ' + (err.error || r.status))
        return
      }
      const u = await r.json()
      setHabitCompleted(!!u.habit_completed)
    } catch (err) {
      console.error(err)
      setMsg('Network error')
    }
  }

  if (loading) return <div style={{ padding: 20 }}>Loading…</div>

  return (
      <div style={{ padding: 20 }}>
      <h2>Edit Entry</h2>
      <form onSubmit={save}>
        <div>
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} />
        </div>
        <div className="meta">Created: {createdAt ? new Date(createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={toggleHabit}
            className={`habit-toggle ${habitCompleted ? 'done' : 'not-done'}`}
            title={habitCompleted ? 'Habit completed' : 'Mark habit completed'}
            aria-pressed={habitCompleted ? 'true' : 'false'}
          />
          <div style={{ fontSize: 14, color: habitCompleted ? '#28a745' : '#333' }}>{habitCompleted ? 'Completed' : 'Mark done'}</div>
        </div>
        <br />
        <button type="submit">Save</button>
      </form>
      <pre>{msg}</pre>
      </div>
  )
}
