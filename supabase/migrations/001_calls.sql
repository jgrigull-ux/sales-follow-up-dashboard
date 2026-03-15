-- Calls: one row per external call per day. Unique on (date, email, start, event_title) for upserts.
create table if not exists public.calls (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  email text not null,
  display_name text,
  event_title text not null,
  start text not null,
  "end" text,
  summary text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists calls_date_email_start_event_title_key
  on public.calls (date, email, start, event_title);

-- Refresh updated_at on row update
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists calls_updated_at on public.calls;
create trigger calls_updated_at
  before update on public.calls
  for each row execute function public.set_updated_at();
