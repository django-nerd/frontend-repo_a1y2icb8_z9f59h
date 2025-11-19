import { useState } from 'react'

export default function RideForm({ onCreated }) {
  const [driverId, setDriverId] = useState('')
  const [fromArea, setFromArea] = useState('')
  const [toArea, setToArea] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [seatsTotal, setSeatsTotal] = useState(3)
  const [price, setPrice] = useState(0)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/rides`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driver_id: driverId,
          from_area: fromArea,
          to_area: toArea,
          departure_time: new Date(departureTime).toISOString(),
          seats_total: Number(seatsTotal),
          price_per_seat: Number(price),
          notes,
        })
      })
      if (!res.ok) throw new Error(`Failed to create ride: ${res.status}`)
      const data = await res.json()
      onCreated?.(data)
      setFromArea(''); setToArea(''); setNotes(''); setPrice(0)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <h3 className="text-white font-semibold">Offer a ride</h3>
      <div className="grid grid-cols-2 gap-3">
        <input className="px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700" placeholder="Your Soldier ID" value={driverId} onChange={e=>setDriverId(e.target.value)} required />
        <input className="px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700" placeholder="From area" value={fromArea} onChange={e=>setFromArea(e.target.value)} required />
        <input className="px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700" placeholder="To area / base" value={toArea} onChange={e=>setToArea(e.target.value)} required />
        <input type="datetime-local" className="px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700" value={departureTime} onChange={e=>setDepartureTime(e.target.value)} required />
        <input type="number" min="1" max="8" className="px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700" placeholder="Seats" value={seatsTotal} onChange={e=>setSeatsTotal(e.target.value)} required />
        <input type="number" min="0" step="1" className="px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700" placeholder="Price per seat" value={price} onChange={e=>setPrice(e.target.value)} />
      </div>
      <textarea className="w-full px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700" placeholder="Notes (optional)" value={notes} onChange={e=>setNotes(e.target.value)} />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button disabled={loading} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded">{loading? 'Creating...' : 'Create ride'}</button>
    </form>
  )
}
