import { NextResponse } from 'next/server'

// Returns the SQL needed to create the promotions table.
// The admin can run this in their Supabase SQL Editor.
export async function GET() {
  const sql = `
-- Run this in your Supabase SQL Editor
CREATE TABLE IF NOT EXISTS promotions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  image_url text,
  badge_text text DEFAULT 'SALE',
  original_price numeric,
  promo_price numeric,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
`.trim()

  return NextResponse.json({ sql })
}
