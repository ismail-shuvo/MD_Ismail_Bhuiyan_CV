-- Run this in Supabase SQL Editor
-- https://supabase.com/dashboard/project/_/sql

create table if not exists cv_data (
  id uuid default gen_random_uuid() primary key,
  name text,
  title text,
  email text,
  phone text,
  linkedin text,
  address text,
  about text,
  skills jsonb default '[]',
  experiences jsonb default '[]',
  projects jsonb default '[]',
  education jsonb default '[]',
  certifications jsonb default '[]',
  updated_at timestamptz default now()
);

-- Allow public read access (CV is public)
alter table cv_data enable row level security;

create policy "Public can read cv" on cv_data
  for select using (true);

create policy "Service role can write" on cv_data
  for all using (auth.role() = 'service_role');
