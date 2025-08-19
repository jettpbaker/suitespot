import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function FloatingAddButton() {
  return (
    <Link href="/add" className="fixed bottom-22 right-8 group">
      <div className="relative">
        {/* More blurred border - thicker */}
        <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-2xl border-6 border-white/50 shadow-lg" />

        {/* Less blurred content */}
        <div className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border-6 border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
          <Plus className="w-5 h-5 text-white" />
          <span className="text-white font-bold">Add</span>
        </div>
      </div>
    </Link>
  )
}
