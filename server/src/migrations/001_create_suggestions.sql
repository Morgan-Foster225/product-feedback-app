create table if not exists suggestions (
  id serial primary key,
  title varchar(100) not null check (char_length(title) >= 1),
  category varchar(20) not null check (category in ('UI', 'UX', 'Enhancement', 'Bug', 'Feature')),
  description text not null check (char_length(description) >= 1 and char_length(description) <= 500),
  created_at timestamptz not null default now()
);

create index if not exists suggestions_category_idx on suggestions (category);
create index if not exists suggestions_created_at_idx on suggestions (created_at desc);
