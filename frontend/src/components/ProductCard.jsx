import { Link } from 'react-router-dom'
import { rp } from '../api.js'
export default function ProductCard({ p }) {
  return (
    <Link to={`/produk/${p.slug}`} className="bg-white rounded-xl border hover:shadow-lg transition overflow-hidden flex flex-col">
      <div className="h-32 bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-6xl">{p.emoji}</div>
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs text-green-700">{p.category}</span>
        <h3 className="font-semibold mt-1">{p.name}</h3>
        <p className="text-sm text-stone-500 flex-1">{p.short}</p>
        <p className="mt-2 font-bold text-green-700">{rp(p.price)} <span className="text-xs font-normal text-stone-500">/ {p.unit}</span></p>
      </div>
    </Link>
  )
}
