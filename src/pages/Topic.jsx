import { useParams, Link, Navigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LawReference from '../components/LawReference'
import content from '../data/content.json'

// ─── Simple markdown-ish renderer (handles **bold** and \n) ───────────────────
function RichText({ text }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-3">
      {lines.map((line, i) => {
        if (!line.trim()) return null

        // Parse **bold** markers
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        const rendered = parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={j} className="text-white font-semibold">
                {part.slice(2, -2)}
              </strong>
            )
          }
          return part
        })

        // Detect list items starting with digit + dot
        if (/^\d+\./.test(line)) {
          return (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-nigeria-green/20 text-nigeria-green rounded-full flex items-center justify-center text-xs font-mono font-bold mt-0.5">
                {line.match(/^(\d+)/)[1]}
              </span>
              <p className="text-white/70 font-body text-sm leading-relaxed">{rendered}</p>
            </div>
          )
        }

        return (
          <p key={i} className="text-white/70 font-body text-sm leading-relaxed">
            {rendered}
          </p>
        )
      })}
    </div>
  )
}

// ─── Key facts list ───────────────────────────────────────────────────────────
function KeyFacts({ facts }) {
  return (
    <div className="space-y-2">
      {facts.map((fact, i) => (
        <div key={i} className="flex items-start gap-3 py-2">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-nigeria-green flex-shrink-0 mt-0.5">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="text-white/80 font-body text-sm leading-relaxed">{fact}</p>
        </div>
      ))}
    </div>
  )
}

// ─── Category badge ───────────────────────────────────────────────────────────
function CategoryBadge({ category }) {
  const { t } = useLanguage()
  const colorMap = {
    rights: 'bg-nigeria-green/20 text-nigeria-green',
    before: 'bg-civic-gold/20 text-civic-gold',
    election_day: 'bg-blue-400/20 text-blue-400',
    after: 'bg-purple-400/20 text-purple-400',
  }
  return (
    <span className={`inline-block text-xs font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full ${colorMap[category] || colorMap.rights}`}>
      {t(`learn.categories.${category}`)}
    </span>
  )
}

// ─── Topic page ───────────────────────────────────────────────────────────────
export default function Topic() {
  const { id } = useParams()
  const { lang, t } = useLanguage()

  const topic = content.topics.find(tp => tp.id === id)

  if (!topic) return <Navigate to="/learn" replace />

  return (
    <div className="min-h-screen">
      {/* ── Back link ───────────────────────────────────────────────────── */}
      <div className="px-5 pt-6 pb-2">
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-body font-medium transition-colors duration-200"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {t('topic.backToLearn')}
        </Link>
      </div>

      {/* ── Topic header ────────────────────────────────────────────────── */}
      <div className="px-5 pt-3 pb-6">
        {/* Background glow */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-40 h-40 bg-nigeria-green/8 rounded-full blur-3xl -z-10" />
          
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl leading-none">{topic.icon}</span>
            <div>
              <CategoryBadge category={topic.category} />
            </div>
          </div>

          <h1 className="font-display font-black text-3xl text-white leading-tight mb-3">
            {topic.title[lang] || topic.title.en}
          </h1>

          {/* Summary pill */}
          <div className="bg-nigeria-green/10 border border-nigeria-green/20 rounded-2xl p-4">
            <p className="text-white/80 font-body text-sm leading-relaxed">
              {topic.summary[lang] || topic.summary.en}
            </p>
          </div>
        </div>
      </div>

      {/* ── Full explanation ─────────────────────────────────────────────── */}
      <div className="px-5 pb-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <RichText text={topic.explanation[lang] || topic.explanation.en} />
        </div>
      </div>

      {/* ── Key facts ────────────────────────────────────────────────────── */}
      {topic.keyFacts && (
        <div className="px-5 pb-6">
          <h2 className="text-white/40 text-xs font-body font-semibold uppercase tracking-widest mb-3">
            {t('topic.keyFacts')}
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 divide-y divide-white/5">
            <KeyFacts facts={topic.keyFacts[lang] || topic.keyFacts.en} />
          </div>
        </div>
      )}

      {/* ── Law references ────────────────────────────────────────────────── */}
      <div className="px-5 pb-10">
        <LawReference lawIds={topic.lawIds} />
      </div>
    </div>
  )
}
