# CV Website — Next.js + Supabase + Vercel

Dynamic CV website with password-protected admin editing.

## Stack
- **Frontend**: Next.js 14 + Tailwind CSS
- **Database**: Supabase (free tier)
- **Hosting**: Vercel (free tier)
- **Fonts**: DM Serif Display + DM Sans + DM Mono

---

## Setup Instructions

### 1. Supabase Setup
1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to **SQL Editor** and run the contents of `supabase-setup.sql`
4. Go to **Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Local Development
```bash
cp .env.local.example .env.local
# Fill in your Supabase keys and set ADMIN_PASSWORD

npm install
npm run dev
# Open http://localhost:3000
```

### 3. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# https://vercel.com/your-project/settings/environment-variables
# Add all variables from .env.local.example
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## Usage

### Public CV
Visit `/` — your CV is displayed beautifully.
Use the **Print / PDF** button to export.

### Admin Editor
Visit `/admin` — enter your `ADMIN_PASSWORD`.

Tabs available:
- **basics** — name, title, contact info, about
- **experience** — work history with bullet points
- **projects** — projects with links
- **education** — degrees + certifications
- **skills** — all skill tags

Click **Save changes** — updates live on your CV instantly.

---

## Customization

- Edit `lib/defaultCV.ts` to change the fallback data
- Edit `app/globals.css` to change colors/fonts
- The accent color is `--accent: #c84b2f` (terracotta red)
