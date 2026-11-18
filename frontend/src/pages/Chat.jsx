import { useEffect, useRef, useState } from 'react'
import { sendChat } from '../api.js'

const tips = ['Pupuk apa untuk cabai?', 'Cara mengatasi hama kutu daun', 'Rekomendasi alat untuk pemula']

export default function Chat() {
  const [msgs, setMsgs] = useState([{ role: 'assistant', text: 'Halo! Saya asisten Botani Mart. 🌱 Fitur AI sedang dalam pengembangan.' }])
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const end = useRef()
  useEffect(() => end.current?.scrollIntoView({ behavior: 'smooth' }), [msgs])
  async function send(m = text) {
    if (!m.trim() || busy) return
    const history = msgs.map(x => ({ role: x.role, content: x.text }))
    setMsgs(x => [...x, { role: 'user', text: m }]); setText(''); setBusy(true)
    try { const r = await sendChat(m, history); setMsgs(x => [...x, { role: 'assistant', text: r.reply }]) }
    catch { setMsgs(x => [...x, { role: 'assistant', text: 'Maaf, terjadi kesalahan koneksi.' }]) }
    setBusy(false)
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col" style={{ height: 'calc(100vh - 8rem)' }}>
      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg px-3 py-2 mb-3">Mode pratinjau: asisten belum dapat menjawab pertanyaan.</div>
      <div className="flex-1 overflow-y-auto space-y-3 bg-white border rounded-xl p-4">
        {msgs.map((m, i) => <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
          <span className={`inline-block max-w-[85%] px-4 py-2 rounded-2xl text-left ${m.role === 'user' ? 'bg-green-700 text-white' : 'bg-stone-100'}`}>{m.text}</span></div>)}
        {busy && <p className="text-stone-400 text-sm">Mengetik…</p>}
        <div ref={end} />
      </div>
      <div className="flex flex-wrap gap-2 mt-3">{tips.map(t => <button key={t} onClick={() => send(t)} className="text-xs border rounded-full px-3 py-1 bg-white hover:border-green-600">{t}</button>)}</div>
      <div className="flex gap-2 mt-3">
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Tulis pertanyaan…" className="flex-1 border rounded-lg px-4 py-2 bg-white" />
        <button onClick={() => send()} className="bg-green-700 text-white px-5 rounded-lg">Kirim</button>
      </div>
    </div>
  )
}
