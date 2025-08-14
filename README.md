<p align="center">
  <em>" ~ Fallen down several times, but started from zero. 七転び八起き "</em>
</p>

<br>
<p align="center">
  <img width="1919" height="846" src="https://github.com/user-attachments/assets/01df7e47-678c-4650-b113-862087461f78" alt="image" />
</p>

<br><br>

## Supabase Auth

Create `.env.local` in the project root with:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Then run `npm run dev` and visit `/signup` or `/login`.

### Database

Create the `workspaces` table and basic RLS policies in Supabase:

```
create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  slug text unique,
  created_at timestamp with time zone default now()
);

alter table public.workspaces enable row level security;

create policy "owner can read own workspaces" on public.workspaces
  for select using (auth.uid() = owner_user_id);

create policy "owner can insert own workspaces" on public.workspaces
  for insert with check (auth.uid() = owner_user_id);

create policy "owner can update own workspaces" on public.workspaces
  for update using (auth.uid() = owner_user_id);

create policy "owner can delete own workspaces" on public.workspaces
  for delete using (auth.uid() = owner_user_id);
```