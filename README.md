# Next.js SSR Encrypted Patient Records Dashboard

A Next.js application demonstrating **server-side encryption/decryption** of sensitive medical data using **AES-256-GCM**.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Encryption](https://img.shields.io/badge/Encryption-AES--256--GCM-green?logo=letsencrypt)

---

## Features
A small Next.js (14.2.5 + React 18) demo app showing:

- **Server-Side Rendering** with encrypted payload
- **AES-256-GCM symmetric encryption** using Node crypto
- **Responsive** 1–3 column card grid
- **Search and Sort** (client-side, animated transitions)
- **Framer Motion** Smooth card enter / exit animations
- Implemented with **App Router (app/)**
- **TypeScript** for type safety

---

### Design Choices

- **Framer Motion** for easy, declarative animations
- Plain CSS for flexibility and readability
- **App Router (SSR)** to align with latest Next.js standards
- Clear, readable, minimal abstraction
- No unnecessary dependencies (Tailwind, ESlint, etc.)

---

## Run Instructions

### 1. Clone & Install

```bash
git clone  https://github.com/VishalDudeja/JSC-FrontEnd-Task.git
cd Fe-task
npm install
```

### 2. Generate Encryption Key (Windows CMD)

```bash
# Generate a secure 32-byte key
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Copy the output** (example):
```
aSunY7VVQbOomBoxwjEe8a7Stbe3dn0X7izaChkrh8=
```

### 3. Create Environment File

Create `.env.local` in the project root:

```bash
ENCRYPTION_KEY=aSunY7VVQbOomBoxwjEe8a7Stbe3dn0X7izaChkrh8=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run App

```bash
npm run dev
```

### App will start at **http://localhost:3000**

### 5. Testing

Run Jest tests:

```bash
npm test
```

---

## 📁 Project Structure

```
next-ssr-patient-records/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── encrypted/
│   │   │       └── route.ts           # API route serving encrypted data
│   │   │
│   │   ├── components/
│   │   │   ├── Card.tsx               # Single animated card
│   │   │   ├── CardList.tsx           # Grid of cards + search/sort
│   │   │   └── SearchSortBar.tsx      # Search + Sort controls (if separate)
│   │   │
│   │   ├── globals.css                # Global styling (normal CSS)
│   │   ├── layout.tsx                 # Root layout for App Router
│   │   └── page.tsx                   # SSR page (fetch + decrypt)
│   │
│   ├── lib/
│   │   └── crypto.ts                  # AES-256-GCM encryption/decryption utils
│   │
│   └── types/
│       └── index.ts                   # (Optional) Card type definitions
│
├── __tests__/                         # ✅ Jest tests (to be added)
│   ├── crypto.test.ts                 # Encryption/decryption tests
│   ├── Card.test.tsx                  # Component rendering test
│   └── CardList.test.tsx              # Search/sort animation behavior
│
├── public/
│   └── favicon.ico
│
├── .env.local                         # ENCRYPTION_KEY=base64encodedkey
│
├── jest.config.js                     # ✅ Jest + React Testing Library config
├── jest.setup.ts                      # ✅ Test environment setup
│
├── package.json
├── tsconfig.json
├── next.config.mjs
└── README.md                          # ✅ Updated wit

```

---

## How It Works

### Data Flow

```
API Route (encrypts) → Server (decrypts) → Client (displays)
```

---

## Features Demo

### Search
Type in the search box to filter surveys by title, category, or content.

### Sort
Use the dropdown to sort by date, title, or status.

### Animations
- Cards animate on page load (stagger effect)
- Hover over cards for elevation effect
- Smooth transitions when filtering

---

## Tech Stack

- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: TypeScript
- **Encryption**: Node.js crypto (AES-256-GCM)
- **Animations**: Framer Motion

---

## Author

**Vishal Dudeja**
- Email: vishaldudeja94@gmail.com
- GitHub: [@VishalDudeja](https://github.com/VishalDudeja)

---

**Built with Next.js 14, TypeScript & AES-256-GCM Encryption** 🔒
