"use client"

import React, { useMemo, useRef, useState, useEffect } from "react"

import { cn } from "@/lib/utils"
import { useDimensions } from "@/hooks/use-debounced-dimensions"

interface AnimatedGradientProps {
  colors: string[]
  speed?: number
  blur?: "light" | "medium" | "heavy"
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch - only enable animations after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  )

  // Generate stable random values once using useMemo
  const circleConfigs = useMemo(() => {
    return colors.map(() => ({
      widthMultiplier: mounted ? Math.random() * 1.0 + 0.5 : 1, // 0.5 to 1.5
      heightMultiplier: mounted ? Math.random() * 1.0 + 0.5 : 1,
      top: mounted ? Math.random() * 50 : 0,
      left: mounted ? Math.random() * 50 : 0,
      tx1: mounted ? Math.random() - 0.5 : 0,
      ty1: mounted ? Math.random() - 0.5 : 0,
      tx2: mounted ? Math.random() - 0.5 : 0,
      ty2: mounted ? Math.random() - 0.5 : 0,
      tx3: mounted ? Math.random() - 0.5 : 0,
      ty3: mounted ? Math.random() - 0.5 : 0,
      tx4: mounted ? Math.random() - 0.5 : 0,
      ty4: mounted ? Math.random() - 0.5 : 0,
    }))
  }, [colors, mounted])

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
        ? "blur-3xl"
        : "blur-[100px]"

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden rounded-3xl">
      <div className={cn(`absolute inset-0`, blurClass)}>
        {colors.map((color, index) => {
          const config = circleConfigs[index]

          const animationProps = {
            animation: mounted ? `background-gradient ${speed}s infinite ease-in-out` : 'none',
            animationDuration: `${speed}s`,
            top: `${config.top}%`,
            left: `${config.left}%`,
            "--tx-1": config.tx1,
            "--ty-1": config.ty1,
            "--tx-2": config.tx2,
            "--ty-2": config.ty2,
            "--tx-3": config.tx3,
            "--ty-3": config.ty3,
            "--tx-4": config.tx4,
            "--ty-4": config.ty4,
          } as React.CSSProperties

          return (
            <svg
              key={index}
              className={cn("absolute", mounted && "animate-background-gradient")}
              width={circleSize * config.widthMultiplier}
              height={circleSize * config.heightMultiplier}
              viewBox="0 0 100 100"
              style={animationProps}
            >
              <circle cx="50" cy="50" r="50" fill={color} />
            </svg>
          )
        })}
      </div>
    </div>
  )
}

export default AnimatedGradient
