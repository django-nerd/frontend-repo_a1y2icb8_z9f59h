import { useEffect, useState } from 'react'

export default function AISuggestions() {
  const [soldierId, setSoldierId] = useState('')
  const [windowHours, setWindowHours] = useState(24)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchSuggestions = async () => {
    if (!soldierId) { setError('Enter your Soldier ID'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/ai/suggest-rides`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soldier_id: soldierId, window_hours: Number(windowHours) })
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      setResults(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // no auto run
  }, [])

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <input className="px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700" placeholder="Your Soldier ID" value={soldierId} onChange={e=>setSoldierId(e.target.value)} />
        <input type="number" min="1" max="168" className="px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700" placeholder="Next hours" value={windowHours} onChange={e=>setWindowHours(e.target.value)} />
        <button onClick={fetchSuggestions} className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded">{loading? 'Finding...' : 'AI match rides'}</button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <div className="space-y-2">
        {results.map((item, idx) => (
          <div key={idx} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{item.ride.from_area} → {item.ride.to_area}</p>
                <p className="text-slate-400 text-sm">Departure: {new Date(item.ride.departure_time).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-white">Seats: {item.ride.seats_available}/{item.ride.seats_total}</p>
                <p className="text-fuchsia-300">Score: {item.score}</p>
              </div>
            </div>
          </div>
        ))}
        {results.length === 0 && !loading && <p className="text-slate-400">No suggestions yet. Enter your Soldier ID and try.</p>}
      </div>
    </div>
  )
}
