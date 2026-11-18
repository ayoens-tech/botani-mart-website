import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts, getCategories } from '../api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Catalog() {
  const [sp, setSp] = useSearchParams()
  const [items, setItems] = useState([])
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)
  const q = sp.get('q') || '', category = sp.get('category') || '', sort = sp.get('sort') || ''
  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }) }
  useEffect(() => { getCategories().then(setCats).catch(() => {}) }, [])
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => getProducts({ q, category, sort }).then(setItems).catch(() => setItems([])).finally(() => setLoading(false)), 250)
    return () => clearTimeout(t)
  }, [q, category, sort])
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Katalog Produk</h1>
      <div className="flex flex-col md:flex-row gap-3">
        <input value={q} onChange={e => set('q', e.target.value)} placeholder="Cari produk…" className="flex-1 border rounded-lg px-4 py-2 bg-white" />
        <select value={category} onChange={e => set('category', e.target.value)} className="border rounded-lg px-3 py-2 bg-white">
          <option value="">Semua kategori</option>{cats.map(c => <option key={c}>{c}</option>)}</select>
        <select value={sort} onChange={e => set('sort', e.target.value)} className="border rounded-lg px-3 py-2 bg-white">
          <option value="">Nama A-Z</option><option value="price_asc">Harga terendah</option><option value="price_desc">Harga tertinggi</option></select>
      </div>
      {loading ? <p className="mt-8 text-stone-500">Memuat…</p> : items.length === 0 ? <p className="mt-8 text-stone-500">Produk tidak ditemukan.</p> :
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">{items.map(p => <ProductCard key={p.slug} p={p} />)}</div>}
    </div>
  )
}
