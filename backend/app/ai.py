"""Lapisan AI Assistant. Saat ini placeholder.
Untuk integrasi nanti: buat class baru dengan method `reply` (mis. memanggil Claude API
+ mencari produk di MongoDB sebagai konteks), lalu kembalikan di get_assistant().
Frontend & endpoint /api/chat TIDAK perlu diubah."""
from typing import Protocol


class Assistant(Protocol):
    async def reply(self, message: str, history: list[dict], db) -> dict: ...


class PlaceholderAssistant:
    async def reply(self, message: str, history: list[dict], db) -> dict:
        return {
            "reply": "Asisten AI Botani Mart segera hadir. Untuk sementara, jelajahi katalog produk kami.",
            "products": [],  # daftar slug produk yang direkomendasikan (kontrak untuk tahap AI)
            "placeholder": True,
        }


def get_assistant() -> Assistant:
    return PlaceholderAssistant()
