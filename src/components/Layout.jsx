import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

function HomeIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.12 : 0} />
      <path d="M9 21V12h6v9" />
    </svg>
  )
}
function BookIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.08 : 0} />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  )
}
function CogIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0} />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  )
}

export default function Layout({ children }) {
  const { t } = useLanguage()
  const location = useLocation()

  const navItems = [
    { path: '/',         label: t('nav.home'),     Icon: HomeIcon },
    { path: '/learn',    label: t('nav.learn'),    Icon: BookIcon },
    { path: '/settings', label: t('nav.settings'), Icon: CogIcon },
  ]

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' :
    location.pathname === path || location.pathname.startsWith(path === '/learn' ? '/topic' : path)

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body">
      {/* Desktop top nav */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-surface-card border-b border-surface-border sticky top-0 z-40 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-forest-900 flex items-center justify-center">
            <span className="text-white text-xs font-mono font-medium tracking-wide">NG</span>
          </div>
          <span className="font-display text-lg text-ink-900 tracking-tight">
            Civic<span className="text-forest-900">NG</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ path, label }) => {
            const active = isActive(path)
            return (
              <Link key={path} to={path}
                className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-150 ${
                  active
                    ? 'bg-forest-50 text-forest-900'
                    : 'text-ink-500 hover:text-ink-900 hover:bg-surface-muted'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <LanguageSwitcher compact />
      </header>

      {/* Content */}
      <main className="flex-1 pb-24 md:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-card safe-bottom"
           style={{ boxShadow: '0 -1px 0 0 #E4EDE8, 0 -8px 24px 0 rgba(11,61,46,0.06)' }}>
        <div className="flex items-stretch">
          {navItems.map(({ path, label, Icon }) => {
            const active = isActive(path)
            return (
              <Link key={path} to={path}
                className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 transition-colors duration-150 ${
                  active ? 'text-forest-900' : 'text-ink-300 hover:text-ink-500'
                }`}
              >
                <Icon active={active} />
                <span className={`text-2xs font-body font-medium ${active ? 'text-forest-900' : 'text-ink-300'}`}>
                  {label}
                </span>
                {active && (
                  <span className="absolute bottom-0 w-8 h-0.5 rounded-full bg-forest-900" style={{ position: 'absolute', bottom: 0 }} />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
