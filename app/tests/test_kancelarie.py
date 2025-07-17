from app.models.kancelaria import Kancelaria
from app.models.user import User
from app.core.security import get_password_hash
from app.core.auth import create_access_token
from datetime import timedelta

def get_auth_headers(client, db_session, email="test@example.com", password="testpassword"):
    hashed_password = get_password_hash(password)
    user = User(email=email, hashed_password=hashed_password)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"Authorization": f"Bearer {access_token}"}, user.id

def test_create_kancelaria(client, db_session):
    headers, user_id = get_auth_headers(client, db_session)
    response = client.post(
        "/api/v1/kancelarie/",
        headers=headers,
        json={"name": "Test Kancelaria", "owner_id": user_id},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Kancelaria"
    assert data["owner_id"] == user_id
    assert "id" in data

def test_create_kancelaria_unauthenticated(client):
    response = client.post(
        "/api/v1/kancelarie/",
        json={"name": "Test Kancelaria", "owner_id": 1},
    )
    assert response.status_code == 401

def test_read_kancelarie(client, db_session):
    headers, user_id = get_auth_headers(client, db_session)
    kancelaria1 = Kancelaria(name="Kancelaria One", owner_id=user_id)
    kancelaria2 = Kancelaria(name="Kancelaria Two", owner_id=user_id)
    db_session.add(kancelaria1)
    db_session.add(kancelaria2)
    db_session.commit()
    db_session.refresh(kancelaria1)
    db_session.refresh(kancelaria2)

    response = client.get(
        "/api/v1/kancelarie/",
        headers=headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert any(k["name"] == "Kancelaria One" for k in data)
    assert any(k["name"] == "Kancelaria Two" for k in data)

def test_read_kancelaria(client, db_session):
    headers, user_id = get_auth_headers(client, db_session)
    kancelaria = Kancelaria(name="Single Kancelaria", owner_id=user_id)
    db_session.add(kancelaria)
    db_session.commit()
    db_session.refresh(kancelaria)

    response = client.get(
        f"/api/v1/kancelarie/{kancelaria.id}",
        headers=headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Single Kancelaria"
    assert data["id"] == kancelaria.id

def test_read_kancelaria_not_found(client, db_session):
    headers, _ = get_auth_headers(client, db_session)
    response = client.get(
        "/api/v1/kancelarie/999",
        headers=headers,
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "Kancelaria not found"}

def test_update_kancelaria(client, db_session):
    headers, user_id = get_auth_headers(client, db_session)
    kancelaria = Kancelaria(name="Old Name", owner_id=user_id)
    db_session.add(kancelaria)
    db_session.commit()
    db_session.refresh(kancelaria)

    response = client.put(
        f"/api/v1/kancelarie/{kancelaria.id}",
        headers=headers,
        json={"name": "Updated Name"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Name"
    assert data["id"] == kancelaria.id

def test_update_kancelaria_not_found(client, db_session):
    headers, _ = get_auth_headers(client, db_session)
    response = client.put(
        "/api/v1/kancelarie/999",
        headers=headers,
        json={"name": "Non Existent"},
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "Kancelaria not found"}

def test_delete_kancelaria(client, db_session):
    headers, user_id = get_auth_headers(client, db_session)
    kancelaria = Kancelaria(name="To Be Deleted", owner_id=user_id)
    db_session.add(kancelaria)
    db_session.commit()
    db_session.refresh(kancelaria)

    response = client.delete(
        f"/api/v1/kancelarie/{kancelaria.id}",
        headers=headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Kancelaria deleted successfully"

    # Verify it's deleted
    response = client.get(
        f"/api/v1/kancelarie/{kancelaria.id}",
        headers=headers,
    )
    assert response.status_code == 404

def test_delete_kancelaria_not_found(client, db_session):
    headers, _ = get_auth_headers(client, db_session)
    response = client.delete(
        "/api/v1/kancelarie/999",
        headers=headers,
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "Kancelaria not found"}