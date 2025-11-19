import { useEffect, useState } from 'react'

export default function SearchRides() {
  const [fromArea, setFromArea] = useState('')
  const [toArea, setToArea] = useState('')
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const search = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (fromArea) params.append('from_area', fromArea)
      if (toArea) params.append('to_area', toArea)
      const res = await fetch(`${baseUrl}/rides?${params.toString()}`)
      const data = await res.json()
      setRides(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { search() }, [])

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <input className="px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700" placeholder="From area" value={fromArea} onChange={e=>setFromArea(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700" placeholder="To area / base" value={toArea} onChange={e=>setToArea(e.target.value)} />
        <button onClick={search} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded">{loading? 'Searching...' : 'Search'}</button>
      </div>

      <div className="space-y-2">
        {rides.map(r => (
          <div key={r.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{r.from_area} → {r.to_area}</p>
                <p className="text-slate-400 text-sm">Departure: {new Date(r.departure_time).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-white">Seats: {r.seats_available}/{r.seats_total}</p>
                <p className="text-emerald-300">{r.price_per_seat ? `$${r.price_per_seat}` : 'Free'}</p>
              </div>
            </div>
          </div>
        ))}
        {rides.length === 0 && !loading && <p className="text-slate-400">No rides found. Try different areas.</p>}
      </div>
    </div>
  )
}
