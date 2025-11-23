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
  )
}
