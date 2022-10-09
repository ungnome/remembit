#! /bin/bash

# this scipt assumes it's being run by package.json
# it may not work correctly if run directly

# add supabase localhost urls to .env
echo "REMEMBIT_SUPABASE_URL=http://localhost:54321" > .env.dev-web.local
echo "REMEMBIT_SUPABASE_URL=http://localhost:54321" > .env.dev-ios.local
echo "REMEMBIT_SUPABASE_URL=http://10.0.2.2:54321" > .env.dev-android.local


# add anon key to .env
ANON_KEY=$(supabase status | grep anon | xargs | cut -d ' ' -f3)
echo "REMEMBIT_SUPABASE_ANON_KEY=$ANON_KEY" >> .env.dev-web.local
echo "REMEMBIT_SUPABASE_ANON_KEY=$ANON_KEY" >> .env.dev-ios.local
echo "REMEMBIT_SUPABASE_ANON_KEY=$ANON_KEY" >> .env.dev-android.local