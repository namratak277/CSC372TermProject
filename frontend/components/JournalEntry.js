import React from 'react'

export default function JournalEntry({ entry, onEdit, onDelete, onToggleHabit }) {
  const snippet = (entry.content || '').length > 200 ? (entry.content || '').slice(0, 197) + '...' : (entry.content || '')
  function formatTime(ts) {
    if (!ts) return '—'
    try {
      const d = new Date(ts)
      const date = d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
      const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      return `${date} ${time}`
    } catch (e) {
      return '—'
    }
  }

  return (
    <div className="journal-card">
      <div className="card-header">
        <strong className="card-title">{entry.title || 'Untitled'}</strong>
        <div className="card-date">{formatTime(entry.created_at)}</div>
      </div>
      <div className="card-body">{snippet}</div>
      <div className="card-actions">
        <button onClick={() => onEdit && onEdit(entry)} className="edit">Edit</button>
        <button onClick={() => onDelete && onDelete(entry)} className="delete">Delete</button>
        {/* Habit toggle moved to the separate sidebar habit tracker */}
      </div>
    </div>
  )
}
