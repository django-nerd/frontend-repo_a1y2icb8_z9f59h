import Header from './components/Header'
import SearchRides from './components/SearchRides'
import RideForm from './components/RideForm'
import AISuggestions from './components/AISuggestions'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      <main className="relative max-w-5xl mx-auto px-4 py-10">
        <section className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Match rides to base and back home</h2>
          <p className="text-slate-300 mt-2">Search rides near your area, offer seats, or let AI suggest your best matches.</p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-xl font-semibold text-white mb-3">Find a ride</h3>
            <SearchRides />
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <RideForm onCreated={() => {}} />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 mt-6">
          <h3 className="text-xl font-semibold text-white mb-3">AI ride suggestions</h3>
          <AISuggestions />
        </div>

        <p className="text-xs text-slate-500 mt-6 text-center">Tip: Create your soldier profile via the backend first, then paste your Soldier ID for AI suggestions and ride offers.</p>
      </main>
    </div>
  )
}

export default App
