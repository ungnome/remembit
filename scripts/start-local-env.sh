#! /bin/bash

# start supabase constainers
supabase start

# add local dev supabase api to env
echo "REMEMBIT_SUPABASE_URL=http://localhost:54321" > .env.local

# add local dev anon key to env
ANON_KEY=$(supabase status | grep anon | xargs | cut -d ' ' -f3)
echo "REMEMBIT_SUPABASE_ANON_KEY=$ANON_KEY" >> .env.local