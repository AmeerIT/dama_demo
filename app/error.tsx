'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service in production
    console.error('Global error boundary caught:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="text-lg text-muted-foreground">
            We encountered an unexpected error. Please try again.
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
          <Button onClick={reset} size="lg">
            Try again
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/">Go home</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
