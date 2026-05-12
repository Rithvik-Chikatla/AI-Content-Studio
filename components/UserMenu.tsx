'use client'

import { useState, useRef, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface UserMenuProps {
  name?: string | null
  email?: string | null
}

export default function UserMenu({ name, email }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : email?.[0]?.toUpperCase() ?? '?'

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 rounded-full bg-primary text-white text-xs font-semibold flex items-center justify-center hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="User menu"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-52 bg-card border border-border rounded-xl shadow-lg py-1.5 z-50">
          <div className="px-3 py-2 border-b border-border mb-1">
            {name && <p className="text-sm font-medium text-foreground truncate">{name}</p>}
            {email && <p className="text-xs text-muted-foreground truncate">{email}</p>}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors rounded-lg mx-auto block"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export function AuthLinks() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className="text-sm bg-primary text-white font-medium px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
      >
        Sign up
      </Link>
    </div>
  )
}
