export default function About() {
  const v = [['🌾', 'Informatif', 'Setiap produk dilengkapi manfaat dan cara penggunaan.'], ['🤝', 'Terpercaya', 'Katalog dikurasi untuk petani dan pegiat tanaman.'], ['🤖', 'Cerdas', 'Asisten AI akan membantu rekomendasi dan edukasi pertanian.']]
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Tentang Botani Mart</h1>
      <p className="mt-4 text-stone-600">Botani Mart adalah platform informasi dan katalog produk pertanian yang membantu petani, mahasiswa, dan pehobi tanaman menemukan produk yang tepat serta memahami cara menggunakannya.</p>
      <h2 className="text-xl font-semibold mt-8">Visi</h2>
      <p className="text-stone-600">Mewujudkan pertanian yang lebih produktif melalui akses informasi yang mudah dan akurat.</p>
      <div className="grid md:grid-cols-3 gap-4 mt-8">{v.map(([e, t, d]) => <div key={t} className="bg-white border rounded-xl p-5"><div className="text-3xl">{e}</div><h3 className="font-semibold mt-2">{t}</h3><p className="text-sm text-stone-500">{d}</p></div>)}</div>
    </div>
  )
}
