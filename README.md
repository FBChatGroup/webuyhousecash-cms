# WeBuyHouseCash.com.au

A Next.js application for a cash home buyer business in Melbourne, Australia.

## Deployment to Vercel

### Prerequisites

1. A Vercel account
2. A PostgreSQL database (we recommend using Vercel Postgres)

### Setup Steps

1. **Fork or clone this repository**

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com) and create a new project
   - Import your GitHub repository
   - Configure the project settings

3. **Set up environment variables**
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXT_PUBLIC_SITE_URL`: The URL of your deployed site

4. **Optional environment variables**
   - `NEXT_PUBLIC_GA_ID`: Google Analytics ID
   - `NEXT_PUBLIC_GTM_ID`: Google Tag Manager ID
   - `NEXT_PUBLIC_FB_PIXEL_ID`: Facebook Pixel ID

5. **Deploy**
   - Vercel will automatically build and deploy your application
   - The first deployment will run database initialization and seed initial data

### Database Setup

The application uses direct PostgreSQL connections via the 'pg' package. On the first deployment:

1. The initialization script will create all necessary tables
2. It will seed initial data for SEO settings and business info

### Troubleshooting

If you encounter any issues with the database connection:

1. Verify your `DATABASE_URL` is correct
2. Check that your database is accessible from Vercel's servers
3. You may need to manually run the initialization script: `node scripts/init-db.js`

## Local Development

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your database details
3. Run `npm install`
4. Run `npm run dev`

## Features

- Public-facing website for cash home buyers
- Admin dashboard for managing content
- SEO optimization with structured data
- Business information management
- Testimonials system
- FAQ management
- Location-based pages

