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
            className="data-[state=on]:bg-transparent"
            onClick={() => setTheme(isDark ? "light" : "dark")}
        >
            {isDark ?

                <Sun
                    className={`h-4 w-4 transition-all duration-300 ${isDark ? "text-foreground/50" : "text-black scale-110"}`} />
                : <Moon
                    className={`h-4 w-4 transition-all duration-300 ${isDark ? "text-black scale-110" : "text-foreground/50"}`} />

            }
        </Toggle>
    )
}
