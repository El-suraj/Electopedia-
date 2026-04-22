import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'

// ─── Settings section wrapper ─────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-white/40 text-xs font-body font-semibold uppercase tracking-widest mb-3 px-1">
        {title}
      </h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  )
}

// ─── Info row ────────────────────────────────────────────────────────────────
function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 last:border-0">
      <span className="text-white/50 font-body text-sm">{label}</span>
      <span className="text-white/80 font-body text-sm font-medium">{value}</span>
    </div>
  )
}

// ─── Link row ────────────────────────────────────────────────────────────────
function LinkRow({ label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group"
    >
      <span className="text-white/70 font-body text-sm group-hover:text-white transition-colors">{label}</span>
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors">
        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
      </svg>
    </a>
  )
}

// ─── Settings page ────────────────────────────────────────────────────────────
export default function Settings() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen px-5 pt-8 pb-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-nigeria-green text-xs font-body font-semibold uppercase tracking-widest">
          Preferences
        </span>
        <h1 className="font-display font-black text-3xl text-white mt-1">
          {t('settings.title')}
        </h1>
      </div>

      {/* Language */}
      <Section title={t('settings.language')}>
        <div className="p-4">
          <LanguageSwitcher />
        </div>
      </Section>

      {/* Official links */}
      <Section title="Official Resources">
        <LinkRow label="INEC — inec.gov.ng" href="https://www.inec.gov.ng" />
        <LinkRow label="Nigerian Constitution (PDF)" href="https://www.constituteproject.org/constitution/Nigeria_2011.pdf" />
        <LinkRow label="Electoral Act 2022 (PDF)" href="https://www.inec.gov.ng/wp-content/uploads/2022/02/Electoral-Act-2022-signed.pdf" />
        <LinkRow label="Verify your voter status" href="https://voters.inec.gov.ng" />
      </Section>

      {/* About */}
      <Section title={t('settings.about')}>
        <div className="px-5 py-4 border-b border-white/5">
          <p className="text-white/60 font-body text-sm leading-relaxed">
            {t('settings.aboutText')}
          </p>
        </div>
        <InfoRow label={t('settings.version')} value="1.0.0" />
        <InfoRow label="Build" value="Production" />
      </Section>

      {/* Disclaimer */}
      <div className="bg-civic-gold/10 border border-civic-gold/20 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-civic-gold text-base">⚠️</span>
          <div>
            <p className="text-civic-gold font-body font-semibold text-sm mb-1.5">
              {t('settings.disclaimer')}
            </p>
            <p className="text-white/50 font-body text-xs leading-relaxed">
              {t('settings.disclaimerText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
