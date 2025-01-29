import { NextResponse } from "next/server"
import { headers } from "next/headers"
import type { Listing } from "@/types/scraper"

const API_KEY = process.env.SCRAPER_API_KEY

export async function POST(req: Request) {
  try {
    const headersList = headers()
    const apiKey = headersList.get("x-api-key")

    if (!apiKey || apiKey !== API_KEY) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const listings: Listing[] = body.listings

    // Here you would typically save the listings to your database
    // For now, we'll just return a success response

    return NextResponse.json({
      success: true,
      data: { received: listings.length },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

