# IVAWORKS Backend API

Node.js + Express + MySQL REST API for the employment services platform.

## Architecture

```
src/
├── config/          # DB pool, environment
├── controllers/     # Thin HTTP handlers
├── services/        # Business logic
├── models/          # SQL queries only
├── routes/          # Route definitions
├── middleware/      # Auth, errors, uploads
├── validations/     # Request validation
├── utils/           # JWT, slugify, responses
├── uploads/         # Blog image storage
├── app.js           # Express setup
└── server.js        # Entry point
```

## Setup

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Create database and admin account
# Local (XAMPP): creates database ivaworks
mysql -u root -p < database/schema.sql
# Hostinger / shared hosting: select your DB in phpMyAdmin, then import:
#   database/schema.hostinger.sql
node scripts/set-admin-password.js "YourSecurePassword"

# 3. Install & run
npm install
npm run dev
```

Default admin username: `admin` (created by the script above). No default password is stored in the repository.

```bash
node scripts/set-admin-password.js "YourSecurePassword"
# optional: custom username / email
node scripts/set-admin-password.js "YourSecurePassword" admin admin@yourdomain.com
```

Never commit or document real passwords in git.

## API Endpoints

### Auth
| Method | Route | Auth |
|--------|-------|------|
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | JWT |

### Dashboard
| Method | Route | Auth |
|--------|-------|------|
| GET | `/api/dashboard/stats` | JWT |

### Jobs (Admin)
| Method | Route |
|--------|-------|
| GET | `/api/jobs` |
| GET | `/api/jobs/slug/:slug` |
| GET | `/api/jobs/:id` |
| POST | `/api/jobs` |
| PUT | `/api/jobs/:id` |
| DELETE | `/api/jobs/:id` |
| PATCH | `/api/jobs/:id/publish` |
| PATCH | `/api/jobs/:id/unpublish` |

### Blogs (Admin)
| Method | Route |
|--------|-------|
| GET | `/api/blogs` |
| GET | `/api/blogs/slug/:slug` |
| GET | `/api/blogs/:id` |
| POST | `/api/blogs` |
| PUT | `/api/blogs/:id` |
| DELETE | `/api/blogs/:id` |
| PATCH | `/api/blogs/:id/publish` |
| PATCH | `/api/blogs/:id/unpublish` |

### Public
| Method | Route |
|--------|-------|
| GET | `/api/public/jobs` |
| GET | `/api/public/jobs/:slug` |
| GET | `/api/public/blogs` |
| GET | `/api/public/blogs/:slug` |
| POST | `/api/public/applications` | multipart — job apply & general application |
| POST | `/api/public/contact` | employer inquiry form |

## Email Notifications

When someone submits an **Apply Now**, **General Application**, or **Employer Inquiry** form, the backend:

1. Saves to MySQL (unchanged)
2. Shows in the admin dashboard (unchanged)
3. Sends an email to `NOTIFY_EMAIL` with all form fields
4. Attaches the **resume** for application submissions

Configure SMTP in `.env`:

```env
EMAIL_ENABLED=true
NOTIFY_EMAIL=you@yourcompany.com
MAIL_FROM="IVA Works <noreply@yourcompany.com>"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password
```

**Gmail:** enable 2FA and create an [App Password](https://myaccount.google.com/apppasswords).

If email is misconfigured, the form still succeeds — errors are logged in the backend console only.

## Response Format

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

## Scripts

```bash
npm run dev            # nodemon dev server
npm start              # production start
npm run hash-password  # generate bcrypt hash
npm run set-admin-password -- "YourSecurePassword"  # reset admin login password
```
