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

`/`, `/about`, `/projects`, `/projects/[slug]`, `/technologies` (old `/stacks` redirects here), `/journey`, `/blog`, `/blog/[slug]`, `/gallery`, `/certificates`, `/reviews`, `/contact`

## Project structure

```
src/app/            routes, metadata, sitemap, robots, API routes (api/reviews, api/contact)
src/components/     layout (header, mobile nav, footer), ui primitives, one folder per feature
src/data/           all content: site, about, socials, navigation, projects, technologies, timeline, gallery, certificates, reviews
src/lib/            helpers: validation, blog loader, reviews, rate limiting, data integrity checks
content/blog/       Markdown posts
supabase/schema.sql reviews table with Row Level Security
public/images/      portrait and project images
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

**Add a project:** add an object to `src/data/projects.ts`. Projects are grouped as Web Applications, Desktop Applications,
Automation & AI or Interactive Applications; `featured: true` adds it to the Featured tab and the home page.
There are no beginner/intermediate/advanced labels.

**Project images:** every project has a themed SVG placeholder (`public/images/projects/<slug>-placeholder.svg`) used on its card and at
the top of its page. Real screenshots go in the project's `screenshots` list in `src/data/projects.ts` and appear under
"Screenshots" on the project page (click one to open it full size). Add `fit: "contain"` for small or unusually shaped screenshots.

**GitHub language statistics:** `languageStats` holds the percentages GitHub reports for the repository. They describe code,
not skill, and are labelled that way on every page. Each set must total 100 (the build fails otherwise). They are static
values; refresh them by copying the numbers from the repository's Languages bar. Leave `languageStats` out when unknown.

**Technologies:** `src/data/technologies.ts`. Only `proficiency: "core"` (Python, JavaScript) and `"good"` (React,
TypeScript) are set. Do not add scores for other technologies unless you are confident in them.

**Blog posts:** copy `content/blog/_post-template.md` to a new `.md` file and fill in the front matter. The file name becomes the permanent article URL (`/blog/<file-name>`), and every article page includes Copy link, native Share and WhatsApp/X/LinkedIn share links. Set `NEXT_PUBLIC_SITE_URL` so the social share links and metadata use your real domain.

**Certificates, gallery, timeline:** `src/data/certificates.ts`, `src/data/gallery.ts`, `src/data/timeline.ts`.

## FAQ page, screenshot viewer and project progress

- **FAQ:** `/faq` is built from `src/data/faqs.ts` (three questions to start with). The same answers are added to the AI assistant's knowledge and
  published as FAQ structured data. Add more entries there.
- **Screenshot viewer:** clicking a screenshot on a project page, or an image in the gallery, opens it in a pop-up on the same page with a short
  description under it (arrows or arrow keys move between images; Escape, the close button or a click outside closes it). The description comes
  from each screenshot's `caption` in `src/data/projects.ts`, or from the gallery entry's `description`.
- **Project progress:** set `progress` on a project (0-100) in `src/data/projects.ts`. Finished projects (no value, or 100) show a round green tick
  with "Complete". Anything lower shows a clock-style ring filled to that percentage. Student Hub is set to 80.
- **AI knowledge:** the assistant also reads project completion, project page links, blog articles and the list of site pages automatically.

## Responsive behaviour

Mobile uses a two-column project grid with compact cards (clamped text, small tags, icon links), tablets use three columns
and large screens use four, with the page container and spacing growing at each step. Headings use fluid `clamp()` sizes
defined in `tailwind.config.ts`. The mobile menu has an animated toggle, closes on link tap, outside tap and Escape,
locks page scroll, keeps keyboard focus inside the menu and renders in a portal.

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

The form posts to `/api/contact`, which sends email through Resend. `RESEND_API_KEY` is required; `CONTACT_TO_EMAIL` and
`CONTACT_FROM_EMAIL` are optional (see the assistant notes above). Without the key the API answers 503 and the form says the message
was not sent.

## AI assistant

A floating robot button (bottom right) opens a chat that answers questions about Cyrus only. On a visitor's first page
view it shows a greeting bubble for 3 seconds, then fades it out.

- The server route `src/app/api/chat/route.ts` calls OpenRouter. The key lives only in `OPENROUTER_API_KEY` and is never sent
  to the browser. `OPENROUTER_MODEL` is optional (default `openai/gpt-4o-mini`).
- What it knows comes from the site's own data (projects, technologies, about text, journey, contact details), built into the
  prompt by `src/lib/assistant.ts`. Add your own facts and exact answers in `src/data/ai-knowledge.ts`.
- If a question is about Cyrus but not covered, it gives your email and phone number. Off-topic questions are declined.
- Without a key the widget says it is not switched on and shows your email and phone.
- Requests are validated, limited to short messages and rate limited per IP (in memory, per serverless instance).
  Set a spending limit on your OpenRouter key.
- Change the phone number in `src/data/site.ts`.
- **Age:** `birthDate` in `src/data/ai-knowledge.ts` is used on the server only to compute Cyrus's current age. The assistant is
  told to share the age, not the exact date. Delete that line and the age rule in `src/lib/assistant.ts` to stop sharing it.
- **Emailing Cyrus:** a visitor can ask the assistant to message you or press "Email Cyrus". The assistant only *drafts* the email
  (name, their email address, message). The visitor reviews it and presses Send, which posts to `/api/contact`, so the email goes to
  `CONTACT_TO_EMAIL` (default cyrusakacha@gmail.com) through Resend. Only you can be emailed, it is rate limited, and nothing is
  reported as sent unless Resend accepted it. It needs `RESEND_API_KEY`. With no `CONTACT_FROM_EMAIL`, Resend's test sender is used,
  which delivers only to the email address of your own Resend account, so sign up to Resend with cyrusakacha@gmail.com
  (or verify a domain and set `CONTACT_FROM_EMAIL`).

## Environment variables

See `.env.example`. All are optional for the site to build and run:
`NEXT_PUBLIC_SITE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`.
Never commit a real `.env` file.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel (framework preset: Next.js).
3. Add the environment variables above in Project Settings.
4. Deploy, then set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy so the sitemap and metadata use it.

## Theme toggle

The toggle shows a sun while the dark theme is active and a moon while the light theme is active (the icon of
the theme you will switch to). The preference is saved in `localStorage` and applied before first paint.
