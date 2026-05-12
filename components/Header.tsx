import { auth } from '@/auth'
import { ThemeToggle } from '@/components/ThemeToggle'
import UserMenu, { AuthLinks } from '@/components/UserMenu'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'

export default async function Header() {
  const session = await auth()

  return (
    <header className="border-b border-border bg-background sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <TipsAndUpdatesIcon style={{ color: 'white', fontSize: 18, marginLeft: 1 }} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground leading-tight tracking-tight">AI Content Studio</h1>
            <p className="text-xs text-muted-foreground">Generate branded content with AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {session?.user ? (
            <UserMenu name={session.user.name} email={session.user.email} />
          ) : (
            <AuthLinks />
          )}
        </div>
      </div>
    </header>
  )
}

