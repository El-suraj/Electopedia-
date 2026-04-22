import { Link, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import content from '../data/content.json'

// ─── Category filter pill ─────────────────────────────────────────────────────
function FilterPill({ value, label, active, onClick }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-2 rounded-full text-sm font-body font-semibold whitespace-nowrap transition-all duration-200 ${
        active
          ? 'bg-nigeria-green text-white shadow-sm shadow-nigeria-green/30'
          : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}

// ─── Topic card ───────────────────────────────────────────────────────────────
function TopicCard({ topic }) {
  const { lang, t } = useLanguage()

  const colorBorder = {
    green: 'border-l-nigeria-green',
    blue: 'border-l-blue-400',
    gold: 'border-l-civic-gold',
    red: 'border-l-red-400',
    purple: 'border-l-purple-400',
  }

  return (
    <Link
      to={`/topic/${topic.id}`}
      className={`group block bg-white/5 border border-white/10 border-l-4 ${colorBorder[topic.color] || colorBorder.green}
        rounded-2xl p-5 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01] active:scale-[0.99]`}
    >
      <div className="flex items-start gap-4">
        <span className="text-2xl leading-none mt-0.5">{topic.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white/30 text-xs font-body font-medium uppercase tracking-wider">
              {t(`learn.categories.${topic.category}`)}
            </span>
          </div>
          <h3 className="font-display font-bold text-white text-lg leading-tight mb-1.5">
            {topic.title[lang] || topic.title.en}
          </h3>
          <p className="text-white/50 text-sm font-body leading-relaxed line-clamp-2">
            {topic.summary[lang] || topic.summary.en}
          </p>
          <div className="flex items-center gap-1 mt-3 text-nigeria-green text-xs font-body font-semibold group-hover:gap-2 transition-all duration-200">
            {t('learn.readMore')}
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Learn page ────────────────────────────────────────────────────────────────
export default function Learn() {
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = searchParams.get('filter') || 'all'

  const categories = [
    { value: 'all', label: 'All Topics' },
    { value: 'rights', label: t('learn.categories.rights') },
    { value: 'before', label: t('learn.categories.before') },
    { value: 'election_day', label: t('learn.categories.election_day') },
    { value: 'after', label: t('learn.categories.after') },
  ]

  const filtered = activeFilter === 'all'
    ? content.topics
    : content.topics.filter(t => t.category === activeFilter)

  return (
    <div className="min-h-screen">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="px-5 pt-8 pb-5">
        <div className="mb-2">
          <span className="text-nigeria-green text-xs font-body font-semibold uppercase tracking-widest">
            Education
          </span>
        </div>
        <h1 className="font-display font-black text-3xl text-white mb-2">
          {t('learn.title')}
        </h1>
        <p className="text-white/50 font-body text-sm leading-relaxed">
          {t('learn.subtitle')}
        </p>
      </div>

      {/* ── Filter pills ────────────────────────────────────────────────── */}
      <div className="px-5 pb-4 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 pb-1" style={{ minWidth: 'max-content' }}>
          {categories.map(cat => (
            <FilterPill
              key={cat.value}
              value={cat.value}
              label={cat.label}
              active={activeFilter === cat.value}
              onClick={(v) => setSearchParams(v === 'all' ? {} : { filter: v })}
            />
          ))}
        </div>
      </div>

      {/* ── Topic list ──────────────────────────────────────────────────── */}
      <div className="px-5 pb-8 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/30 font-body">
            No topics found.
          </div>
        ) : (
          filtered.map((topic, i) => (
            <div
              key={topic.id}
              style={{ animationDelay: `${i * 60}ms` }}
              className="animate-fade-up"
            >
              <TopicCard topic={topic} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
