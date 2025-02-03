"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface MapProps {
  center: { lat: number; lng: number }
  radius: number
}

export default function Map({ center, radius }: MapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const circleRef = useRef<L.Circle | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([center.lat, center.lng], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current)

      circleRef.current = L.circle([center.lat, center.lng], {
        color: "rgb(249, 115, 22)",
        fillColor: "rgb(249, 115, 22)",
        fillOpacity: 0.2,
        radius: radius * 1000, // Convert km to meters
      }).addTo(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [center.lat, center.lng, radius])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([center.lat, center.lng])
    }
    if (circleRef.current) {
      circleRef.current.setLatLng([center.lat, center.lng])
      circleRef.current.setRadius(radius * 1000)
    }
  }, [center.lat, center.lng, radius])

  return <div id="map" className="h-full w-full" />
}

