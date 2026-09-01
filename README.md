# Mahadi & Mehran — Digital Legacy

Bilingual English/Bangla Astro website for MD Mahadi Hasan (Tonmoy) and his son, MD Mehran Hasan (Turaj).

## Run locally

```bash
npm install
npm run dev
```

Create a local `.env` file from `.env.example` and set the private archive password:

```env
ARCHIVE_PASSWORD=your-family-password
```

## Deploy on Vercel

1. Import this GitHub repository into Vercel.
2. Keep the framework preset as **Astro** and the production branch as `main`.
3. Add `ARCHIVE_PASSWORD` under Vercel Project Settings → Environment Variables for **Production** and **Preview**.
4. Redeploy after saving the environment variable.

The public pages are available at `/` and `/bn/`. The private archive button only returns the Google Drive link after the server verifies the password.
