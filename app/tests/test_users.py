from unittest.mock import patch
from app.core.security import verify_password, get_password_hash
from app.models.user import User
from app.core.auth import create_access_token
from datetime import timedelta

def test_create_user(client):
    response = client.post(
        "/api/v1/users/",
        json={"email": "test@example.com", "password": "testpassword"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert "hashed_password" not in data

def test_create_user_existing_email(client):
    client.post(
        "/api/v1/users/",
        json={"email": "test@example.com", "password": "testpassword"},
    )
    response = client.post(
        "/api/v1/users/",
        json={"email": "test@example.com", "password": "anotherpassword"},
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Email already registered"}

def test_read_user_me(client, db_session):
    hashed_password = get_password_hash("testpassword")
    user = User(email="test@example.com", hashed_password=hashed_password)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    response = client.get(
        "/api/v1/users/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["id"] == user.id

def test_read_user_me_unauthenticated(client):
    response = client.get("/api/v1/users/me")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}

def test_authenticate_user(client, db_session):
    hashed_password = get_password_hash("testpassword")
    user = User(email="test@example.com", hashed_password=hashed_password)
    db_session.add(user)
    db_session.commit()

    response = client.post(
        "/api/v1/token",
        data={"username": "test@example.com", "password": "testpassword"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_authenticate_user_invalid_credentials(client):
    response = client.post(
        "/api/v1/token",
        data={"username": "nonexistent@example.com", "password": "wrongpassword"},
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Incorrect username or password"}

def test_verify_password():
    password = "mysecretpassword"
    hashed_password = get_password_hash(password)
    assert verify_password(password, hashed_password)
    assert not verify_password("wrongpassword", hashed_password)

def test_get_password_hash():
    password = "anothersecretpassword"
    hashed_password = get_password_hash(password)
    assert hashed_password is not None
    assert isinstance(hashed_password, str)
    assert len(hashed_password) > 0

@patch("app.core.auth.ACCESS_TOKEN_EXPIRE_MINUTES", 0.00001)
def test_create_access_token_expired(client, db_session):
    hashed_password = get_password_hash("testpassword")
    user = User(email="expired@example.com", hashed_password=hashed_password)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    access_token_expires = timedelta(minutes=0.00001)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    # Attempt to access a protected endpoint with the expired token
    response = client.get(
        "/api/v1/users/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Could not validate credentials"}