-- Agrega columna email a profiles (necesaria para mostrarla en el panel admin)
alter table public.profiles add column if not exists email text;

-- Backfill: completar el email de los usuarios que ya existen
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id and p.email is null;

-- Actualizar el trigger para que también guarde el email al crear un usuario nuevo
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, roles)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Sin nombre'),
    new.email,
    array['student']::text[]
  );
  return new;
end;
$$;
