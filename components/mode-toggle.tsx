"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"
export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => setMounted(true), [])
    if (!mounted) return null
    const isDark = theme === "dark"
    return (
        <Toggle
            aria-label="Toggle theme"
            className="bg-primary rounded-full p-2"
            onClick={() => setTheme(isDark ? "light" : "dark")}
        >
            {isDark ?
                <Sun
                    className={`h-10 w-10 transition-all duration-300 bg-transparent ${"text-amber-500"}`} />
                : <Moon
                    className={`h-10 w-10 transition-all duration-300 ${"text-black"}`} />

            }
        </Toggle>
    )
}
