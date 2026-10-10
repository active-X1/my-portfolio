/** Minimal server-side Supabase REST helper. Uses the public anon key only; RLS enforces access. */
export function getSupabaseConfig(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

export const isReviewBackendConfigured = () => getSupabaseConfig() !== null;
