# Salon Booking System (MERN Stack)

A full-stack salon booking application built with MongoDB, Express, React (Vite), and Node.js.

## Live

- Frontend (GitHub Pages): https://hemant5305.github.io/Salon_Booking_System/
- Backend API (Render): https://salon-booking-api-4w1o.onrender.com
- Seeded admin login: `admin@salon.com` / `admin123` — change this password after logging in.

Note: the Render free plan spins the API down after inactivity, so the first request after idling can take ~30-50s to wake up.

## Features

- Customer signup/login (JWT auth)
- Browse services and book appointments
- View and cancel your own bookings
- Admin dashboard: manage services (add/edit/delete) and manage all bookings (update status)

## Project Structure

```
server/   Express + MongoDB API
client/   React (Vite) frontend
```

## Local Setup

### Backend

```bash
cd server
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev            # http://localhost:5000
npm run seed            # creates an admin user + sample services (optional)
```

Seeded admin login: `admin@salon.com` / `admin123` (change the password after first login in production).

### Frontend

```bash
cd client
cp .env.example .env   # set VITE_API_URL to your backend URL
npm install
npm run dev             # http://localhost:5173
```

## Deployment

### Backend on Render

1. Push this repo to GitHub.
2. In Render, create a new **Web Service** from this repo (or use the included `render.yaml` Blueprint).
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `npm start`
3. Add environment variables in Render:
   - `MONGO_URI` — your MongoDB Atlas connection string
   - `JWT_SECRET` — any long random string
   - `CLIENT_URL` — `https://<your-github-username>.github.io` (origin only, no path — browsers send `Origin` without the page path, so a path here will break CORS)
4. Deploy. Note the resulting Render URL, e.g. `https://salon-booking-api.onrender.com`.

### Frontend on GitHub Pages

1. In the GitHub repo, go to **Settings → Pages** and set the source to **GitHub Actions**.
2. Go to **Settings → Secrets and variables → Actions → Variables** and add a repository variable:
   - `VITE_API_URL` = `https://<your-render-service>.onrender.com/api`
3. Push to the `main` branch (or run the "Deploy Frontend to GitHub Pages" workflow manually from the Actions tab). The included workflow (`.github/workflows/deploy-pages.yml`) builds the client and publishes it to GitHub Pages automatically.
4. The live site will be available at `https://<your-github-username>.github.io/Salon_Booking_System/`.

Note: `client/vite.config.js` and `client/src/main.jsx` are already configured with the base path `/Salon_Booking_System/` to match this repo name.
