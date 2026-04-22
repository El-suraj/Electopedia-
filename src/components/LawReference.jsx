import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import laws from '../data/laws.json'

// Highlight key phrases in text
function HighlightedText({ text, highlights = [] }) {
  if (!highlights.length) return <span>{text}</span>
  const escaped = highlights.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const parts = text.split(new RegExp(`(${escaped.join('|')})`, 'gi'))
  return (
    <>
      {parts.map((part, i) => {
        const isHit = highlights.some(h => h.toLowerCase() === part.toLowerCase())
        return isHit
          ? <mark key={i} className="bg-gold-100 text-gold-600 rounded px-0.5 not-italic font-semibold">{part}</mark>
          : <span key={i}>{part}</span>
      })}
    </>
  )
}

function LawCard({ lawId }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const law = laws[lawId]
  if (!law) return null

  return (
    <div className={`bg-surface-card rounded-2xl border transition-all duration-300 overflow-hidden ${
      open ? 'border-forest-200 shadow-card-hover' : 'border-surface-border shadow-card'
    }`}>
      {/* Header */}
      <div className="flex items-start gap-4 px-5 py-4">
        {/* Icon */}
        <div className="w-9 h-9 rounded-xl bg-forest-50 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="#0B3D2E" strokeWidth="1.6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m0 0H4.5a2 2 0 01-2-2v-1.5M9 19.5H14a2 2 0 002-2v-1.5M9 4.5A2.25 2.25 0 1111.25 2.25M9 4.5A2.25 2.25 0 116.75 2.25M15.75 4.5v8.25m0 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-12 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          {/* Section badge */}
          <div className="inline-flex items-center gap-1.5 bg-forest-50 border border-forest-100 rounded-full px-2.5 py-0.5 mb-1.5">
            <span className="text-2xs font-mono font-medium text-forest-700">{law.section}</span>
          </div>
          <p className="font-body font-semibold text-ink-800 text-sm leading-snug">{law.shortTitle}</p>
          <p className="text-ink-400 text-xs font-body mt-0.5 leading-snug">{law.act}</p>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-body font-semibold px-3.5 py-2 rounded-xl border transition-all duration-200 ${
            open
              ? 'bg-forest-900 text-white border-forest-900'
              : 'bg-surface-muted text-ink-600 border-surface-border hover:bg-forest-50 hover:text-forest-800 hover:border-forest-200'
          }`}
        >
          <span>{open ? t('topic.hideSource') : t('topic.viewSource')}</span>
          <svg viewBox="0 0 16 16" fill="currentColor" className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
            <path fillRule="evenodd" d="M4.47 6.47a.75.75 0 011.06 0L8 8.94l2.47-2.47a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Expandable body — CSS grid trick for smooth animation */}
      <div className={`accordion-body ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="accordion-inner">
          <div className="px-5 pb-5">
            <div className="h-px bg-surface-border mb-4" />

            {/* Law text box */}
            <div className="bg-forest-50 border border-forest-100 rounded-xl p-4">
              <p className="text-2xs font-mono font-medium text-forest-500 uppercase tracking-wider mb-2">
                {t('law.source')} — {law.act}
              </p>
              <p className="text-ink-700 text-sm font-body leading-relaxed italic">
                "<HighlightedText text={law.fullText} highlights={law.highlights} />"
              </p>
            </div>

            {/* External link */}
            {law.url && (
              <a href={law.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-forest-700 text-xs font-body font-semibold hover:text-forest-900 transition-colors group"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 group-hover:translate-x-px group-hover:-translate-y-px transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M10 2h4m0 0v4m0-4L7 9" />
                </svg>
                View official document
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LawReference({ lawIds = [] }) {
  const { t } = useLanguage()
  if (!lawIds.length) return null
  return (
    <div className="mt-6">
      <p className="text-2xs font-body font-semibold uppercase tracking-[0.14em] text-ink-400 mb-3">
        {t('topic.lawRef')}
      </p>
      <div className="flex flex-col gap-3">
        {lawIds.map(id => <LawCard key={id} lawId={id} />)}
      </div>
    </div>
  )
}
