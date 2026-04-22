import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

// ─── Icons ────────────────────────────────────────────────────────────────────
function HomeIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline strokeLinecap="round" strokeLinejoin="round" points="9,22 9,12 15,12 15,22" />
    </svg>
  )
}

function BookIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
}

function SettingsIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  )
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function Layout({ children }) {
  const { t } = useLanguage()
  const location = useLocation()

  const navItems = [
    { path: '/', label: t('nav.home'), Icon: HomeIcon },
    { path: '/learn', label: t('nav.learn'), Icon: BookIcon },
    { path: '/settings', label: t('nav.settings'), Icon: SettingsIcon },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-civic-ink text-white">
      {/* Top bar — visible on tablet+ */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 border-b border-white/10 bg-civic-charcoal/80 backdrop-blur-sm sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-nigeria-green flex items-center justify-center text-sm font-mono font-bold text-white">
            NG
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Civic<span className="text-nigeria-green">NG</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map(({ path, label }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`text-sm font-body font-medium transition-colors duration-200 ${
                  active
                    ? 'text-nigeria-green border-b-2 border-nigeria-green pb-0.5'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <LanguageSwitcher compact />
      </header>

      {/* Main content */}
      <main className="flex-1 pb-24 md:pb-0">
        {children}
      </main>

      {/* Bottom navigation — mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-civic-charcoal border-t border-white/10 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map(({ path, label, Icon }) => {
            const active = location.pathname === path || 
              (path === '/learn' && location.pathname.startsWith('/topic'))
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                  active
                    ? 'text-nigeria-green bg-nigeria-green/10'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                <Icon active={active} />
                <span className="text-xs font-body font-medium">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
