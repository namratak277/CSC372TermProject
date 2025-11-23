import { useEffect, useState } from 'react'
import JournalEntry from '../../components/JournalEntry'

export default function Journals() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function authHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }
  }

  async function load() {
    try {
      const r = await fetch('http://localhost:4000/api/journals', { headers: authHeaders() })
      if (!r.ok) {
        const err = await r.text().catch(() => '');
        console.error('Failed to fetch journals:', r.status, err)
        alert('Failed to load journals: ' + r.status)
        return
      }
      const j = await r.json()
      setItems(j)
    } catch (err) {
      console.error('Network error while fetching journals:', err)
      alert('Network error while fetching journals. Check that the backend is running and CORS allows requests from this origin.')
    }
  }

  useEffect(() => { load() }, [])

  // Local habit tracker (stored in localStorage). Separate from journal entries.
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState('')

  // Weekday labels (Mon -> Sun)
  const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('habit-tracker') : null
      if (raw) setHabits(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load habits from localStorage', e)
    }
  }, [])

  function persistHabits(next) {
    try {
      localStorage.setItem('habit-tracker', JSON.stringify(next))
    } catch (e) {
      console.error('Failed to save habits to localStorage', e)
    }
  }

  function addHabit() {
    const name = (newHabit || '').trim()
    if (!name) return
    // days: array of 7 booleans, Mon=0 ... Sun=6
    const days = [false, false, false, false, false, false, false]
    const h = { id: Date.now(), name, days }
    const next = [h, ...habits]
    setHabits(next)
    persistHabits(next)
    setNewHabit('')
  }

  function toggleHabitDay(habitId, dayIdx) {
    const next = habits.map(h => {
      if (h.id !== habitId) return h
      const nd = (h.days || [false, false, false, false, false, false, false]).slice()
      nd[dayIdx] = !nd[dayIdx]
      return { ...h, days: nd }
    })
    setHabits(next)
    persistHabits(next)
  }

  return (
      <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Journals</h2>
      </div>
      <div>
        <h3>Create entry</h3>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <br />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <br />
        <button onClick={async () => {
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
          if (!token) {
            alert('You are not logged in. Please login or sign up before creating entries.')
            return
          }
          try {
            const res = await fetch('http://localhost:4000/api/journals', {
              method: 'POST',
              headers: authHeaders(),
              body: JSON.stringify({ title, content })
            })
            if (res.ok) {
              setTitle('')
              setContent('')
              load()
            } else {
              // try to parse JSON error, otherwise show text
              let err
              try { err = await res.json() } catch (e) { err = await res.text().catch(()=>'') }
              alert('Failed to create entry: ' + (err && err.error ? err.error : JSON.stringify(err)))
            }
          } catch (e) {
            console.error('Network error creating journal entry', e)
            alert('Network error creating entry. Is the backend running on http://localhost:4000 ?')
          }
        }}>Create entry</button>
      </div>
      <div className="journals-container" style={{ display: 'flex', gap: 20, marginTop: 18 }}>
        <div className="main" style={{ flex: 1 }}>
          <div className="journal-grid">
            {items.map(i => (
              <JournalEntry
                key={i.id}
                entry={i}
                onEdit={() => { window.location.href = `/journals/${i.id}` }}
                onDelete={async (entry) => {
                  if (!confirm('Delete entry?')) return
                  const res = await fetch(`http://localhost:4000/api/journals/${entry.id}`, { method: 'DELETE', headers: authHeaders() })
                  if (res.ok) load()
                  else alert(JSON.stringify(await res.json()))
                }}
              />
            ))}
          </div>
        </div>

        <aside className="sidebar" style={{ width: 320 }}>
          <div style={{ padding: 12, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 6, background: '#fff' }}>
            <h3 style={{ marginTop: 0 }}>Habit Tracker</h3>
            <p style={{ marginTop: 0, color: '#666', fontSize: 13 }}>Create and toggle your habits here (stored locally).</p>

            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <input value={newHabit} onChange={e => setNewHabit(e.target.value)} placeholder="New habit (e.g. Run)" style={{ flex: 1 }} />
              <button onClick={addHabit} style={{ padding: '6px 8px' }}>Add</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {habits.length === 0 && <div style={{ color: '#777' }}>No habits yet — add one above.</div>}
              {habits.map(h => (
                <div key={h.id} className="habit-item" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.name}</div>
                    </div>
                    <div style={{ fontSize: 12, color: '#666' }}>Weekly</div>
                  </div>
                  <div className="habit-week" style={{ display: 'flex', gap: 8 }}>
                    {WEEK_LABELS.map((lbl, idx) => {
                      const done = !!(h.days && h.days[idx])
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleHabitDay(h.id, idx)}
                          className={`habit-day ${done ? 'done' : 'not-done'}`}
                          title={`${lbl} ${done ? 'completed' : 'mark completed'}`}
                          aria-pressed={done ? 'true' : 'false'}
                          style={{ width: 30, height: 30 }}
                        >
                          {lbl}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      </div>
  )
}
