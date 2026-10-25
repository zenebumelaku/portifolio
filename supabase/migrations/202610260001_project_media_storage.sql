insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'portfolio-project-media',
  'portfolio-project-media',
  true,
  52428800,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif',
    'video/mp4',
    'video/webm'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can read portfolio project media"
  on storage.objects;
drop policy if exists "Admins can upload portfolio project media"
  on storage.objects;
drop policy if exists "Admins can update portfolio project media"
  on storage.objects;
drop policy if exists "Admins can delete portfolio project media"
  on storage.objects;

create policy "Anyone can read portfolio project media"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio-project-media');

create policy "Admins can upload portfolio project media"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'portfolio-project-media'
    and exists (
      select 1
      from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  );

create policy "Admins can update portfolio project media"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'portfolio-project-media'
    and exists (
      select 1
      from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  )
  with check (
    bucket_id = 'portfolio-project-media'
    and exists (
      select 1
      from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  );

create policy "Admins can delete portfolio project media"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'portfolio-project-media'
    and exists (
      select 1
      from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  );
