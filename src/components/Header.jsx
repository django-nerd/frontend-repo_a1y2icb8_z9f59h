export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <div>
            <h1 className="text-white font-semibold leading-tight">RideMatch for Soldiers</h1>
            <p className="text-xs text-slate-400">Share rides to base and back home</p>
          </div>
        </div>
        <a href="/test" className="text-xs text-blue-300 hover:text-blue-200">System test</a>
      </div>
    </header>
  )
}
