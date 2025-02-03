import { AdminNav } from "./components/admin-nav"
import type React from "react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // You would typically check for admin status here
  // For now, we'll use client-side auth check in the pages

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <AdminNav />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

