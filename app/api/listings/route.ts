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

    const [rows] = await connection.execute("SELECT * FROM rental_listings ORDER BY created_at DESC LIMIT 100")

    await connection.end()

    return NextResponse.json({
      success: true,
      listings: rows,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

