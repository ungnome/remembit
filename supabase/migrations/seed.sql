/*
	========================================================================================
	This is the setup script for running Remembit on Supabase. It only needs to be run once.
	========================================================================================
*/

/*
	=============
	Tables
	=============
*/

-- create bookmark table
CREATE TABLE IF NOT EXISTS "public"."bookmark" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" text NOT NULL DEFAULT ''::text,
    "url" text NOT NULL DEFAULT ''::text,
    "tags" _text NOT NULL DEFAULT '{}'::text[],
    "owner" uuid NOT NULL DEFAULT auth.uid(),
    PRIMARY KEY ("id")
);

-- create bookmark_timestamp table
CREATE TABLE IF NOT EXISTS "public"."bookmark_timestamp" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "bookmark_id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT now(),
    "updated" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "bookmark_timestamp_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmark"("id"),
    PRIMARY KEY ("id")
);

-- create user_profile table
CREATE TABLE IF NOT EXISTS "public"."user_profile" (
	"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
	"user_id" uuid NOT NULL,
	"joined" timestamptz NOT NULL DEFAULT now(),
	"avatar_uri" text DEFAULT NULL,
	"given_name" text DEFAULT NULL,
	"surname" text DEFAULT NULL ,
	CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id"),
	PRIMARY KEY ("id")
	
);


/*
	==================
	Row Level Security
	==================
*/
ALTER TABLE "public"."bookmark" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."bookmark_timestamp" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."user_profile" ENABLE ROW LEVEL SECURITY;


/*
	==================
	Row Level Policies
	==================
*/
CREATE POLICY "Allow Authenticate users to insert bookmarks" ON "public"."bookmark"
	AS PERMISSIVE FOR INSERT
	TO authenticated
	WITH CHECK (true);

CREATE POLICY "Allow users to read their own bookmarks" ON "public"."bookmark"
	AS PERMISSIVE FOR SELECT
	TO authenticated
	USING (owner = auth.uid());

CREATE POLICY "Allow users to update their own bookmarks" ON "public"."bookmark"
	AS PERMISSIVE FOR UPDATE
	TO authenticated
	USING (owner = auth.uid());

CREATE POLICY "Allow users to delete their own bookmarks" ON "public"."bookmark"
	AS PERMISSIVE FOR DELETE
	TO authenticated
	USING (owner = auth.uid());

CREATE POLICY "Allow users to read timestamps of their bookmarks" ON "public"."bookmark_timestamp"
	AS PERMISSIVE FOR SELECT
	TO authenticated
	USING (bookmark_id IN (SELECT id FROM "public"."bookmark"));

CREATE POLICY "Allow users to read their profiles" ON "public"."user_profile"
	AS PERMISSIVE FOR SELECT
	TO authenticated
	USING (user_id = auth.uid());

CREATE POLICY "Allow users to update their profiles" ON "public"."user_profile"
	AS PERMISSIVE FOR UPDATE
	TO authenticated
	USING (user_id = auth.uid());

/*
	================
	Functions
	================
*/

-- create handle_bookmark_insert function
CREATE OR REPLACE FUNCTION "public".handle_bookmark_insert ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	SECURITY DEFINER
	AS $$
BEGIN
	 -- Add timestamp record for new bookmarks
	INSERT INTO "public".bookmark_timestamp (bookmark_id, created, updated)
		VALUES(NEW.id, now(), now());
	
	RETURN NULL;
END
$$ ;

-- create handle_bookmark_update function
CREATE OR REPLACE FUNCTION "public".handle_bookmark_update ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	SECURITY DEFINER
	AS $$
BEGIN
	-- Incremenet 'updated' timestamp for bookmark
	UPDATE
		"public".bookmark_timestamp
	SET
		updated = now()
	WHERE bookmark_id = NEW.id;
	RETURN NULL;
END
$$ ;


-- create handle_user_insert function
CREATE OR REPLACE FUNCTION handle_user_insert ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	SECURITY DEFINER
	AS $$
BEGIN
 	-- Add record to user_profile table
	INSERT INTO "public".user_profile (user_id)
		VALUES(NEW.id);
	
	RETURN NULL;
END
$$ ;

/*
 ===============
 Create Triggers
 ===============
*/
 
-- create bookmark_insert trigger 
CREATE OR REPLACE TRIGGER bookmark_insert 
	AFTER INSERT ON "public".bookmark 
	FOR EACH ROW 
	EXECUTE FUNCTION handle_bookmark_insert ();

-- create bookmark_update trigger
CREATE OR REPLACE TRIGGER bookmark_update
	AFTER UPDATE ON "public".bookmark
	FOR EACH ROW
	EXECUTE FUNCTION handle_bookmark_update();

-- create user_insert trigger
CREATE OR REPLACE TRIGGER user_insert
	AFTER INSERT ON "auth".users
	FOR EACH ROW
	EXECUTE FUNCTION handle_user_insert();

/*
	============
	Views
	============
*/
CREATE OR REPLACE VIEW "public".bookmarks_view AS
SELECT
	bookmark.*,
	bookmark_timestamp.created,
	bookmark_timestamp.updated
FROM
	bookmark
	INNER JOIN bookmark_timestamp ON bookmark.id = bookmark_timestamp.bookmark_id;
	