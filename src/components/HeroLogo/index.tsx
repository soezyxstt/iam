'use client'

import Image from 'next/image'
import React, { useRef, useState } from 'react'

const INITIAL_TRANSFORM = 'rotateZ(10deg) rotateY(-45deg) rotateX(5deg)'
const MAX_ROTATION = 28 // degrees

export function HeroLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState(INITIAL_TRANSFORM)
  const [isHovered, setIsHovered] = useState(false)
  const [shadowOffset, setShadowOffset] = useState({ x: 20, y: 10 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = containerRef.current
    if (!el) return

    const { left, top, width, height } = el.getBoundingClientRect()
    // Normalize cursor to -1 … +1 relative to container center
    const nx = ((e.clientX - left) / width - 0.5) * 2
    const ny = ((e.clientY - top) / height - 0.5) * 2

    const rotateY = nx * MAX_ROTATION
    const rotateX = -ny * MAX_ROTATION

    setTransform(`rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg)`)
    setShadowOffset({ x: -nx * 25, y: ny * 25 })
  }

  function handleMouseEnter() {
    setIsHovered(true)
  }

  function handleMouseLeave() {
    setIsHovered(false)
    setTransform(INITIAL_TRANSFORM)
    setShadowOffset({ x: 20, y: 10 })
  }

  const dropShadow = `drop-shadow(${shadowOffset.x}px ${shadowOffset.y}px 40px rgba(239,68,68,0.45)) drop-shadow(${-shadowOffset.x * 0.6}px ${shadowOffset.y * 1.5}px 50px rgba(30,58,138,0.55))`

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center lg:col-span-5"
      style={{ perspective: '900px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative h-[240px] w-[240px] md:h-[380px] md:w-[380px]"
        style={{
          transform,
          transition: isHovered
            ? 'transform 0.08s linear'
            : 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <Image
          src="/logo.png"
          alt="Lambang IAM ITB"
          fill
          priority
          className="relative z-10 object-contain"
          style={{
            filter: dropShadow,
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.3s ease, filter 0.15s ease',
          }}
        />
      </div>
    </div>
  )
}
