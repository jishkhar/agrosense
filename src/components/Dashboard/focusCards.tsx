"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

type CardType = {
  title: string
  src: string
  href: string
}

export function FocusCards({ cards = [] }: { cards?: CardType[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Link href={card.href} key={card.title} className="block">
          <motion.div
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={card.src}
              alt={card.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-300 ease-in-out"
              style={{
                transform: `scale(${hovered === index ? 1.1 : 1})`,
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">{card.title}</h2>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
