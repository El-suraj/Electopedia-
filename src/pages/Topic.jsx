import { useParams, Link, Navigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LawReference from '../components/LawReference'
import content from '../data/content.json'

// Simple inline markdown: **bold** + numbered lists + newlines
function RichText({ text }) {
  const lines = text.split('\n').filter(l => l.trim())
  return (
    <div className="space-y-3.5">
      {lines.map((line, i) => {
        // Numbered list item
        if (/^\d+\./.test(line)) {
          const num = line.match(/^(\d+)\./)[1]
          const rest = line.replace(/^\d+\.\s*/, '')
          const parts = rest.split(/(\*\*[^*]+\*\*)/)
          return (
            <div key={i} className="flex gap-3 items-baseline">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center text-xs font-mono font-medium">
                {num}
              </span>
              <p className="text-ink-700 font-body text-sm leading-relaxed">
                {parts.map((p, j) =>
                  p.startsWith('**') && p.endsWith('**')
                    ? <strong key={j} className="text-ink-900 font-semibold">{p.slice(2,-2)}</strong>
                    : p
                )}
              </p>
            </div>
          )
        }

        const parts = line.split(/(\*\*[^*]+\*\*)/)
        return (
          <p key={i} className="text-ink-700 font-body text-sm leading-relaxed">
            {parts.map((p, j) =>
              p.startsWith('**') && p.endsWith('**')
                ? <strong key={j} className="text-ink-900 font-semibold">{p.slice(2,-2)}</strong>
                : p
            )}
          </p>
        )
      })}
    </div>
  )
}

function CheckItem({ text }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-surface-border last:border-0">
      <div className="w-5 h-5 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
          <path d="M2 6l3 3 5-5" stroke="#0B3D2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-ink-700 font-body text-sm leading-relaxed">{text}</p>
    </div>
  )
}

const CATEGORY_LABELS = {
  rights:       { en: 'Know Your Rights',    ha: 'San Haƙƙinka',   color: 'forest' },
  before:       { en: 'Before the Election', ha: 'Kafin Zaɓe',     color: 'gold'   },
  election_day: { en: 'On Election Day',     ha: 'A Ranar Zaɓe',   color: 'ink'    },
  after:        { en: 'After Voting',        ha: 'Bayan Zaɓe',     color: 'ink'    },
}

function CategoryBadge({ category }) {
  const { lang } = useLanguage()
  const meta = CATEGORY_LABELS[category] || CATEGORY_LABELS.rights
  const colorCls = {
    forest: 'bg-forest-50 border-forest-100 text-forest-800',
    gold:   'bg-gold-50 border-gold-100 text-gold-700',
    ink:    'bg-ink-50 border-ink-100 text-ink-700',
  }
  return (
    <span className={`inline-flex items-center text-xs font-body font-semibold px-3 py-1 rounded-full border ${colorCls[meta.color]}`}>
      {meta[lang] || meta.en}
    </span>
  )
}

export default function Topic() {
  const { id } = useParams()
  const { lang, t } = useLanguage()
  const topic = content.topics.find(tp => tp.id === id)
  if (!topic) return <Navigate to="/learn" replace />

  return (
    <div className="min-h-screen bg-surface page-root">
      {/* ─── Back nav ────────────────────────────────────────── */}
      <div className="bg-surface-card border-b border-surface-border px-4 py-3">
        <Link to="/learn"
          className="inline-flex items-center gap-2 text-ink-500 hover:text-ink-800 text-sm font-body font-medium transition-colors">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {t('topic.backToLearn')}
        </Link>
      </div>

      {/* ─── Hero band ───────────────────────────────────────── */}
      <div className="bg-surface-card border-b border-surface-border px-5 pt-6 pb-7">
        <CategoryBadge category={topic.category} />
        <div className="flex items-start gap-3 mt-4">
          <span className="text-4xl leading-none">{topic.icon}</span>
          <h1 className="font-display text-3xl text-ink-900 leading-tight">
            {topic.title[lang] || topic.title.en}
          </h1>
        </div>
        {/* Summary highlight */}
        <div className="mt-5 bg-forest-50 border-l-4 border-forest-400 rounded-r-2xl pl-4 pr-4 py-3.5">
          <p className="text-forest-900 font-body text-sm leading-relaxed font-medium">
            {topic.summary[lang] || topic.summary.en}
          </p>
        </div>
      </div>

      {/* ─── Explanation ─────────────────────────────────────── */}
      <div className="px-4 pt-6 pb-2">
        <p className="text-2xs font-body font-semibold uppercase tracking-[0.14em] text-ink-400 mb-4">
          {lang === 'ha' ? 'Bayani' : 'Explanation'}
        </p>
        <div className="bg-surface-card rounded-2xl border border-surface-border shadow-card px-5 py-5">
          <RichText text={topic.explanation[lang] || topic.explanation.en} />
        </div>
      </div>

      {/* ─── Divider ─────────────────────────────────────────── */}
      <div className="flex items-center gap-4 px-4 py-6">
        <div className="flex-1 h-px bg-surface-border" />
        <span className="text-2xs font-body text-ink-300 uppercase tracking-widest">
          {lang === 'ha' ? 'Nassosi na Doka' : 'Legal Basis'}
        </span>
        <div className="flex-1 h-px bg-surface-border" />
      </div>

      {/* ─── Key facts ───────────────────────────────────────── */}
      {topic.keyFacts && (
        <div className="px-4 pb-2">
          <p className="text-2xs font-body font-semibold uppercase tracking-[0.14em] text-ink-400 mb-3">
            {t('topic.keyFacts')}
          </p>
          <div className="bg-surface-card rounded-2xl border border-surface-border shadow-card px-5">
            {(topic.keyFacts[lang] || topic.keyFacts.en).map((fact, i) => (
              <CheckItem key={i} text={fact} />
            ))}
          </div>
        </div>
      )}

      {/* ─── Law references ──────────────────────────────────── */}
      <div className="px-4 pb-10">
        <LawReference lawIds={topic.lawIds} />
      </div>
    </div>
  )
}
