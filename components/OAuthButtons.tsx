'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path d="M11.4 11.4H0V0h11.4v11.4z" fill="#F35325" />
      <path d="M24 11.4H12.6V0H24v11.4z" fill="#81BC06" />
      <path d="M11.4 24H0V12.6h11.4V24z" fill="#05A6F0" />
      <path d="M24 24H12.6V12.6H24V24z" fill="#FFBA08" />
    </svg>
  )
}

export default function OAuthButtons({ callbackUrl = '/' }: { callbackUrl?: string }) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleOAuth = async (provider: 'google' | 'microsoft-entra-id') => {
    setLoadingProvider(provider)
    await signIn(provider, { callbackUrl })
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => handleOAuth('google')}
        disabled={!!loadingProvider}
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground bg-background hover:bg-muted transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <GoogleIcon />
        {loadingProvider === 'google' ? 'Redirecting…' : 'Continue with Google'}
      </button>
      <button
        onClick={() => handleOAuth('microsoft-entra-id')}
        // disabled={!!loadingProvider}
        disabled={true} // Temporarily disable Microsoft Entra ID until we have it fully set up
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground bg-background hover:bg-muted transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <MicrosoftIcon />
        {loadingProvider === 'microsoft-entra-id' ? 'Redirecting…' : 'Continue with Microsoft'}
      </button>
    </div>
  )
}
