import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

const API_KEY = process.env.SCRAPER_API_KEY

export async function POST(req: Request) {
  try {
    const headersList = headers()
    const apiKey = headersList.get("x-api-key")

    if (!apiKey || apiKey !== API_KEY) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { city, rent_min, rent_max, neighborhood, home_type } = await req.json()

    // Execute the Python script
    const { stdout, stderr } = await execAsync(
      `python scrape_with_ai.py "${city}" ${rent_min} ${rent_max} "${neighborhood}" "${home_type}"`,
    )

    if (stderr) {
      console.error(`Error: ${stderr}`)
      return NextResponse.json({ success: false, error: "Scraper execution failed" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: { message: "Scraper started successfully", output: stdout },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

