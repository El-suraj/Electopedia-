import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function InstallPrompt() {
  const { t } = useLanguage()
  const [prompt, setPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('install_dismissed')) return
    const handler = (e) => { e.preventDefault(); setPrompt(e); setVisible(true) }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setVisible(false)
    setPrompt(null)
  }

  const dismiss = () => { setVisible(false); sessionStorage.setItem('install_dismissed', '1') }

  if (!visible) return null

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50 anim-1">
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 shadow-card-hover">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest-900 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-mono font-medium">NG</span>
          </div>
          <div className="flex-1">
            <p className="text-ink-800 text-sm font-body font-semibold leading-snug mb-3">{t('install.prompt')}</p>
            <div className="flex gap-2">
              <button onClick={handleInstall}
                className="flex-1 bg-forest-900 text-white text-xs font-semibold py-2.5 px-3 rounded-xl hover:bg-forest-800 transition-colors shadow-cta">
                {t('install.install')}
              </button>
              <button onClick={dismiss}
                className="text-ink-400 text-xs font-body hover:text-ink-600 transition-colors py-2 px-2">
                {t('install.dismiss')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
