import { useEffect, useState } from 'react'
import { quotes, getTotalQuotes } from '../data/quotes'

export default function Quote() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [saved, setSaved] = useState([])
  const [loading, setLoading] = useState(false)

  const API_BASE = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE ? process.env.NEXT_PUBLIC_API_BASE : 'http://localhost:4000'

  const external = quotes[currentIndex]
  const totalQuotes = getTotalQuotes()

  function nextQuote() {
    setCurrentIndex((prev) => (prev + 1) % totalQuotes)
  }

  function prevQuote() {
    setCurrentIndex((prev) => (prev - 1 + totalQuotes) % totalQuotes)
  }

  function loadExternal() {
    // Use local quotes - no network call needed
    setCurrentIndex(Math.floor(Math.random() * totalQuotes))
  }

  function getRandomQuote() {
    loadExternal()
  }

  async function loadSaved() {
    // Try backend first, then localStorage fallback
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      const headers = {}
      if (token) headers['Authorization'] = `Bearer ${token}`
      const r = await fetch(`${API_BASE}/api/quotes`, { headers })
      if (r.ok) {
        const list = await r.json()
        setSaved(Array.isArray(list) ? list : [])
        return
      }
      // if unauthorized, fall back to localStorage
      if (r.status === 401 || r.status === 403) {
        console.warn('Not authenticated for backend saved quotes; using localStorage fallback')
      }
    } catch (e) {
      console.warn('Failed to fetch saved quotes from backend, using localStorage', e)
    }
    // local fallback (namespace by username)
    try {
      const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
      const key = `savedQuotes:${username || 'anon'}`
      const ls = typeof window !== 'undefined' ? localStorage.getItem(key) : null
      if (ls) setSaved(JSON.parse(ls))
    } catch (e) {
      console.error('Failed to read saved quotes from localStorage', e)
    }
  }

  useEffect(() => {
    loadSaved()
  }, [])

  async function saveExternal() {
    if (!external) return
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      const headers = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch(`${API_BASE}/api/quotes`, {
        method: 'POST', headers, body: JSON.stringify({ content: external.content, author: external.author, source: 'external' })
      })
      if (res.ok) {
        await loadSaved()
        alert('Saved quote')
        return
      }
      if (res.status === 401 || res.status === 403) {
        console.warn('Not authenticated to save to backend; falling back to localStorage')
      } else {
        console.warn('Backend save failed, falling back to localStorage', res.status)
      }
    } catch (err) {
      console.warn('Network/backend error saving quote, falling back to localStorage', err)
    }
    // localStorage fallback
    try {
      const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
      const key = `savedQuotes:${username || 'anon'}`
      const existing = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(key) || '[]') : []
      const newItem = { id: Date.now(), content: external.content, author: external.author || '', created_at: new Date().toISOString(), source: 'local' }
      existing.unshift(newItem)
      if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(existing))
      setSaved(existing)
      alert('Saved quote locally')
    } catch (e) {
      console.error('Failed to save quote locally', e)
      alert('Failed to save quote')
    }

  }

  async function deleteSaved(id) {
    if (!id) return
    // Try backend delete first
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      const headers = {}
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch(`${API_BASE}/api/quotes/${id}`, { method: 'DELETE', headers })
      if (res.ok) {
        await loadSaved()
        return
      }
      if (res.status === 401 || res.status === 403) {
        console.warn('Not authenticated to delete backend quote; falling back to localStorage')
      }
      // Fall through to local removal
    } catch (err) {
      console.warn('Backend delete failed, removing locally', err)
    }

    // Local fallback: remove from localStorage and state
    try {
      const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
      const key = `savedQuotes:${username || 'anon'}`
      const existing = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(key) || '[]') : []
      const filtered = existing.filter(s => String(s.id) !== String(id))
      if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(filtered))
      setSaved(prev => prev.filter(s => String(s.id) !== String(id)))
    } catch (e) {
      console.error('Failed to remove saved quote locally', e)
    }
  }

  if (loading) return <div>Loading quotes...</div>

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <strong>Motivational Quote</strong>
      </div>
      {external ? (
        <blockquote style={{ fontStyle: 'italic', margin: 0 }}>
          “{external.content}” — {external.author || '—'}
          <div style={{ marginTop: 8 }}>
            <button onClick={saveExternal}>Save quote</button>
            <button onClick={loadExternal} disabled={loading} style={{ marginLeft: 8 }}>
              {loading ? 'Loading…' : 'Another quote'}
            </button>
          </div>
        </blockquote>
      ) : (
        <div>
          <div style={{ color: '#b00' }}>Failed to load external quote.</div>
          {externalError ? <div style={{ color: '#666', fontSize: 12, marginTop: 6 }}>{externalError}</div> : null}
          <div style={{ marginTop: 8 }}>
            <button onClick={loadExternal}>Try again</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <strong>Saved quotes</strong>
        <div style={{ marginTop: 8 }}>{saved.length === 0 ? <div style={{ color: '#666' }}>No saved quotes</div> : (
          <ul>
            {saved.map(s => (
              <li key={s.id} style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  “{s.content}” — {s.author || '—'} <span style={{ color: '#999', fontSize: 12 }}>({s.created_at ? new Date(s.created_at).toLocaleString() : ''})</span>
                </div>
                <div style={{ marginLeft: 8 }}>
                  <button onClick={() => deleteSaved(s.id)} style={{ marginLeft: 8 }}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}</div>
      </div>
    </div>
  )
}
