# Notes Frontend (Nuxt 3)

Features:
- User authentication (login, logout)
- CRUD for notes (create, view, edit, delete)
- List and search notes
- Responsive, modern light theme with top nav, sidebar, and modal dialogs

Configuration:
- Copy `.env.example` to `.env` and set:
  - NUXT_PUBLIC_API_BASE=http://localhost:8000

Assumed Backend Endpoints:
- POST /auth/login -> { token, user }
- POST /auth/logout
- GET /auth/me -> user
- GET /notes -> Note[]
- POST /notes -> Note
- PUT /notes/:id -> Note
- DELETE /notes/:id -> 204

Install & Run:
- npm install
- npm run dev

```bash
cp .env.example .env
npm i
npm run dev
```

Security:
- Token stored in localStorage as `auth_token`. Ensure HTTPS in production and enable secure cookies/JWT as appropriate on backend.
