import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct, rp } from '../api.js'

export default function Detail() {
  const { slug } = useParams()
  const [p, setP] = useState(null)
  const [err, setErr] = useState(false)
  useEffect(() => { setP(null); setErr(false); getProduct(slug).then(setP).catch(() => setErr(true)) }, [slug])
  if (err) return <p className="p-10 text-center">Produk tidak ditemukan. <Link to="/produk" className="text-green-700 underline">Kembali</Link></p>
  if (!p) return <p className="p-10 text-center text-stone-500">Memuat…</p>
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/produk" className="text-sm text-green-700">← Katalog</Link>
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div className="h-64 md:h-80 rounded-2xl bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-9xl">{p.emoji}</div>
        <div>
          <span className="text-sm text-green-700">{p.category}</span>
          <h1 className="text-3xl font-bold mt-1">{p.name}</h1>
          <p className="text-2xl font-bold text-green-700 mt-3">{rp(p.price)} <span className="text-sm font-normal text-stone-500">/ {p.unit}</span></p>
          <p className="mt-4 text-stone-600">{p.description}</p>
          <h2 className="font-semibold mt-6">Manfaat</h2>
          <ul className="list-disc ml-5 text-stone-600">{p.benefits.map(b => <li key={b}>{b}</li>)}</ul>
          <h2 className="font-semibold mt-6">Cara Penggunaan</h2>
          <p className="text-stone-600">{p.usage}</p>
          <Link to="/asisten" className="inline-block mt-6 border border-green-700 text-green-700 px-4 py-2 rounded-lg">Tanya Asisten AI</Link>
        </div>
      </div>
    </div>
  )
}
