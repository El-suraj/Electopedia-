import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'

function SectionHeader({ title }) {
  return (
    <p className="text-2xs font-body font-semibold uppercase tracking-[0.14em] text-ink-400 mb-3 px-1">
      {title}
    </p>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-surface-card rounded-2xl border border-surface-border shadow-card overflow-hidden mb-6 ${className}`}>
      {children}
    </div>
  )
}

function InfoRow({ label, value, last }) {
  return (
    <div className={`flex items-center justify-between px-5 py-3.5 ${!last ? 'border-b border-surface-border' : ''}`}>
      <span className="text-ink-500 font-body text-sm">{label}</span>
      <span className="text-ink-800 font-body text-sm font-medium">{value}</span>
    </div>
  )
}

function LinkRow({ label, href, last }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`group flex items-center justify-between px-5 py-3.5 hover:bg-surface-muted transition-colors ${!last ? 'border-b border-surface-border' : ''}`}>
      <span className="text-ink-700 font-body text-sm group-hover:text-ink-900 transition-colors">{label}</span>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-ink-300 group-hover:text-forest-600 transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M10 2h4m0 0v4m0-4L7 9" />
      </svg>
    </a>
  )
}

export default function Settings() {
  const { t, lang } = useLanguage()

  return (
    <div className="min-h-screen bg-surface page-root">
      {/* Header */}
      <div className="bg-surface-card border-b border-surface-border px-5 pt-8 pb-6">
        <p className="text-2xs font-body font-semibold uppercase tracking-[0.14em] text-ink-400 mb-2">
          {lang === 'ha' ? 'Tsara' : 'Preferences'}
        </p>
        <h1 className="font-display text-3xl text-ink-900">{t('settings.title')}</h1>
      </div>

      <div className="px-4 pt-6 pb-10">
        {/* Language */}
        <SectionHeader title={t('settings.language')} />
        <div className="mb-6">
          <LanguageSwitcher />
        </div>

        {/* Official resources */}
        <SectionHeader title={lang === 'ha' ? 'Hanyoyin Hukuma' : 'Official Resources'} />
        <Card>
          <LinkRow label="INEC — inec.gov.ng"               href="https://www.inec.gov.ng" />
          <LinkRow label={lang === 'ha' ? 'Tabbatar da Halin Zaɓenku' : 'Verify voter status'} href="https://voters.inec.gov.ng" />
          <LinkRow label={lang === 'ha' ? 'Kundin Tsarin Mulki (PDF)' : 'Nigerian Constitution (PDF)'} href="https://www.constituteproject.org/constitution/Nigeria_2011.pdf" />
          <LinkRow label={lang === 'ha' ? 'Dokar Zaɓe 2022 (PDF)' : 'Electoral Act 2022 (PDF)'} href="https://www.inec.gov.ng/wp-content/uploads/2022/02/Electoral-Act-2022-signed.pdf" last />
        </Card>

        {/* About */}
        <SectionHeader title={t('settings.about')} />
        <Card>
          <div className="px-5 py-4 border-b border-surface-border">
            <p className="text-ink-600 font-body text-sm leading-relaxed">{t('settings.aboutText')}</p>
          </div>
          <InfoRow label={lang === 'ha' ? 'Sigar' : 'Version'} value="1.0.0" />
          <InfoRow label="Build" value="Production" last />
        </Card>

        {/* Disclaimer */}
        <div className="bg-gold-50 border border-gold-100 rounded-2xl px-5 py-4">
          <div className="flex items-start gap-3">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-gold-700 font-body font-semibold text-sm mb-1">{t('settings.disclaimer')}</p>
              <p className="text-ink-600 font-body text-xs leading-relaxed">{t('settings.disclaimerText')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
