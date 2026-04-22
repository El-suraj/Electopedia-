import { Link, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import content from '../data/content.json'

const CATEGORY_META = {
  rights:       { icon: '🛡️', color: 'green' },
  before:       { icon: '📋', color: 'gold'  },
  election_day: { icon: '🏟️', color: 'blue'  },
  after:        { icon: '📊', color: 'slate' },
}

function CategoryGroup({ category, topics }) {
  const { lang, t } = useLanguage()
  const meta = CATEGORY_META[category] || { icon: '📌', color: 'green' }

  const headerColors = {
    green: 'bg-forest-50 border-forest-100 text-forest-800',
    gold:  'bg-gold-50 border-gold-100 text-gold-700',
    blue:  'bg-ink-50 border-ink-100 text-ink-700',
    slate: 'bg-ink-50 border-ink-100 text-ink-600',
  }

  return (
    <div className="mb-8">
      {/* Category header */}
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-4 ${headerColors[meta.color]}`}>
        <span className="text-sm">{meta.icon}</span>
        <span className="text-xs font-body font-semibold">{t(`learn.categories.${category}`)}</span>
      </div>

      {/* Topic cards */}
      <div className="flex flex-col gap-3">
        {topics.map((topic, i) => (
          <TopicCard key={topic.id} topic={topic} delay={i} />
        ))}
      </div>
    </div>
  )
}

function TopicCard({ topic, delay = 0 }) {
  const { lang } = useLanguage()
  const meta = CATEGORY_META[topic.category] || { color: 'green' }

  const accentColors = {
    green: 'border-l-forest-400',
    gold:  'border-l-gold-400',
    blue:  'border-l-ink-400',
    slate: 'border-l-ink-300',
    red:   'border-l-red-400',
    purple:'border-l-purple-400',
  }

  return (
    <Link to={`/topic/${topic.id}`}
      className={`group flex items-center gap-4 bg-surface-card rounded-2xl border border-surface-border border-l-4
        ${accentColors[topic.color] || accentColors.green}
        shadow-card hover:shadow-card-hover hover:-translate-y-0.5
        transition-all duration-200 px-5 py-4 active:translate-y-0`}
      style={{ animationDelay: `${delay * 60}ms` }}
    >
      <span className="text-2xl flex-shrink-0">{topic.icon}</span>
      <div className="flex-1 min-w-0">
        <h3 className="font-body font-semibold text-ink-900 text-base leading-tight mb-1">
          {topic.title[lang] || topic.title.en}
        </h3>
        <p className="text-ink-500 text-sm leading-relaxed line-clamp-2">
          {topic.summary[lang] || topic.summary.en}
        </p>
      </div>
      <svg viewBox="0 0 20 20" fill="currentColor"
        className="w-4 h-4 text-ink-300 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </Link>
  )
}

export default function Learn() {
  const { t, lang } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = searchParams.get('filter') || 'all'

  const categories = ['all','rights','before','election_day','after']
  const filterLabels = {
    all: lang === 'ha' ? 'Duka' : 'All',
    rights:       t('learn.categories.rights'),
    before:       t('learn.categories.before'),
    election_day: t('learn.categories.election_day'),
    after:        t('learn.categories.after'),
  }

  const filtered = activeFilter === 'all'
    ? content.topics
    : content.topics.filter(tp => tp.category === activeFilter)

  // Group by category for grouped display
  const grouped = {}
  filtered.forEach(tp => {
    if (!grouped[tp.category]) grouped[tp.category] = []
    grouped[tp.category].push(tp)
  })

  return (
    <div className="min-h-screen bg-surface page-root">
      {/* ─── Header ──────────────────────────────────────────── */}
      <div className="bg-surface-card border-b border-surface-border px-5 pt-8 pb-5">
        <p className="text-2xs font-body font-semibold uppercase tracking-[0.14em] text-ink-400 mb-2">
          {lang === 'ha' ? 'Ilimin Farar Hula' : 'Civic Education'}
        </p>
        <h1 className="font-display text-3xl text-ink-900 mb-2">{t('learn.title')}</h1>
        <p className="text-ink-500 font-body text-sm leading-relaxed">{t('learn.subtitle')}</p>
      </div>

      {/* ─── Filter pills ─────────────────────────────────────── */}
      <div className="bg-surface-card border-b border-surface-border px-4 py-3 overflow-x-auto scrollbar-none sticky top-0 md:top-[65px] z-30">
        <div className="flex gap-2 min-w-max">
          {categories.map(cat => (
            <button key={cat}
              onClick={() => setSearchParams(cat === 'all' ? {} : { filter: cat })}
              className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all duration-150 whitespace-nowrap ${
                activeFilter === cat
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'bg-surface-muted text-ink-500 hover:bg-surface-border hover:text-ink-800'
              }`}
            >
              {filterLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Content ──────────────────────────────────────────── */}
      <div className="px-4 pt-6 pb-8">
        {activeFilter === 'all' ? (
          Object.entries(grouped).map(([cat, topics]) => (
            <CategoryGroup key={cat} category={cat} topics={topics} />
          ))
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((topic, i) => <TopicCard key={topic.id} topic={topic} delay={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
