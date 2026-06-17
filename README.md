# E-Commerce Monolith (Vulnerable)

## Deskripsi

Aplikasi e-commerce monolitik sederhana menggunakan Node.js + Express. Repository ini **sengaja dibuat rentan** untuk pengujian sistem DevSecOps adaptif.

## Ground Truth

| Atribut | Nilai |
|---------|-------|
| Arsitektur | Monolith |
| Domain | E-commerce |
| Bahasa | Node.js (JavaScript) |
| Framework | Express.js |
| Database | SQLite (via better-sqlite3) |
| Deployment | Docker |
| Tingkat Keamanan | Vulnerable (multi-issue) |

## Vulnerability yang Disuntikkan

1. **Hardcoded secrets** — Stripe API key dan JWT secret di `.env` dan source code.
2. **SQL Injection** — query string concatenation di `/checkout` dan `/orders`.
3. **Cross-Site Scripting (XSS)** — output user input tanpa escape di `/products/:id/review`.
4. **Cross-Site Request Forgery (CSRF)** — form checkout tanpa token CSRF.
5. **Weak authentication** — password disimpan plaintext, tidak ada rate limiting.
6. **Insecure cookies** — cookie session tanpa `httpOnly` / `secure` flag.
7. **Vulnerable dependencies** — `lodash@4.17.4`, `express@4.16.0`.
8. **Dockerfile misconfiguration** — run as root, tidak pin base image digest, expose port luas.
9. **Missing input validation** — tidak ada sanitasi pada request body.

## Cara Menjalankan

```bash
npm install
npm start
```

Aplikasi berjalan di port `3000`.

## Endpoint Utama

- `GET /` — home
- `POST /auth/register` — registrasi user
- `POST /auth/login` — login user
- `GET /products` — daftar produk
- `GET /products/:id` — detail produk
- `POST /products/:id/review` — tambah review (XSS)
- `POST /checkout` — proses checkout (SQLi + CSRF)
- `GET /orders` — daftar order (SQLi)

## Hasil yang Diharapkan dari Sistem

- **Domain detection:** e-commerce
- **Technology detection:** Node.js, Express, SQLite
- **Architecture detection:** monolith
- **Deployment detection:** Docker
- **Security needs:** secret scan, SAST (SQLi, XSS, CSRF, auth bypass), dependency scan, container scan
- **Risk score:** tinggi
- **Standards coverage:** rendah (PCI DSS gap besar)
