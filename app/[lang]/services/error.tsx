'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ServicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Services error:', error)
  }, [error])

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Error Loading Services
          </h2>
          <p className="text-lg text-muted-foreground">
            We couldn't load the services. This might be a temporary connection issue.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-left">
            <p className="font-mono text-sm text-destructive break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>
            Retry
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
