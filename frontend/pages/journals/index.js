import { useEffect, useState } from 'react'
import JournalEntry from '../../components/JournalEntry'
import Quote from '../../components/Quote'

export default function Journals() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const API_BASE = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE ? process.env.NEXT_PUBLIC_API_BASE : 'http://localhost:4000'

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
    async function loadHabits() {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
        const nsKey = `habit-tracker:${username || 'anon'}`

        if (token) {
          // Load habits from backend for authenticated users
          try {
            const r = await fetch(`${API_BASE}/api/habits`, { headers: authHeaders() })
            if (r.ok) {
              const serverHabits = await r.json()
              // normalize to include days array for UI (defaults to all false)
              const normalized = serverHabits.map(h => ({ id: h.id, name: h.name, days: [false, false, false, false, false, false, false] }))
              setHabits(normalized)
              // also persist a local cache per-user so toggles survive reloads
              try { localStorage.setItem(nsKey, JSON.stringify(normalized)) } catch (e) {}
              return
            } else if (r.status === 401 || r.status === 403) {
              console.warn('Not authenticated to load habits from backend; falling back to local storage')
            }
          } catch (e) {
            console.warn('Failed to reach backend for habits; falling back to local storage', e)
          }
        }

        // localStorage fallback (namespaced per username)
        try {
          const raw = typeof window !== 'undefined' ? localStorage.getItem(nsKey) : null
          if (raw) setHabits(JSON.parse(raw))
        } catch (e) {
          console.error('Failed to load habits from localStorage', e)
        }
      } catch (e) {
        console.error('Unexpected error loading habits', e)
      }
    }
    loadHabits()
  }, [])

  function persistHabits(next) {
    try {
      const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
      const nsKey = `habit-tracker:${username || 'anon'}`
      localStorage.setItem(nsKey, JSON.stringify(next))
    } catch (e) {
      console.error('Failed to save habits to localStorage', e)
    }
  }

  function addHabit() {
    const name = (newHabit || '').trim()
    if (!name) return
    // days: array of 7 booleans, Mon=0 ... Sun=6
    const days = [false, false, false, false, false, false, false]
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      // create on backend and refresh list
      fetch(`${API_BASE}/api/habits`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ name }) })
        .then(r => r.ok ? r.json() : Promise.reject(r))
        .then(() => {
          // reload from server
          fetch(`${API_BASE}/api/habits`, { headers: authHeaders() }).then(async r => {
            if (r.ok) {
              const serverHabits = await r.json()
              const normalized = serverHabits.map(h => ({ id: h.id, name: h.name, days }))
              setHabits(normalized)
              persistHabits(normalized)
            }
          }).catch(e => console.warn('Failed to reload habits after create', e))
        }).catch(async err => {
          console.warn('Failed to create habit on backend, saving locally', err)
          // fall back to local
          const h = { id: Date.now(), name, days }
          const next = [h, ...habits]
          setHabits(next)
          persistHabits(next)
        })
    } else {
      const h = { id: Date.now(), name, days }
      const next = [h, ...habits]
      setHabits(next)
      persistHabits(next)
    }
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
    // If this is a backend-backed habit (numeric id), we could map this toggle
    // to a date and call the completions API. That requires a policy for which
    // date to toggle (e.g., current week's Monday..Sunday). For now we keep
    // toggles local but persisted per-user so they don't leak between accounts.
  }

  return (
      <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Journals</h2>
      </div>
      <div>
        <div style={{ marginBottom: 16 }}>
          <Quote />
        </div>
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
