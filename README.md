# Botani Mart

Katalog & informasi produk pertanian. React + Vite + Tailwind v4 | FastAPI | MongoDB.

## Menjalankan (VS Code, 3 terminal)
1. `docker compose up -d` (MongoDB; atau MongoDB lokal/Atlas via env `MONGO_URL`)
2. Backend: `cd backend && python -m venv .venv && source .venv/bin/activate` (Windows: `.venv\Scripts\activate`) lalu `pip install -r requirements.txt && uvicorn app.main:app --reload` → http://localhost:8000/docs
3. Frontend: `cd frontend && npm install && npm run dev` → http://localhost:5173

Data contoh otomatis dimasukkan saat backend pertama kali jalan (`backend/app/seed.py`).

## Sitemap
`/` Beranda · `/produk` Katalog (cari, filter kategori, urutkan) · `/produk/:slug` Detail · `/tentang` Profil · `/asisten` Chatbot

## API
`GET /api/products?q=&category=&min_price=&max_price=&sort=` · `GET /api/products/{slug}` · `GET /api/categories` · `POST /api/chat`

## Integrasi AI Assistant nanti (tanpa membangun ulang)
- UI chat (`pages/Chat.jsx`) hanya memanggil `POST /api/chat` dengan kontrak `{message, history}` → `{reply, products: [slug], placeholder}`.
- Seluruh logika AI ada di `backend/app/ai.py`. Ganti `PlaceholderAssistant` dengan implementasi LLM (mis. Claude API + pencarian produk di MongoDB sebagai konteks) dan kembalikan di `get_assistant()`.
- Field `products` siap dipakai untuk menampilkan kartu rekomendasi di chat.

## Pengujian
Backend: `cd backend && pip install -r requirements-dev.txt && pytest` (memakai MongoDB tiruan, tanpa perlu Mongo berjalan).
Frontend: `cd frontend && npm run build`.
