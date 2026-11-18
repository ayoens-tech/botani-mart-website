import os, re
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from .seed import PRODUCTS
from .ai import get_assistant

client = AsyncIOMotorClient(os.getenv("MONGO_URL", "mongodb://localhost:27017"))
db = client[os.getenv("DB_NAME", "botanimart")]

@asynccontextmanager
async def lifespan(_):
    if await db.products.count_documents({}) == 0:
        await db.products.insert_many([dict(p) for p in PRODUCTS])
        await db.products.create_index("slug", unique=True)
    yield


app = FastAPI(title="Botani Mart API", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


@app.get("/api/categories")
async def categories():
    return await db.products.distinct("category")


@app.get("/api/products")
async def products(q: str | None = None, category: str | None = None,
                   min_price: int | None = None, max_price: int | None = None, sort: str | None = None):
    f: dict = {}
    if q:
        rx = {"$regex": re.escape(q), "$options": "i"}
        f["$or"] = [{"name": rx}, {"short": rx}, {"description": rx}]
    if category:
        f["category"] = category
    price = {}
    if min_price: price["$gte"] = min_price
    if max_price: price["$lte"] = max_price
    if price: f["price"] = price
    order = {"price_asc": ("price", 1), "price_desc": ("price", -1)}.get(sort, ("name", 1))
    return await db.products.find(f, {"_id": 0}).sort(*order).to_list(200)


@app.get("/api/products/{slug}")
async def product(slug: str):
    p = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not p:
        raise HTTPException(404, "Produk tidak ditemukan")
    return p


class ChatIn(BaseModel):
    message: str
    history: list[dict] = []


@app.post("/api/chat")
async def chat(body: ChatIn):
    return await get_assistant().reply(body.message, body.history, db)
