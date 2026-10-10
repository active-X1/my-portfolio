# Cyrus Akacha Cyprian: Developer Portfolio

A multi-page portfolio built with Next.js (App Router), React, TypeScript and Tailwind CSS.
Content lives in typed data files, separate from the components that display it.

## Stack

- Next.js 15 (App Router), React 19, TypeScript (strict)
- Tailwind CSS 3 with semantic colour tokens (dark and light themes)
- shadcn/ui-style primitives (`src/components/ui`), hand-written because the shadcn CLI was not available while scaffolding
- Lucide icons, Simple Icons for technology and social logos
- Zod for form validation, react-markdown + highlight.js for blog posts
- Optional services: Supabase (reviews) and Resend (contact email)

## Routes

`/`, `/about`, `/projects`, `/projects/[slug]`, `/stacks`, `/blog`, `/blog/[slug]`, `/gallery`, `/certificates`, `/reviews`, `/contact`

## Project structure

```
src/app/            routes, metadata, sitemap, robots, API routes (api/reviews, api/contact)
src/components/     layout, ui primitives, and one folder per feature
src/data/           all content: site, socials, projects, skills, timeline, gallery, certificates, reviews
src/lib/            helpers: validation, blog loader, reviews, rate limiting, data integrity checks
content/blog/       Markdown posts
supabase/schema.sql reviews table with Row Level Security
public/images/      portrait and project screenshots
```

## Commands

```bash
npm install
npm run dev         # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm start
```

## Editing content

**Site details, email, availability badge, default theme:** `src/data/site.ts`.
`themeDefault: "dark"` always starts dark; `"system"` follows the visitor's OS when nothing is saved.

**Add a project:** add an object to `src/data/projects.ts`, put its screenshot in `public/images/projects/`.
Fill `live` only with a URL you have checked. Any section you leave out (problem, architecture,
contribution, decisions, lessons) is simply not shown.

**Technology percentages on projects:** `breakdown` is a list of `{ tech, percent }` that must total exactly 100
(the build fails otherwise). Set `breakdownBasis` to `"estimate"` (your own estimate, labelled as such) or
`"measured"` (only if you calculated it from the source). Omit `breakdown` if you do not know.

**Skills and percentages:** `src/data/skills.ts`. `percent` is self-assessed practical usage, not objective ability.
Use `usage: "frequent" | "used" | "learning" | "planned"`. Leave `percent` off for skills you have not started.
Frequent skills are shown first, the rest alphabetically.

**Blog posts:** copy `content/blog/_post-template.md` to a new `.md` file and fill in the front matter.

**Certificates:** add objects to `src/data/certificates.ts`. Add only real ones; include `verifyUrl` when possible.

**Gallery:** add entries to `src/data/gallery.ts` with accessible `alt` text.

**Timeline and learning focus:** `src/data/timeline.ts` and `learningFocus` in `src/data/skills.ts`.

## Reviews and moderation

Reviews are stored in Supabase, never in browser storage.

1. Create a Supabase project and run `supabase/schema.sql` in the SQL editor.
2. Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` (the public anon key; never use the service-role key here).
3. Submissions are inserted with status `pending`. Row Level Security lets the public read only `approved` rows and
   insert only `pending` rows. There are no update or delete policies.
4. To moderate, open the table in the Supabase dashboard and set `status` to `approved` or `rejected`.

Without these variables the review form shows that submissions are not enabled and nothing is sent.
Spam protection: a hidden honeypot field, server-side validation, and an in-memory rate limit. The rate limit is per
serverless instance, so add a shared limiter or CAPTCHA if you see abuse.

## Contact form delivery

The form posts to `/api/contact`, which sends email through Resend. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and
`CONTACT_FROM_EMAIL` (a sender on a domain you have verified with Resend). Without them the API answers 503 and the
form says the message was not sent.

## Environment variables

See `.env.example`. All are optional for the site to build and run:
`NEXT_PUBLIC_SITE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
Never commit a real `.env` file.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel (framework preset: Next.js).
3. Add the environment variables above in Project Settings.
4. Deploy, then set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy so the sitemap and metadata use it.

## Theme toggle

The toggle shows a sun while the dark theme is active and a moon while the light theme is active (the icon of
the theme you will switch to). The preference is saved in `localStorage` and applied before first paint.
