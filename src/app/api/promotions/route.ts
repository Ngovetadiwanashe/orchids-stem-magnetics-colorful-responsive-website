import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const MAX_PROMOS = 5
const DATA_FILE = path.join(process.cwd(), "data", "promotions.json")

export type PromoItem = {
  id: string
  title: string
  description: string
  image_url: string
  badge_text: string
  original_price: number | null
  promo_price: number | null
  is_active: boolean
  created_at: string
}

function readPromos(): PromoItem[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8")
    return JSON.parse(raw) as PromoItem[]
  } catch {
    return []
  }
}

function writePromos(promos: PromoItem[]) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(promos, null, 2))
}

export async function GET() {
  const promos = readPromos()
  return NextResponse.json(promos)
}

export async function POST(req: NextRequest) {
  const promos = readPromos()
  if (promos.length >= MAX_PROMOS) {
    return NextResponse.json(
      { error: `Maximum of ${MAX_PROMOS} promotions allowed. Delete one first.` },
      { status: 400 }
    )
  }
  const body = await req.json()
  const newPromo: PromoItem = {
    id: crypto.randomUUID(),
    title: body.title ?? "",
    description: body.description ?? "",
    image_url: body.image_url ?? "",
    badge_text: body.badge_text ?? "SALE",
    original_price: body.original_price ?? null,
    promo_price: body.promo_price ?? null,
    is_active: body.is_active ?? true,
    created_at: new Date().toISOString(),
  }
  promos.unshift(newPromo)
  writePromos(promos)
  return NextResponse.json(newPromo, { status: 201 })
}
