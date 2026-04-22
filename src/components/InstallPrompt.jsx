import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

/**
 * PWA install prompt banner.
 * Listens for the `beforeinstallprompt` event and shows a native-feeling banner.
 */
export default function InstallPrompt() {
  const { t } = useLanguage()
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('install_dismissed')
    if (dismissed) return

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setVisible(false)
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setVisible(false)
    sessionStorage.setItem('install_dismissed', '1')
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50 animate-fade-up">
      <div className="bg-civic-charcoal border border-nigeria-green/30 rounded-2xl p-4 shadow-2xl shadow-black/50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-nigeria-green flex items-center justify-center flex-shrink-0 text-white font-mono font-bold text-sm">
            NG
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-body font-semibold leading-snug">
              {t('install.prompt')}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleInstall}
                className="flex-1 bg-nigeria-green text-white text-xs font-body font-bold py-2 px-3 rounded-xl hover:bg-nigeria-green-dark transition-colors"
              >
                {t('install.install')}
              </button>
              <button
                onClick={handleDismiss}
                className="text-white/40 text-xs font-body hover:text-white/60 transition-colors py-2 px-2"
              >
                {t('install.dismiss')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
