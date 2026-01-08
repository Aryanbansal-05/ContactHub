export default function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between bg-black backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 text-xl">
          🤙
        </div>
        <span className="text-2xl font-semibold text-white">
          ContactHub
        </span>
      </div>
    </nav>
  )
}
