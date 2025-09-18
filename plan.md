architektura.md
code
Markdown
# Architektura Systemu atomai.pl

## 1. Wstęp

Projekt atomai.pl to innowacyjny serwis internetowy dla kancelarii prawnej, wspierany przez najnowszą technologię. Ma na celu automatyzację analizy dokumentów prawnych i generowania pism procesowych, oferując jednocześnie intuicyjny interfejs użytkownika. System ma być skalowalny, bezpieczny i wydajny, zdolny do obsługi wielu "marek" (skórek) działających na tym samym silniku prawnym.

## 2. Ogólna Architektura

System będzie oparty na architekturze mikroserwisów lub modularnego monolitu, aby zapewnić elastyczność i skalowalność. Komunikacja między komponentami będzie odbywać się za pomocą RESTful API.

```mermaid
graph TD
    A[Klient Web / Mobile] --> B(Load Balancer / CDN)
    B --> C(Frontend - Next.js)
    C --> D(API Gateway / BFF)
    D --> E(Backend Services - Python/FastAPI)
    E --> F(Baza Danych - PostgreSQL)
    E --> G(System Kolejkowy - RabbitMQ / Redis)
    E --> H(Microserwis AI/NLP - Python)
    E --> I(System Płatności - Autopay/BLIK/GPAY)
    E --> J(Serwis E-mail / SMS)
    E --> K(Storage Plików - S3-compatible)
    G --> H
    H --> F
    H --> K
    E --> L(Operator Panel - Admin UI)
    L --> D
Komponenty:
Frontend (Next.js, Shadcn UI): Interfejs użytkownika dla klientów oraz panel operatora.
API Gateway / Backend for Frontend (BFF): Centralny punkt dostępu do API, agregujący i transformujący dane dla frontendu.
Backend Services (Python, FastAPI): Główne usługi biznesowe, zarządzające logiką systemu.
AI/NLP Microservice (Python, FastAPI/Flask): Specjalizowany serwis do analizy dokumentów, wykorzystujący modele językowe.
Baza Danych (PostgreSQL): Relacyjna baza danych do przechowywania danych użytkowników, spraw, dokumentów, analiz, pism itp.
System Kolejkowy (RabbitMQ / Redis): Do asynchronicznej obróbki zadań, takich jak analiza dokumentów, generowanie pism, wysyłka powiadomień.
Storage Plików (S3-compatible): Do przechowywania wgranych dokumentów, wygenerowanych pism, raportów.
System Płatności: Integracja z zewnętrznymi dostawcami płatności (Autopay, BLIK, Google Pay, Apple Pay, karty).
Serwis E-mail / SMS: Do wysyłki powiadomień, kodów autoryzacyjnych, raportów.
Load Balancer / CDN: Zapewnienie dostępności i wydajności serwisu.
3. Szczegółowa Architektura Backend (Python)
3.1. Wybór Technologii
Język: Python 3.10+
Framework: FastAPI (wysoka wydajność, asynchroniczność, automatyczna dokumentacja OpenAPI)
ORM: SQLAlchemy 2.0+ (asynchroniczne, elastyczne)
Baza Danych: PostgreSQL
Asynchroniczne Zadania: Celery z RabbitMQ/Redis jako brokerem
Cache: Redis
Walidacja: Pydantic (zintegrowane z FastAPI)
Dependency Injection: FastAPI's built-in system
Testy: Pytest
Linter/Formatter: Black, Flake8, Isort
Deployment: Docker, Kubernetes (opcjonalnie)
3.2. Moduły Backendu
Moduł Użytkownika i Autoryzacji (Auth & User Management):
Modele: User, Role, Session, OAuthAccount.
Funkcjonalność: Rejestracja (e-mail/SMS, social media), logowanie, zarządzanie profilami, reset hasła, autoryzacja OAuth2 (JWT).
Endpointy: /auth/register, /auth/login, /auth/me, /user/{id}, /auth/oauth/{provider}.
Moduł Zarządzania Sprawami (Case Management):
Modele: Case, Document, Analysis, Letter, CaseHistoryEntry.
Funkcjonalność: Tworzenie/edycja/usuwanie spraw, przypisywanie dokumentów, śledzenie historii sprawy.
Endpointy: /cases, /cases/{id}, /cases/{id}/documents, /cases/{id}/analyses, /cases/{id}/letters.
Moduł Przesyłania i Zarządzania Dokumentami (Document Upload & Management):
Integracja: S3-compatible storage.
Modele: Document, DocumentType.
Funkcjonalność: Bezpieczne przesyłanie plików (PDF, JPG/PNG), walidacja typów/rozmiarów plików, generowanie linków do pobierania.
Endpointy: /documents/upload, /documents/{id}/download.
Moduł Analizy Dokumentów (Document Analysis):
Modele: AnalysisResult, AnalysisRecommendation.
Funkcjonalność: Wyzwalanie asynchronicznych zadań analizy, przechowywanie wyników, rekomendowanie pism.
Endpointy: /analyses/request, /analyses/{id}, /analyses/{id}/recommendations.
Integracja: AI/NLP Microservice (via Celery/RabbitMQ).
Moduł Generowania i Zakupu Pism (Letter Generation & Purchase):
Modele: LetterTemplate, GeneratedLetter, Purchase.
Funkcjonalność: Generowanie pism na podstawie analizy i szablonów, zarządzanie zakupionymi pismami, system rabatowy.
Endpointy: /letters/generate, /letters/{id}/purchase, /letters/{id}/download, /letters/templates.
Moduł Płatności (Payment Module):
Integracja: Autopay, BLIK, Przelewy24 (lub podobne).
Modele: Order, Transaction.
Funkcjonalność: Tworzenie zamówień, obsługa webhooków płatności, aktualizacja statusów transakcji.
Endpointy: /payments/create-order, /payments/webhook/{provider}.
Moduł Powiadomień (Notification Module):
Integracja: E-mail (SMTP), SMS Gateway.
Funkcjonalność: Wysyłka powiadomień o statusie analizy, gotowości pism, potwierdzeniach płatności.
Endpointy: Wewnętrzne, wywoływane przez inne moduły.
Moduł Panelu Operatora (Admin/Operator Panel):
Funkcjonalność: Zarządzanie użytkownikami, sprawami, dokumentami, analizami, pismami, statusami zadań. Wbudowane "guziki" do komunikacji z klientem (np. "niewyraźne skany").
Endpointy: /admin/... (z odpowiednimi rolami dostępu).
3.3. Mikroserwis AI/NLP (Python)
Framework: FastAPI/Flask.
Modele: Transformers (Hugging Face), spaCy, scikit-learn.
Funkcjonalność:
Ekstrakcja encji (NER) z dokumentów prawnych.
Klasyfikacja dokumentów.
Analiza sentymentu/tonu.
Sumaryzacja kluczowych informacji.
Identyfikacja punktów akcji i rekomendacji.
Komunikacja: Przyjmuje zadania z kolejki (RabbitMQ), przetwarza, zapisuje wyniki do bazy danych lub S3, wysyła powiadomienia o zakończeniu.
4. Szczegółowa Architektura Frontend (Next.js, Shadcn UI)
4.1. Wybór Technologii
Framework: Next.js 14+ (React 18+, Server Components, Server Actions).
Język: TypeScript.
Stylizacja: Tailwind CSS, Shadcn UI (komponenty reaktywne, łatwe do dostosowania).
State Management: React Context API, TanStack Query (do zarządzania danymi asynchronicznymi).
Walidacja Formularzy: Zod, React Hook Form.
Deployment: Vercel (dla Next.js) lub Docker/Kubernetes.
Powiadomienia: react-toastify.
4.2. Strony i Komponenty Frontendowe
Strona Główna (Home Page):
Informacje o usłudze, zalety, cennik (pakiet Standard, Priorytetowy, Premium).
Sekcja "O nas", FAQ.
Elementy marketingowe.
Strony Rejestracji i Logowania (Auth Pages):
Formularze rejestracji (e-mail, SMS, social media/Google).
Formularze logowania.
Resetowanie hasła.
Moje Sprawy (Dashboard / My Cases):
Lista spraw użytkownika z możliwością nazywania.
Status każdej sprawy (wgrano pismo, w trakcie analizy, analiza gotowa, pismo wygenerowane).
Opcja "Dodaj Nową Sprawę".
Kafelki z rekomendowanymi pismami do zakupu na podstawie analizy.
Przyciski "Pokaż Analizę", "Pobierz Pismo".
Szczegóły Sprawy (Case Details):
Historia sprawy (wgrane dokumenty, analizy, zakupione pisma).
Widok analizy (możliwość częściowego widoku, pełny widok po zakupie).
Widok pism (podgląd, pobieranie po zakupie).
Możliwość wgrania kolejnego dokumentu do tej samej sprawy.
Formularz Zamówienia Analizy / Pisma (Order Form):
Krok 1: Wgranie pisma:
Drag & drop, wybór pliku, zrobienie zdjęcia (telefonem).
Akceptowane formaty: PDF, JPG, PNG.
Krok 2: Opis oczekiwań:
Pole tekstowe na kontekst sprawy, oczekiwania.
Podpowiedzi dla użytkownika.
Opcja nagrania głosu (maks. 2 minuty) - konwersja do tekstu na backendzie.
Przegląd zamówienia.
Strona Płatności (Payment Page):
Wybór metody płatności (karta, BLIK, przelew, Google Pay, Apple Pay).
Podsumowanie zamówienia.
Przekierowanie do bramki płatności.
Potwierdzenie Zamówienia (Order Confirmation):
Komunikat o sukcesie płatności.
Informacja o wysyłce raportu na e-mail.
Możliwość sprawdzenia kolejnej firmy/sprawy.
Panel Operatora (Operator Panel):
Dashboard z listą oczekujących zadań (analizy, pisma do generowania).
Szczegóły zadań: wgrane dokumenty, opis klienta, wyniki analizy (z AI/NLP).
Interfejs do generowania pism z wykorzystaniem szablonów.
"Guziki" do szybkiej komunikacji z klientem (np. "niewyraźne skany", "potwierdź analizę").
Zarządzanie użytkownikami, szablonami pism, cennikiem.
5. Baza Danych (PostgreSQL)
5.1. Przykładowe Tabele
users: Użytkownicy systemu (id, email, password_hash, created_at, updated_at, role).
user_oauth_accounts: Konta OAuth (user_id, provider, provider_id, access_token).
cases: Sprawy użytkowników (id, user_id, name, status, created_at, updated_at).
documents: Wgrane dokumenty (id, case_id, user_id, file_url, original_filename, file_type, upload_date, status).
document_contexts: Opisy kontekstu do dokumentów (document_id, user_id, text_context, voice_note_url).
analyses: Wyniki analiz (id, case_id, document_id, user_id, analysis_text, status, generated_at, price, is_paid).
analysis_recommendations: Rekomendacje pism (analysis_id, letter_template_id, recommended_text, price).
letter_templates: Szablony pism (id, name, content_template, price_base).
generated_letters: Wygenerowane pisma (id, case_id, analysis_id, letter_template_id, generated_content, download_url, status, generated_at, price, is_paid).
orders: Zamówienia (id, user_id, total_amount, status, created_at).
order_items: Pozycje zamówienia (order_id, item_type, item_id, price).
transactions: Transakcje płatnicze (id, order_id, payment_provider, transaction_id_provider, amount, status, created_at).
notifications: Powiadomienia (id, user_id, type, message, is_read, created_at).
operator_messages: Komunikaty operatora (id, case_id, operator_id, user_id, message_type, message_content, created_at).
6. Integracje Zewnętrzne
Płatności: Bramki płatności (Autopay, Przelewy24, Stripe, itp.).
E-mail: SendGrid, Mailgun, AWS SES.
SMS: Twilio, Vonage.
OAuth: Google, Facebook, Apple.
Storage: AWS S3, Google Cloud Storage, MinIO.
CDN: Cloudflare, AWS CloudFront.
7. Bezpieczeństwo
Autoryzacja i Autentykacja: JWT, OAuth2, Role-Based Access Control (RBAC).
Szyfrowanie: Hasła (bcrypt), dane wrażliwe w spoczynku i w ruchu (SSL/TLS).
Walidacja danych: Pydantic na backendzie, walidacja po stronie klienta.
Ochrona przed atakami: CSRF, XSS, SQL Injection (ORM pomaga), Rate Limiting.
Bezpieczne przechowywanie plików: Enkrypcja na S3, kontrolowany dostęp.
Regularne audyty bezpieczeństwa.
8. Skalowalność i Wydajność
Asynchroniczny Backend: FastAPI z Gunicorn/Uvicorn.
Kolejkowanie zadań: Celery/RabbitMQ dla długotrwałych operacji.
Cache: Redis dla często odczytywanych danych.
Baza Danych: Optymalizacja zapytań, indeksowanie, Connection Pooling.
CDN: Do serwowania statycznych zasobów.
Load Balancing: Rozłożenie ruchu na wiele instancji serwera.
Mikroserwisy/Modularny Monolit: Umożliwia niezależne skalowanie komponentów.
9. Rozważania Wielobrandowe (Multi-tenancy)
System ma wspierać wiele "marek" (pismoodkomornika.pl, pismzsadu.pl, atomai.pl, Kancelaria X).
Możliwe podejścia:
Schema-per-tenant: Oddzielne schematy w bazie danych dla każdej marki. (Bardziej skomplikowane w zarządzaniu).
Discriminator column: Dodanie kolumny brand_id do większości tabel i filtrowanie zapytań na podstawie aktywnej marki. (Prostsze w implementacji, wymaga ostrożności w zapytaniach).
Separate databases: Całkowicie oddzielne bazy danych dla każdej marki. (Największa izolacja, największy narzut).
Dla tego projektu sugerowane jest podejście z discriminator column dla danych, które mogą być współdzielone, oraz ewentualnie konfiguracja per-brand dla szablonów, cenników, itd. Context marki powinien być przekazywany przez nagłówki HTTP lub subdomeny.
10. Deployment
Konteneryzacja: Docker dla wszystkich komponentów.
Orkiestracja: Docker Compose (dla środowiska deweloperskiego/testowego), Kubernetes (dla produkcji).
CI/CD: GitHub Actions / GitLab CI do automatycznego budowania, testowania i wdrażania.
code
Code
### `plan.md`

```markdown
# Plan Realizacji Projektu atomai.pl

## 1. Fazy Projektu

Projekt zostanie podzielony na następujące fazy:

1.  **Faza 0: Analiza i Projektowanie (Aktualna faza)**
    *   Szczegółowa specyfikacja wymagań.
    *   Definicja architektury (backend, frontend, baza danych, AI/NLP).
    *   Projektowanie UI/UX (makiety, prototypy).
    *   Planowanie technologii i narzędzi.
    *   Ocena ryzyka.
2.  **Faza 1: MVP (Minimum Viable Product)**
    *   Podstawowa funkcjonalność do przetestowania kluczowych założeń.
    *   Focus na core logic: wgranie dokumentu -> analiza -> rekomendacja pism -> zakup pism -> pobranie.
    *   Jedna marka (atomai.pl).
3.  **Faza 2: Rozwój i Integracja Funkcjonalności**
    *   Rozszerzenie funkcjonalności MVP.
    *   Integracje z systemami zewnętrznymi (płatności, powiadomienia).
    *   Panel Operatora.
    *   Funkcjonalności użytkownika (historia spraw, zarządzanie profilem).
4.  **Faza 3: Optymalizacja i Skalowalność**
    *   Optymalizacja wydajności.
    *   Zwiększenie skalowalności.
    *   Wdrożenie monitoringu i logowania.
    *   Testy obciążeniowe.
5.  **Faza 4: Rozwój Wielobrandowy i Dodatkowe Funkcje**
    *   Wdrożenie obsługi wielu marek.
    *   Rozszerzenie modułu AI/NLP.
    *   Nowe funkcje (np. abonamenty, system poleceń).
6.  **Faza 5: Utrzymanie i Rozwój Ciągły**
    *   Wsparcie techniczne.
    *   Rozwój nowych funkcji.
    *   Aktualizacje i ulepszenia.

## 2. Plan Działania (MVP - Faza 1)

### Szacowany Czas: 8-12 tygodni

### Tydzień 1-2: Konfiguracja Infrastruktury i Bazowe API

*   **Backend:**
    *   Inicjalizacja projektu FastAPI, konfiguracja środowiska (venv, .env, Poetry/pip-tools).
    *   Ustawienie bazy danych PostgreSQL (Dockerized).
    *   Konfiguracja SQLAlchemy (asynchroniczny silnik).
    *   Bazowe modele (User, Case, Document).
    *   API do rejestracji/logowania użytkownika (bez social login na razie).
    *   API do tworzenia/listowania spraw.
    *   Deployment bazowego API na środowisko deweloperskie.
*   **Frontend:**
    *   Inicjalizacja projektu Next.js/TypeScript.
    *   Konfiguracja Tailwind CSS i Shadcn UI.
    *   Bazowe strony: Home, Login, Register.
    *   Konfiguracja routingu i globalnych layoutów.
    *   Deployment bazowego frontendu.

### Tydzień 3-4: Moduł Wgrywania Dokumentów i Podstawowa Sprawa

*   **Backend:**
    *   Integracja ze storage plików (np. MinIO w Dockerze jako S3-compatible).
    *   API do bezpiecznego przesyłania dokumentów (np. pre-signed URLs).
    *   Rozszerzenie modelu `Document` o url, typ pliku, status.
    *   API do pobierania dokumentów.
    *   API do dodawania kontekstu (tekst, link do nagrania głosowego) do dokumentu.
*   **Frontend:**
    *   Strona "Moje Sprawy" - lista spraw, przycisk "Dodaj Nową Sprawę".
    *   Strona "Zamów Analizę Pisma" (Krok 1: Wgraj pismo) - komponent drag&drop, input file, przycisk "Zrób zdjęcie".
    *   Strona "Zamów Analizę Pisma" (Krok 2: Opisz oczekiwania) - pole tekstowe, przycisk "Nagraj oppic".
    *   Integracja z API wgrywania i dodawania kontekstu.

### Tydzień 5-6: Moduł Analizy Dokumentów (Mock AI)

*   **Backend:**
    *   Konfiguracja Celery z RabbitMQ/Redis (Dockerized).
    *   Task Celery do "analizy" dokumentu (na początku mock - zwraca stały tekst analizy po X sekundach).
    *   API do wyzwalania analizy dokumentu (asynchronicznie).
    *   Model `AnalysisResult` (analysis_text, status).
    *   API do pobierania statusu i wyników analizy.
*   **Frontend:**
    *   Strona "Moje Sprawy" - wyświetlanie statusu analizy (np. "W Trakcie", "Gotowa").
    *   Strona "Szczegóły Sprawy" - podgląd analizy (na razie pełny widok).
    *   Wprowadzenie prostej logiki powiadomień (np. toast po zakończeniu analizy).

### Tydzień 7-8: Moduł Generowania Pism (Mock), Płatności (Mock)

*   **Backend:**
    *   Model `LetterTemplate`, `GeneratedLetter`.
    *   API do rekomendowania pism (na podstawie mockowej analizy).
    *   API do "generowania" pisma (na początku mock - zwraca stały tekst pisma).
    *   Integracja z mockowym systemem płatności (symulacja sukcesu/porażki).
    *   Model `Order`, `OrderItem`, `Transaction`.
    *   API do tworzenia zamówień i obsługi płatności.
*   **Frontend:**
    *   Strona "Szczegóły Sprawy" - wyświetlanie rekomendowanych pism, przycisk "Kup za XX zł".
    *   Strona płatności - wybór mockowej metody płatności, podsumowanie.
    *   Strona potwierdzenia zamówienia.
    *   Widok wygenerowanego pisma (po zakupie), przycisk "Pobierz Pismo".

### Tydzień 9-10: Panel Operatora (MVP) i Ulepszenia UX

*   **Backend:**
    *   Wdrożenie Role-Based Access Control (RBAC) dla operatorów.
    *   API dla panelu operatora (listowanie spraw, podgląd dokumentów, wyników analiz, statusów zadań).
    *   API do ręcznego zatwierdzania analiz i generowania pism przez operatora.
*   **Frontend:**
    *   Podstawowy panel operatora (strony Admin Login, Dashboard z listą zadań).
    *   Komponenty Shadcn UI do tabel i formularzy w panelu operatora.
    *   Ulepszenia UX/UI na stronach klienta (mikrointerakcje, komunikaty).
    *   Dodanie sekcji "O nas", FAQ na stronie głównej.

### Tydzień 11-12: Testy, Refaktoryzacja, Dokumentacja i Przygotowanie do Produkcji

*   **Cały System:**
    *   Przeprowadzenie testów end-to-end, integracyjnych i jednostkowych.
    *   Refaktoryzacja kodu, poprawa jakości, usuwanie długów technicznych.
    *   Przygotowanie dokumentacji technicznej i użytkowej.
    *   Konfiguracja środowiska produkcyjnego (monitoring, logowanie, backupy).
    *   Testy bezpieczeństwa (podstawowe).

## 3. Kamienie Milowe

*   **MVP Gotowe:** Koniec Fazy 1. Pełen cykl wgrania dokumentu, mock analiza, mock generowanie, mock płatność, pobranie.
*   **W pełni zintegrowane płatności:** Koniec Fazy 2.
*   **Działający AI/NLP Microservice:** Koniec Fazy 2 (integracja z prawdziwym modelem).
*   **Kompletny Panel Operatora:** Koniec Fazy 2.
*   **Wdrożenie obsługi wielu marek:** Koniec Fazy 4.

## 4. Zarządzanie Projektem

*   **Metodologia:** Agile (Scrum/Kanban) z tygodniowymi sprintami i codziennymi standupami.
*   **Narzędzia:** Jira/Trello do zarządzania zadaniami, Git do kontroli wersji (GitHub/GitLab), Slack/Teams do komunikacji.
*   **Kontrola Wersji:** Gitflow.
*   **CI/CD:** Automatyzacja testów i deploymentu.

## 5. Ryzyka i Działania Zapobiegawcze

*   **Złożoność AI/NLP:** Rozpoczęcie od MVP z mockowym AI, stopniowe wdrażanie bardziej zaawansowanych modeli.
*   **Integracje Zewnętrzne:** Dokładne testowanie API dostawców, fallbacki.
*   **Bezpieczeństwo Danych:** Regularne audyty, stosowanie najlepszych praktyk, szyfrowanie.
*   **Skalowalność:** Projektowanie z myślą o skalowalności od początku, monitoring wydajności.
*   **Zgodność Prawna (RODO, regulaminy):** Konsultacje z prawnikiem od początku projektu.
kod.md
code
Markdown
# Przykładowy Kod i Struktury Projektu

Poniżej przedstawiono przykładowe fragmenty kodu i struktury plików dla kluczowych komponentów systemu, zgodnie z wybraną architekturą.

## 1. Struktura Projektu Backend (Python/FastAPI)
backend/
├── app/
│ ├── init.py
│ ├── main.py # Główna aplikacja FastAPI
│ ├── api/
│ │ ├── init.py
│ │ ├── v1/
│ │ │ ├── init.py
│ │ │ ├── endpoints/
│ │ │ │ ├── init.py
│ │ │ │ ├── auth.py # Endpointy autoryzacji
│ │ │ │ ├── users.py # Endpointy zarządzania użytkownikami
│ │ │ │ ├── cases.py # Endpointy zarządzania sprawami
│ │ │ │ ├── documents.py # Endpointy zarządzania dokumentami
│ │ │ │ ├── analyses.py # Endpointy analiz
│ │ │ │ ├── letters.py # Endpointy pism
│ │ │ │ ├── payments.py # Endpointy płatności
│ │ │ │ └── admin.py # Endpointy panelu operatora
│ ├── core/
│ │ ├── init.py
│ │ ├── config.py # Konfiguracja aplikacji
│ │ ├── security.py # Obsługa JWT, hashowanie haseł
│ │ └── dependencies.py # Zależności FastAPI (np. get_current_user)
│ ├── crud/ # Operacje CRUD na bazie danych
│ │ ├── init.py
│ │ ├── users.py
│ │ ├── cases.py
│ │ ├── documents.py
│ │ └── ...
│ ├── db/
│ │ ├── init.py
│ │ ├── base.py # Bazowe deklaracje SQLAlchemy
│ │ ├── session.py # Konfiguracja sesji DB
│ │ └── models.py # Modele SQLAlchemy
│ ├── schemas/ # Schematy Pydantic
│ │ ├── init.py
│ │ ├── user.py
│ │ ├── case.py
│ │ ├── document.py
│ │ └── ...
│ ├── services/ # Logika biznesowa (poza CRUD)
│ │ ├── init.py
│ │ ├── document_storage.py # Obsługa S3
│ │ ├── email_service.py # Wysyłka e-maili
│ │ ├── sms_service.py # Wysyłka SMS
│ │ ├── payment_service.py # Integracja z bramkami płatności
│ │ ├── analysis_tasks.py # Zadania Celery
│ │ └── letter_generation.py # Logika generowania pism
│ ├── workers/ # Celery workers
│ │ ├── init.py
│ │ └── tasks.py # Definicje zadań Celery
├── tests/
│ ├── init.py
│ ├── api/
│ │ └── v1/
│ │ └── test_auth.py
│ ├── crud/
│ ├── services/
├── migrations/ # Migracje Alembic
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── requirements.txt / pyproject.toml # Zależności projektu
└── README.md
code
Code
## 2. Przykład Modeli SQLAlchemy (backend/app/db/models.py)

```python
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Boolean, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime
import enum

Base = declarative_base()

class UserRole(enum.Enum):
    CLIENT = "client"
    OPERATOR = "operator"
    ADMIN = "admin"

class DocumentStatus(enum.Enum):
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    ANALYZED = "analyzed"
    ERROR = "error"

class PaymentStatus(enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.CLIENT, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

    cases = relationship("Case", back_populates="owner")

class Case(Base):
    __tablename__ = "cases"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String, default="new") # np. "new", "document_uploaded", "analysis_requested", "analysis_completed", "letter_purchased"
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

    owner = relationship("User", back_populates="cases")
    documents = relationship("Document", back_populates="case")
    analyses = relationship("Analysis", back_populates="case")
    generated_letters = relationship("GeneratedLetter", back_populates="case")

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=False)
    file_url = Column(String, nullable=False)
    original_filename = Column(String, nullable=False)
    file_type = Column(String, nullable=False) # np. "application/pdf", "image/jpeg"
    status = Column(Enum(DocumentStatus), default=DocumentStatus.UPLOADED)
    uploaded_at = Column(DateTime, default=datetime.datetime.now)

    case = relationship("Case", back_populates="documents")
    context = relationship("DocumentContext", back_populates="document", uselist=False)

class DocumentContext(Base):
    __tablename__ = "document_contexts"
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    text_context = Column(Text, nullable=True)
    voice_note_url = Column(String, nullable=True) # Link do nagrania głosowego

    document = relationship("Document
