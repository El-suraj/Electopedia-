import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import laws from '../data/laws.json'

// ─── Highlight key phrases in law text ────────────────────────────────────────
function HighlightedText({ text, highlights = [] }) {
  if (!highlights.length) return <span>{text}</span>

  // Escape special regex characters in each phrase
  const escaped = highlights.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = highlights.some(
          h => h.toLowerCase() === part.toLowerCase()
        )
        return isHighlight ? (
          <mark
            key={i}
            className="bg-nigeria-green/25 text-nigeria-green-light rounded px-0.5 not-italic font-semibold"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      })}
    </>
  )
}

// ─── Single law reference block ────────────────────────────────────────────────
function SingleLaw({ lawId }) {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const law = laws[lawId]

  if (!law) return null

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <div className="flex-1 min-w-0">
          {/* Section badge */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block bg-nigeria-green/20 text-nigeria-green text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
              {law.section}
            </span>
          </div>
          <p className="font-body font-semibold text-white text-sm leading-snug">
            {law.shortTitle}
          </p>
          <p className="text-white/40 text-xs font-body mt-0.5 truncate">
            {law.act}
          </p>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setExpanded(prev => !prev)}
          className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-body font-semibold px-3 py-2 rounded-xl transition-all duration-200 ${
            expanded
              ? 'bg-nigeria-green text-white'
              : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
          }`}
          aria-expanded={expanded}
          aria-label={expanded ? t('topic.hideSource') : t('topic.viewSource')}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          {expanded ? t('topic.hideSource') : t('topic.viewSource')}
        </button>
      </div>

      {/* Expandable full text */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!expanded}
      >
        <div className="px-5 pb-5">
          {/* Divider */}
          <div className="h-px bg-white/10 mb-4" />

          {/* Original legal text */}
          <div className="bg-civic-charcoal/60 rounded-xl p-4 border border-white/5">
            <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-2">
              {t('law.source')}: {law.act}
            </p>
            <p className="text-white/80 text-sm font-body leading-relaxed italic">
              "<HighlightedText text={law.fullText} highlights={law.highlights} />"
            </p>
          </div>

          {/* External link */}
          {law.url && (
            <a
              href={law.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-nigeria-green text-xs font-body font-medium hover:underline transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              View official document
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── LawReference (public export) ─────────────────────────────────────────────
/**
 * Renders one or more law references for a topic.
 * @param {string[]} lawIds - Array of law IDs from laws.json
 */
export default function LawReference({ lawIds = [] }) {
  const { t } = useLanguage()

  if (!lawIds.length) return null

  return (
    <div className="mt-6">
      <h3 className="text-white/40 text-xs font-body font-semibold uppercase tracking-widest mb-3">
        {t('topic.lawRef')}
      </h3>
      <div className="flex flex-col gap-3">
        {lawIds.map(id => (
          <SingleLaw key={id} lawId={id} />
        ))}
      </div>
    </div>
  )
}
