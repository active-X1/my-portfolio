-- Reviews table for the portfolio. Run in the Supabase SQL editor.
-- Submissions start as 'pending'. Only 'approved' rows are readable by the public.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  role text check (role is null or char_length(role) <= 100),
  rating smallint not null check (rating between 1 and 5),
  message text not null check (char_length(message) between 20 and 1000),
  project_slug text check (project_slug is null or char_length(project_slug) <= 80),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

-- Start from nothing, then grant only what the public site needs.
revoke all on public.reviews from anon, authenticated;

-- Public can read approved reviews (and only these columns).
grant select (id, name, role, rating, message, project_slug, created_at)
  on public.reviews to anon, authenticated;
create policy "Public can read approved reviews"
  on public.reviews for select to anon, authenticated
  using (status = 'approved');

-- Public can submit, but never choose the status: it always defaults to 'pending'.
grant insert (name, role, rating, message, project_slug)
  on public.reviews to anon, authenticated;
create policy "Public can submit pending reviews"
  on public.reviews for insert to anon, authenticated
  with check (status = 'pending');

-- No update or delete policies exist, so the public cannot change existing reviews.
-- Moderate in the Supabase dashboard (Table editor): set status to 'approved' or 'rejected'.
-- The dashboard uses a privileged role and bypasses RLS. Never ship the service-role key in this app.
