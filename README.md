# Family Tree

A web-based family tree visualization.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────┐
│   Frontend      │     │   Backend (Rust) │     │  SQLite  │
│   (Vite + Web   │────▶│   (actix-web)    │────▶│  DB      │
│    Components)  │     │   :8080          │     │          │
└─────────────────┘     └──────────────────┘     └──────────┘
```

## Quick Start

### 1. Start the backend (Docker)

```bash
docker compose up --build
```

### 2. Start the frontend (dev server)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

The Vite dev server proxies `/api` requests to the backend on port 8080.

### 3. Build for production

```bash
# Backend
cd backend
docker build -t family-tree-backend .

# Frontend
cd frontend
npm run build
```

## Project Structure

```
├── backend/           # Rust + SQLite API server
│   ├── src/
│   │   ├── main.rs    # Entry point, server setup
│   │   ├── models.rs  # Data models (Person, Family)
│   │   ├── db.rs      # Database initialization + seeding
│   │   └── routes.rs  # API endpoints
│   ├── Cargo.toml
│   └── Dockerfile
├── frontend/          # Vite + vanilla web components
│   ├── src/
│   │   ├── tree/      # Family tree page & data layer
│   │   ├── components/# App shell
│   │   ├── utils/     # Router
│   │   └── styles/    # Global CSS
│   └── package.json
├── docker-compose.yml
└── README.md
```

## API Reference

See [backend/README.md](backend/README.md) for full API documentation.

| Method | Path                      | Description              |
|--------|---------------------------|--------------------------|
| `GET`  | `/api/health`             | Health check             |
| `GET`  | `/api/family`             | Full family tree         |
| `GET`  | `/api/family/person/:id`  | Single person by ID      |
