import { Link } from 'react-router-dom'
import Countdown from '../components/Countdown'
import { useLanguage } from '../context/LanguageContext'
import content from '../data/content.json'

// ─── Category card for quick navigation ───────────────────────────────────────
function CategoryCard({ icon, title, description, to, color }) {
  const colorMap = {
    green: 'from-nigeria-green/20 to-nigeria-green/5 border-nigeria-green/30 hover:border-nigeria-green/60',
    gold: 'from-civic-gold/20 to-civic-gold/5 border-civic-gold/30 hover:border-civic-gold/60',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-500/60',
  }

  return (
    <Link
      to={to}
      className={`group block p-5 rounded-2xl border bg-gradient-to-br ${colorMap[color] || colorMap.green}
        transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="font-display font-bold text-white text-base leading-tight mb-1">{title}</h3>
          <p className="text-white/50 text-sm font-body leading-snug">{description}</p>
        </div>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-white/20 group-hover:text-white/60 flex-shrink-0 mt-1 transition-colors duration-200"
        >
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </Link>
  )
}

// ─── Home page ────────────────────────────────────────────────────────────────
export default function Home() {
  const { t, lang } = useLanguage()
  const { elections } = content

  return (
    <div className="min-h-screen">
      {/* ── Hero section ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pt-10 pb-8">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-nigeria-green/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-48 h-48 bg-civic-gold/5 rounded-full blur-2xl" />
        </div>

        {/* Logo + tagline */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-nigeria-green/15 border border-nigeria-green/30 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-nigeria-green animate-pulse-green" />
            <span className="text-nigeria-green text-xs font-body font-semibold uppercase tracking-wider">
              Nigeria Civic App
            </span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight mb-2">
            Civic<span className="text-nigeria-green">NG</span>
          </h1>
          <p className="text-white/50 font-body text-sm leading-relaxed max-w-xs mx-auto">
            {t('home.tagline')}
          </p>
        </div>

        {/* ── Main election countdown ──────────────────────────────────── */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-4">
          <Countdown
            targetDate={elections.nextElection}
            title={t('home.nextElection')}
            variant="primary"
            showSeconds={true}
          />
        </div>

        {/* ── Deadline countdowns ──────────────────────────────────────── */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4">
          <div className="pb-3 border-b border-white/10">
            <Countdown
              targetDate={elections.registrationDeadline}
              title={t('home.registrationDeadline')}
              variant="secondary"
            />
          </div>
          <Countdown
            targetDate={elections.pvcDeadline}
            title={t('home.pvcDeadline')}
            variant="secondary"
          />
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <section className="px-5 pb-6">
        <div className="flex gap-3">
          <Link
            to="/learn?filter=rights"
            className="flex-1 bg-nigeria-green text-white font-body font-bold text-sm py-4 px-4 rounded-2xl text-center
              transition-all duration-200 hover:bg-nigeria-green-dark active:scale-95 animate-pulse-green"
          >
            {t('home.ctaRights')}
          </Link>
          <Link
            to="/learn?filter=before"
            className="flex-1 bg-white/10 text-white font-body font-bold text-sm py-4 px-4 rounded-2xl text-center
              border border-white/10 transition-all duration-200 hover:bg-white/20 active:scale-95"
          >
            {t('home.ctaPrepare')}
          </Link>
        </div>
      </section>

      {/* ── Quick topics ───────────────────────────────────────────────────── */}
      <section className="px-5 pb-8">
        <h2 className="font-display font-bold text-white text-xl mb-4">
          {t('home.ctaLearn')}
        </h2>
        <div className="space-y-3">
          <CategoryCard
            icon="🗳️"
            title={t('learn.categories.rights')}
            description={lang === 'ha' ? 'Haƙƙinka a matsayinka na mai zaɓe.' : 'Your fundamental rights as a voter.'}
            to="/learn?filter=rights"
            color="green"
          />
          <CategoryCard
            icon="📋"
            title={t('learn.categories.before')}
            description={lang === 'ha' ? 'Yadda ake yin shiri kafin ranar zaɓe.' : 'How to prepare before election day.'}
            to="/learn?filter=before"
            color="gold"
          />
          <CategoryCard
            icon="🏟️"
            title={t('learn.categories.election_day')}
            description={lang === 'ha' ? 'Abin da ke faruwa a rumfar zaɓe.' : 'What happens at your polling unit.'}
            to="/learn?filter=election_day"
            color="blue"
          />
          <CategoryCard
            icon="📊"
            title={t('learn.categories.after')}
            description={lang === 'ha' ? 'Sakamakon zaɓe da yadda ake kare su.' : 'Results, accountability, and what comes next.'}
            to="/learn?filter=after"
            color="green"
          />
        </div>
      </section>

      {/* ── INEC notice ───────────────────────────────────────────────────── */}
      <section className="px-5 pb-8">
        <div className="bg-civic-gold/10 border border-civic-gold/20 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-civic-gold text-lg">⚠️</span>
            <div>
              <p className="text-civic-gold font-body font-semibold text-sm mb-1">Official information</p>
              <p className="text-white/50 text-xs font-body leading-relaxed">
                Always verify election dates and deadlines at{' '}
                <a
                  href="https://www.inec.gov.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-civic-gold hover:underline"
                >
                  inec.gov.ng
                </a>. Dates shown are indicative.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
