# IVAWORKS

Monorepo for the IVA Work Solutions platform.

## Projects

| App | Path | Dev port | Description |
|-----|------|----------|-------------|
| **Frontend** | `frontend/` | 5173 | Public marketing website |
| **Admin** | `admin/` | 5174 | Admin panel (jobs & blogs) |
| **Backend** | `backend/` | 5000 | Express + MySQL API |

## Development

```bash
# Install dependencies (from repo root)
npm install

# Run public website
npm run dev:frontend

# Run admin panel (separate terminal)
npm run dev:admin

# Run backend API (separate terminal)
npm run dev:backend
```

## Build

```bash
npm run build          # both apps
npm run build:frontend
npm run build:admin
```

## Environment

- `frontend/.env` — `VITE_ADMIN_URL` (default: `http://localhost:5174`)
- `admin/.env` — `VITE_FRONTEND_URL` (default: `http://localhost:5173`)
- `backend/.env` — see `backend/.env.example` (DB, JWT, CORS)

## Notes

- **Backend API** stores jobs and blogs in MySQL. See `backend/README.md` for setup.
- **Frontend** loads published jobs/blogs from `GET /api/public/*`.
- **Admin** authenticates via JWT (`POST /api/auth/login`) and manages content via `/api/jobs` and `/api/blogs`.

### Run full stack locally

```bash
# Terminal 1 — API (requires MySQL + .env)
cd backend && npm run dev

# Terminal 2 — public site
npm run dev:frontend

# Terminal 3 — admin panel
npm run dev:admin
```
