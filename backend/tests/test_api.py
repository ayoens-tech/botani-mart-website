import pytest
from fastapi.testclient import TestClient
from mongomock_motor import AsyncMongoMockClient
from app import main


@pytest.fixture
def client(monkeypatch):
    monkeypatch.setattr(main, "db", AsyncMongoMockClient()["test"])
    with TestClient(main.app) as c:  # startup menjalankan seed
        yield c


def test_list_and_categories(client):
    assert len(client.get("/api/products").json()) == 9
    assert "Benih" in client.get("/api/categories").json()


def test_search_filter_sort(client):
    assert [p["slug"] for p in client.get("/api/products?q=neem").json()] == ["pestisida-neem"]
    assert all(p["category"] == "Pupuk" for p in client.get("/api/products?category=Pupuk").json())
    prices = [p["price"] for p in client.get("/api/products?sort=price_asc").json()]
    assert prices == sorted(prices)
    assert all(p["price"] <= 20000 for p in client.get("/api/products?max_price=20000").json())


def test_detail_and_404(client):
    assert client.get("/api/products/cangkul-baja").json()["name"] == "Cangkul Baja Karbon"
    assert client.get("/api/products/tidak-ada").status_code == 404


def test_chat_placeholder(client):
    r = client.post("/api/chat", json={"message": "halo"}).json()
    assert r["placeholder"] is True and r["products"] == []
