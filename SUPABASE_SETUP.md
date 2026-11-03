# Menghubungkan Review Oribrown ke Database (Supabase)

Supaya review terlihat di semua perangkat, sambungkan website ke Supabase (gratis).

## 1. Buat project
1. Buka https://supabase.com → Sign up → **New project**.
2. Tunggu sampai project siap.

## 2. Jalankan SQL
Buka **SQL Editor** → **New query** → tempel semua kode di bawah → **Run**.

```sql
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('website', 'product')),
  name text not null check (char_length(name) between 2 and 60),
  kelas text not null default '',
  rating int not null check (rating between 1 and 5),
  aspects jsonb not null default '{}'::jsonb,
  comment text not null check (char_length(comment) between 10 and 2000),
  photos jsonb not null default '[]'::jsonb,
  order_number text,
  owner_hash text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists reviews_order_number_unique
  on public.reviews (order_number) where order_number is not null;

alter table public.reviews enable row level security;

drop policy if exists "Semua orang bisa membaca review" on public.reviews;
create policy "Semua orang bisa membaca review" on public.reviews
  for select using (true);

create or replace function public.add_review(
  p_kind text, p_name text, p_kelas text, p_rating int, p_aspects jsonb,
  p_comment text, p_photos jsonb, p_order_number text, p_token text
) returns uuid
language plpgsql security definer set search_path = public, extensions as $$
declare new_id uuid;
begin
  if char_length(coalesce(p_token, '')) < 20 then raise exception 'invalid token'; end if;
  if jsonb_array_length(coalesce(p_photos, '[]'::jsonb)) > 3 then raise exception 'too many photos'; end if;
  insert into public.reviews (kind, name, kelas, rating, aspects, comment, photos, order_number, owner_hash)
  values (p_kind, p_name, coalesce(p_kelas, ''), p_rating, coalesce(p_aspects, '{}'::jsonb), p_comment,
          coalesce(p_photos, '[]'::jsonb), nullif(p_order_number, ''), encode(digest(p_token, 'sha256'), 'hex'))
  returning id into new_id;
  return new_id;
end; $$;

create or replace function public.delete_review(p_id uuid, p_token text)
returns boolean
language plpgsql security definer set search_path = public, extensions as $$
declare deleted int;
begin
  delete from public.reviews
  where id = p_id and owner_hash = encode(digest(p_token, 'sha256'), 'hex');
  get diagnostics deleted = row_count;
  return deleted > 0;
end; $$;

grant execute on function public.add_review(text, text, text, int, jsonb, text, jsonb, text, text) to anon, authenticated;
grant execute on function public.delete_review(uuid, text) to anon, authenticated;

alter publication supabase_realtime add table public.reviews;
```

## 3. Tempel kunci ke website
1. Buka **Project Settings → API**.
2. Salin **Project URL** dan **anon public key**.
3. Buka file `utils/supabaseClient.ts`, isi `SUPABASE_URL` dan `SUPABASE_ANON_KEY`.

Selesai! Review sekarang tampil di semua perangkat secara langsung (live).
Setiap orang hanya bisa menghapus review yang ia tulis sendiri dari perangkatnya.
