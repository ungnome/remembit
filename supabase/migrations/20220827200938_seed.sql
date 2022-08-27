create table "public"."bookmark" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null default ''::text,
    "url" text not null default ''::text,
    "tags" text[] not null default '{}'::text[],
    "owner" uuid not null default auth.uid()
);


alter table "public"."bookmark" enable row level security;

create table "public"."bookmark_timestamp" (
    "id" uuid not null default uuid_generate_v4(),
    "bookmark_id" uuid not null,
    "created" timestamp with time zone not null default now(),
    "updated" timestamp with time zone not null default now()
);


alter table "public"."bookmark_timestamp" enable row level security;

create table "public"."user_profile" (
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid not null,
    "joined" timestamp with time zone not null default now(),
    "avatar_uri" text,
    "given_name" text,
    "surname" text
);


alter table "public"."user_profile" enable row level security;

CREATE UNIQUE INDEX bookmark_pkey ON public.bookmark USING btree (id);

CREATE UNIQUE INDEX bookmark_timestamp_pkey ON public.bookmark_timestamp USING btree (id);

CREATE UNIQUE INDEX user_profile_pkey ON public.user_profile USING btree (id);

alter table "public"."bookmark" add constraint "bookmark_pkey" PRIMARY KEY using index "bookmark_pkey";

alter table "public"."bookmark_timestamp" add constraint "bookmark_timestamp_pkey" PRIMARY KEY using index "bookmark_timestamp_pkey";

alter table "public"."user_profile" add constraint "user_profile_pkey" PRIMARY KEY using index "user_profile_pkey";

alter table "public"."bookmark" add constraint "bookmark_owner_user_id_fkey" FOREIGN KEY (owner) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."bookmark" validate constraint "bookmark_owner_user_id_fkey";

alter table "public"."bookmark_timestamp" add constraint "bookmark_timestamp_bookmark_id_fkey" FOREIGN KEY (bookmark_id) REFERENCES bookmark(id) ON DELETE CASCADE not valid;

alter table "public"."bookmark_timestamp" validate constraint "bookmark_timestamp_bookmark_id_fkey";

alter table "public"."user_profile" add constraint "user_profile_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_profile" validate constraint "user_profile_user_id_fkey";

set check_function_bodies = off;

create or replace view "public"."bookmarks_view" as  SELECT bookmark.id,
    bookmark.name,
    bookmark.url,
    bookmark.tags,
    bookmark.owner,
    bookmark_timestamp.created,
    bookmark_timestamp.updated
   FROM (bookmark
     JOIN bookmark_timestamp ON ((bookmark.id = bookmark_timestamp.bookmark_id)));


CREATE OR REPLACE FUNCTION public.handle_bookmark_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
	 -- Add timestamp record for new bookmarks
	INSERT INTO "public".bookmark_timestamp (bookmark_id, created, updated)
		VALUES(NEW.id, now(), now());
	
	RETURN NULL;
END
$function$
;

CREATE OR REPLACE FUNCTION public.handle_bookmark_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
	-- Incremenet 'updated' timestamp for bookmark
	UPDATE
		"public".bookmark_timestamp
	SET
		updated = now()
	WHERE bookmark_id = NEW.id;
	RETURN NULL;
END
$function$
;

CREATE OR REPLACE FUNCTION public.handle_user_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
 	-- Add record to user_profile table
	INSERT INTO "public".user_profile (user_id)
		VALUES(NEW.id);
	
	RETURN NULL;
END
$function$
;

create policy "Allow Authenticate users to insert bookmarks"
on "public"."bookmark"
as permissive
for insert
to authenticated
with check (true);


create policy "Allow users to delete their own bookmarks"
on "public"."bookmark"
as permissive
for delete
to authenticated
using ((owner = auth.uid()));


create policy "Allow users to read their own bookmarks"
on "public"."bookmark"
as permissive
for select
to authenticated
using ((owner = auth.uid()));


create policy "Allow users to update their own bookmarks"
on "public"."bookmark"
as permissive
for update
to authenticated
using ((owner = auth.uid()));


create policy "Allow users to read timestamps of their bookmarks"
on "public"."bookmark_timestamp"
as permissive
for select
to authenticated
using ((bookmark_id IN ( SELECT bookmark.id
   FROM bookmark)));


create policy "Allow users to read their profiles"
on "public"."user_profile"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));


create policy "Allow users to update their profiles"
on "public"."user_profile"
as permissive
for update
to authenticated
using ((user_id = auth.uid()));


CREATE TRIGGER bookmark_insert AFTER INSERT ON public.bookmark FOR EACH ROW EXECUTE FUNCTION handle_bookmark_insert();

CREATE TRIGGER bookmark_update AFTER UPDATE ON public.bookmark FOR EACH ROW EXECUTE FUNCTION handle_bookmark_update();

CREATE TRIGGER user_insert AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_user_insert();


