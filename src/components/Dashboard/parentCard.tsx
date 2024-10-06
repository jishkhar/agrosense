"use client"

import React from "react"
import { FocusCards } from "./focusCards"

export default function ParentComponent() {
  const cards = [
    { title: "Weather", src: "/img/one.jpeg", href: "/dashboard/weather" },
    { title: "Moisture level", src: "/img/m.jpg", href: "/dashboard/moisture-level" },
  ]
  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <FocusCards cards={cards} />
    </div>
  )
}
