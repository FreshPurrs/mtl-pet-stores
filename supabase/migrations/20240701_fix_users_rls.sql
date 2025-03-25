-- Fix RLS policies for users table to allow inserts

-- First disable RLS temporarily to ensure we can make changes
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own data" ON public.users;

-- Create new policies
-- Allow users to view their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid()::text = user_id);

-- Allow authenticated users to insert their own data
CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Allow service role to manage all data
CREATE POLICY "Service role can do all" ON public.users
  USING (auth.role() = 'service_role');

-- Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Add public access policy for authentication functions
CREATE POLICY "Public access" ON public.users
  FOR SELECT USING (true);

-- Enable realtime
alter publication supabase_realtime add table public.users;