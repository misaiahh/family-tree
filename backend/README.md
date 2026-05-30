# Family Tree Backend

Rust + SQLite REST API for the family tree frontend.

## Quick Start

### With Docker (Recommended)

```bash
# From the project root:
docker compose up --build
```

The API will be available at `http://localhost:8080`.

### Local Development

```bash
cd backend
cargo run
```

The server starts on `http://0.0.0.0:8080` by default.

## Environment Variables

| Variable        | Default              | Description              |
|-----------------|----------------------|--------------------------|
| `DATABASE_URL`  | `file:family_tree.db`| SQLite database path     |
| `HOST`          | `0.0.0.0`            | Bind address             |
| `PORT`          | `8080`               | HTTP port                |

## API Endpoints

| Method | Path                      | Description              |
|--------|---------------------------|--------------------------|
| `GET`  | `/api/health`             | Health check             |
| `GET`  | `/api/family`             | Full family tree         |
| `GET`  | `/api/family/person/:id`  | Single person by ID      |

### Example Responses

**GET /api/health**
```json
{"success":true,"data":{},"error":null}
```

**GET /api/family**
```json
{
  "success": true,
  "data": {
    "parents": [
      {
        "id": "micky",
        "name": "Micky",
        "role": "Dad",
        "birth_year": 1985,
        "death_year": null,
        "photo": null,
        "bio": null,
        "notes": null
      },
      {
        "id": "jen",
        "name": "Jen",
        "role": "Mom",
        "birth_year": 1987,
        "death_year": null,
        "photo": null,
        "bio": null,
        "notes": null
      }
    ],
    "children": [
      {
        "id": "olivia",
        "name": "Olivia",
        "role": "Daughter",
        "birth_year": 2010,
        "death_year": null,
        "photo": null,
        "bio": null,
        "notes": null
      },
      {
        "id": "olenna",
        "name": "Olenna",
        "role": "Daughter",
        "birth_year": 2012,
        "death_year": null,
        "photo": null,
        "bio": null,
        "notes": null
      }
    ]
  },
  "error": null
}
```

**GET /api/family/person/micky**
```json
{
  "success": true,
  "data": {
    "id": "micky",
    "name": "Micky",
    "role": "Dad",
    "birth_year": 1985,
    "death_year": null,
    "photo": null,
    "bio": null,
    "notes": null
  },
  "error": null
}
```

## Tech Stack

- **Web Framework:** [actix-web](https://actix.rs) 4
- **Database:** SQLite via [sqlx](https://github.com/launchbadge/sqlx) 0.8
- **Serialization:** serde + serde_json
- **Container:** Multi-stage Docker build (debian-slim runtime)
