import { createContext, useContext, useState, useEffect } from 'react'
import translations from '../data/translations.json'

// ─── Context ──────────────────────────────────────────────────────────────────
const LanguageContext = createContext(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // Restore from localStorage, default to English
    return localStorage.getItem('civic_ng_lang') || 'en'
  })

  const switchLanguage = (newLang) => {
    if (translations[newLang]) {
      setLang(newLang)
      localStorage.setItem('civic_ng_lang', newLang)
    }
  }

  const t = (path) => {
    // Resolve dot-notation path: e.g. "nav.home" → translations[lang].nav.home
    const keys = path.split('.')
    let value = translations[lang]
    for (const key of keys) {
      value = value?.[key]
    }
    // Fallback to English if translation missing
    if (value === undefined) {
      let fallback = translations['en']
      for (const key of keys) {
        fallback = fallback?.[key]
      }
      return fallback || path
    }
    return value
  }

  return (
    <LanguageContext.Provider value={{ lang, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
