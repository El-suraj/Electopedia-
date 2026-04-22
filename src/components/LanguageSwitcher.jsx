import { useLanguage } from '../context/LanguageContext'

const LANGUAGES = [
  { code: 'en', label: 'EN', fullLabel: 'English' },
  { code: 'ha', label: 'HA', fullLabel: 'Hausa' },
]

/**
 * Language switcher — `compact` prop renders a small pill toggle for the header.
 * Full version renders labeled buttons for the Settings page.
 */
export default function LanguageSwitcher({ compact = false }) {
  const { lang, switchLanguage } = useLanguage()

  if (compact) {
    return (
      <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => switchLanguage(code)}
            className={`px-3 py-1 rounded-full text-xs font-body font-semibold transition-all duration-200 ${
              lang === code
                ? 'bg-nigeria-green text-white shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
            aria-pressed={lang === code}
            aria-label={`Switch to ${label}`}
          >
            {label}
          </button>
        ))}
      </div>
    )
  }

  // Full version for Settings page
  return (
    <div className="flex flex-col gap-3">
      {LANGUAGES.map(({ code, fullLabel }) => (
        <button
          key={code}
          onClick={() => switchLanguage(code)}
          className={`flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all duration-200 ${
            lang === code
              ? 'border-nigeria-green bg-nigeria-green/10 text-white'
              : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:text-white'
          }`}
          aria-pressed={lang === code}
        >
          <span className="font-body font-semibold text-base">{fullLabel}</span>
          {lang === code && (
            <span className="flex items-center gap-1.5 text-nigeria-green text-sm font-medium">
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
