import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { PromoItem } from "../route"

const DATA_FILE = path.join(process.cwd(), "data", "promotions.json")

function readPromos(): PromoItem[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as PromoItem[]
  } catch {
    return []
  }
}

function writePromos(promos: PromoItem[]) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(promos, null, 2))
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const promos = readPromos()
  const idx = promos.findIndex((p) => p.id === id)
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })

  promos[idx] = {
    ...promos[idx],
    title: body.title ?? promos[idx].title,
    description: body.description ?? promos[idx].description,
    image_url: body.image_url ?? promos[idx].image_url,
    badge_text: body.badge_text ?? promos[idx].badge_text,
    original_price: body.original_price ?? promos[idx].original_price,
    promo_price: body.promo_price ?? promos[idx].promo_price,
    is_active: body.is_active ?? promos[idx].is_active,
  }
  writePromos(promos)
  return NextResponse.json(promos[idx])
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const promos = readPromos()
  const filtered = promos.filter((p) => p.id !== id)
  if (filtered.length === promos.length) return NextResponse.json({ error: "Not found" }, { status: 404 })
  writePromos(filtered)
  return NextResponse.json({ success: true })
}
