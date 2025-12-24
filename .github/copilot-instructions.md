# Copilot Instructions for DAMA

## Architecture Overview

This is a **Next.js 16.1** project using:
- **App Router** (not Pages Router) - all routes in `app/` directory
- **React 19.2** with Server Components by default (`"use client"` required for interactivity)
- **Tailwind CSS v4** with custom theming via CSS variables
- **shadcn/ui** component library configured with "radix-maia" style
- **TypeScript** with strict mode enabled

## Component Architecture

### UI Component System (shadcn/ui)
- All base UI components live in `components/ui/`
- Components use **Radix UI primitives** (not React Aria, not Base-UI despite @base-ui/react in deps)
- Import pattern: `import { Slot } from "radix-ui"` for composition
- Components follow **data-slot** pattern for styling: `data-slot="button"`, `data-slot="card-header"`

### Component Patterns
```tsx
// Always use cn() utility for className merging
import { cn } from "@/lib/utils"
className={cn("base-classes", conditionalClasses, className)}

// Variant-based styling with CVA
import { cva, type VariantProps } from "class-variance-authority"
const variants = cva("base", { variants: { ... } })

// Polymorphic components via Slot
const Comp = asChild ? Slot.Root : "button"

// Client components require explicit directive
"use client"
```

### Import Aliases
Configured in [tsconfig.json](tsconfig.json) and [components.json](components.json):
- `@/*` → project root
- `@/components` → components directory
- `@/lib/utils` → utility functions
- `@/components/ui` → UI components

## Styling Conventions

### Tailwind CSS v4 Setup
- Global styles in [app/globals.css](app/globals.css)
- Uses `@import "tailwindcss"` (v4 syntax)
- Custom theme via `@theme inline` with CSS variables
- Design tokens: `--color-primary`, `--radius-*`, etc.
- Dark mode: `@custom-variant dark (&:is(.dark *))`

### Component Styling Patterns
- **Responsive modifiers**: `group-data-[size=sm]/card:px-4`
- **Container queries**: `@container/field-group`, `@container/card-header`
- **Data attributes for variants**: `data-variant={variant}`, `data-size={size}`
- **Icon sizing**: `[&_svg:not([class*='size-'])]:size-4` for automatic icon sizing
- **Focus rings**: `focus-visible:ring-ring/50 focus-visible:ring-[3px]`

## Development Workflow

### Commands
```bash
npm run dev       # Start dev server on localhost:3000
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint check
```

### File Organization
```
app/              # Next.js App Router pages
├── layout.tsx    # Root layout with fonts (Geist, Inter)
├── page.tsx      # Homepage
└── globals.css   # Global styles & theme

components/
├── ui/           # shadcn/ui base components
├── example.tsx   # Component wrapper utilities
└── component-example.tsx  # Demo/showcase components

lib/
└── utils.ts      # Shared utilities (cn helper)
```

## Key Development Rules

1. **Always use `"use client"` directive** for components with:
   - React hooks (useState, useEffect, etc.)
   - Event handlers (onClick, onChange, etc.)
   - Browser APIs

2. **Font Loading Pattern** (see [app/layout.tsx](app/layout.tsx)):
   - Load fonts via `next/font/google`
   - Apply as CSS variables: `variable: "--font-sans"`
   - Apply to HTML: `className={inter.variable}`

3. **Component Composition**:
   - Use `asChild` prop to render components as different elements
   - Leverage `Slot.Root` from radix-ui for polymorphism
   - Maintain `data-slot` attributes for descendant styling

4. **Adding New shadcn/ui Components**:
   - Configuration in [components.json](components.json)
   - Style: `radix-maia`, RSC enabled
   - Icon library: `lucide-react`
   - Base color: `stone`

5. **Security**: Snyk scanning is configured - scan new code with:
   ```bash
   # Security scanning is enforced via .github/instructions/snyk_rules.instructions.md
   ```

## Common Pitfalls

- Don't import from `@base-ui/react` - use `radix-ui` instead
- Server Components can't use client-side hooks - add `"use client"` when needed
- Tailwind v4 syntax differs from v3 (e.g., `@import` instead of `@tailwind`)
- `cn()` must be used for className merging to properly handle Tailwind conflicts
- Path aliases require `@/` prefix, not relative paths

## Resources

- Next.js App Router: https://nextjs.org/docs/app
- shadcn/ui: https://ui.shadcn.com
- Radix UI: https://www.radix-ui.com
- Tailwind CSS v4: https://tailwindcss.com/docs
