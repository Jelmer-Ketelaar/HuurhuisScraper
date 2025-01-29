import { NextResponse } from "next/server"
import { headers } from "next/headers"
import mysql from "mysql2/promise"

const API_KEY = process.env.SCRAPER_API_KEY
const DB_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

export async function GET(req: Request) {
  try {
    const headersList = headers()
    const apiKey = headersList.get("x-api-key")

    if (!apiKey || apiKey !== API_KEY) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const connection = await mysql.createConnection(DB_CONFIG)

    const [rows] = await connection.execute(
      "SELECT COUNT(*) as total, SUM(CASE WHEN created_at > DATE_SUB(NOW(), INTERVAL 1 DAY) THEN 1 ELSE 0 END) as new_today FROM rental_listings",
    )

    await connection.end()

    const { total, new_today } = (rows as any)[0]

    return NextResponse.json({
      success: true,
      data: {
        total_listings: total,
        new_listings_today: new_today,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

