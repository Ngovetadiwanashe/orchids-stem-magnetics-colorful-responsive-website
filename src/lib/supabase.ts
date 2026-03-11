import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  description: string | null
  category: string | null
  image_url: string | null
  price: number | null
  in_stock: boolean
  specs: Record<string, string> | null
  brand: string | null
  created_at: string
  updated_at: string
}

export type Quote = {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  message: string | null
  product_ids: string[] | null
  created_at: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  created_at: string
}

export type Promotion = {
  id: string
  title: string
  description: string | null
  image_url: string | null
  badge_text: string | null
  original_price: number | null
  promo_price: number | null
  is_active: boolean
  created_at: string
  updated_at: string
}
