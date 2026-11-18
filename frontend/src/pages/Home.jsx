import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, getCategories } from '../api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  const [items, setItems] = useState([])
  const [cats, setCats] = useState([])
  useEffect(() => { getProducts().then(d => setItems(d.slice(0, 4))).catch(() => {}); getCategories().then(setCats).catch(() => {}) }, [])
  return (
    <>
      <section className="bg-gradient-to-br from-green-700 to-lime-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">Semua kebutuhan pertanian, dalam satu tempat</h1>
          <p className="mt-4 text-green-50 max-w-2xl mx-auto">Temukan benih, pupuk, pestisida nabati, dan alat pertanian lengkap dengan informasi penggunaannya.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/produk" className="bg-white text-green-800 font-semibold px-6 py-3 rounded-lg">Lihat Katalog</Link>
            <Link to="/asisten" className="border border-white px-6 py-3 rounded-lg">Tanya Asisten AI</Link>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Kategori</h2>
        <div className="flex flex-wrap gap-3">{cats.map(c => <Link key={c} to={`/produk?category=${encodeURIComponent(c)}`} className="px-4 py-2 bg-white border rounded-full hover:border-green-600">{c}</Link>)}</div>
        <h2 className="text-2xl font-bold mt-12 mb-4">Produk Pilihan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map(p => <ProductCard key={p.slug} p={p} />)}</div>
      </section>
    </>
  )
}
