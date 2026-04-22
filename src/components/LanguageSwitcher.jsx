import { useLanguage } from '../context/LanguageContext'

const LANGUAGES = [
  { code: 'en', label: 'EN', fullLabel: 'English' },
  { code: 'ha', label: 'HA', fullLabel: 'Hausa' },
]

export default function LanguageSwitcher({ compact = false }) {
  const { lang, switchLanguage } = useLanguage()

  if (compact) {
    return (
      <div className="flex items-center bg-surface-muted border border-surface-border rounded-lg p-0.5 gap-0.5">
        {LANGUAGES.map(({ code, label }) => (
          <button key={code} onClick={() => switchLanguage(code)}
            aria-pressed={lang === code}
            className={`px-3 py-1.5 rounded-md text-xs font-body font-semibold transition-all duration-200 ${
              lang === code
                ? 'bg-forest-900 text-white shadow-sm'
                : 'text-ink-400 hover:text-ink-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {LANGUAGES.map(({ code, fullLabel }) => (
        <button key={code} onClick={() => switchLanguage(code)}
          aria-pressed={lang === code}
          className={`flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all duration-200 ${
            lang === code
              ? 'border-forest-900 bg-forest-50 text-forest-900'
              : 'border-surface-border bg-surface-card text-ink-500 hover:border-forest-200 hover:bg-surface-muted'
          }`}
        >
          <span className="font-body font-semibold text-base">{fullLabel}</span>
          {lang === code && (
            <span className="flex items-center gap-1.5 text-forest-700 text-sm font-medium">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Active
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
