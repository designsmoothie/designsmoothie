-- Supabase > SQL Editor에서 실행합니다. 기존 관리자 로그인 이메일을 아래에 입력하세요.
-- 기존 포트폴리오 테이블/버킷/정책은 변경하지 않습니다.
begin;

create table if not exists public.franchise_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.franchise_admins enable row level security;
revoke all on public.franchise_admins from anon, authenticated;
grant select on public.franchise_admins to authenticated;
drop policy if exists franchise_admin_self on public.franchise_admins;
create policy franchise_admin_self on public.franchise_admins for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.is_franchise_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.franchise_admins where user_id = (select auth.uid()));
$$;
revoke all on function public.is_franchise_admin() from public;
grant execute on function public.is_franchise_admin() to authenticated;

-- 이 이메일의 기존 Supabase Auth 계정에만 관리 권한을 부여합니다.
do $$
declare
  admin_email text := '여기에_관리자_로그인_이메일';
  admin_id uuid;
begin
  select id into admin_id from auth.users where lower(email) = lower(trim(admin_email));
  if admin_id is null then
    raise exception 'admin_email을 현재 CMS 관리자 로그인 이메일로 바꿔주세요. 해당 계정이 Supabase Authentication에 있어야 합니다.';
  end if;
  insert into public.franchise_admins(user_id) values (admin_id) on conflict do nothing;
end $$;

create table if not exists public.franchise_works (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 150),
  category text not null check (category in ('foam-menu','light-menu','digital-menu','banner','air-sign','hanging-banner','poster','leaflet','business-card')),
  client text not null default '' check (char_length(client) <= 150),
  description text not null default '' check (char_length(description) <= 5000),
  media jsonb not null default '[]'::jsonb check (jsonb_typeof(media) = 'array' and jsonb_array_length(media) <= 50),
  thumbnail_id uuid,
  status text not null default 'draft' check (status in ('draft', 'published')),
  featured boolean not null default false,
  display_order integer not null default 0 check (display_order between 0 and 1000000),
  updated_at timestamptz not null default now()
);
create index if not exists franchise_works_listing on public.franchise_works(status, category, display_order);
alter table public.franchise_works enable row level security;
revoke all on public.franchise_works from anon, authenticated;
grant select on public.franchise_works to anon, authenticated;
grant insert, update, delete on public.franchise_works to authenticated;
drop policy if exists franchise_public_read on public.franchise_works;
create policy franchise_public_read on public.franchise_works for select to anon, authenticated using (status = 'published');
drop policy if exists franchise_admin_manage on public.franchise_works;
create policy franchise_admin_manage on public.franchise_works for all to authenticated using ((select public.is_franchise_admin())) with check ((select public.is_franchise_admin()));

create or replace function public.franchise_touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = clock_timestamp(); return new; end $$;
drop trigger if exists franchise_updated_at on public.franchise_works;
create trigger franchise_updated_at before update on public.franchise_works for each row execute function public.franchise_touch_updated_at();

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('franchise-assets', 'franchise-assets', true, 47185920, array['image/jpeg','image/png','image/webp','video/mp4','video/webm'])
on conflict(id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists franchise_asset_read on storage.objects;
create policy franchise_asset_read on storage.objects for select to anon, authenticated using (bucket_id = 'franchise-assets');
drop policy if exists franchise_asset_insert on storage.objects;
create policy franchise_asset_insert on storage.objects for insert to authenticated with check (bucket_id = 'franchise-assets' and (select public.is_franchise_admin()));
drop policy if exists franchise_asset_delete on storage.objects;
create policy franchise_asset_delete on storage.objects for delete to authenticated using (bucket_id = 'franchise-assets' and (select public.is_franchise_admin()));

commit;
