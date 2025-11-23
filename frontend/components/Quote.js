import { useEffect, useState } from 'react'

export default function Quote() {
  const [q, setQ] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/quote')
      .then(r => r.json())
      .then(j => { if (j.ok) setQ(j) })
      .catch(() => {})
  }, [])

  if (!q) return <div>Loading quote...</div>
  return (
    <blockquote style={{ fontStyle: 'italic' }}>
      “{q.quote}” — {q.author}
    </blockquote>
  )
}
