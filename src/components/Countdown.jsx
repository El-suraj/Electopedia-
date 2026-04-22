import { useState, useEffect, useRef } from 'react'
import { getTimeRemaining, pad } from '../utils/countdown'
import { useLanguage } from '../context/LanguageContext'

// ─── Single digit unit block ───────────────────────────────────────────────────
function CountUnit({ value, label }) {
  const prevValue = useRef(value)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (prevValue.current !== value) {
      setAnimating(true)
      const timer = setTimeout(() => setAnimating(false), 300)
      prevValue.current = value
      return () => clearTimeout(timer)
    }
  }, [value])

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`relative overflow-hidden rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm
          w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center
          transition-all duration-300 ${animating ? 'scale-105' : 'scale-100'}`}
      >
        {/* Subtle top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/30" />
        <span className={`font-mono font-bold text-2xl sm:text-3xl tabular-nums tracking-tight text-white
          transition-all duration-300 ${animating ? 'animate-count-flip' : ''}`}>
          {pad(value)}
        </span>
      </div>
      <span className="text-white/50 text-xs font-body font-medium uppercase tracking-widest">
        {label}
      </span>
    </div>
  )
}

// ─── Separator ────────────────────────────────────────────────────────────────
function Separator() {
  return (
    <div className="flex flex-col gap-2 pb-6 opacity-40">
      <div className="w-1 h-1 rounded-full bg-white" />
      <div className="w-1 h-1 rounded-full bg-white" />
    </div>
  )
}

// ─── Main countdown ────────────────────────────────────────────────────────────
export default function Countdown({ targetDate, title, variant = 'primary', showSeconds = true }) {
  const { t } = useLanguage()
  const [time, setTime] = useState(() => getTimeRemaining(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (time.isPast) {
    return (
      <div className={`rounded-3xl p-5 text-center ${
        variant === 'primary'
          ? 'bg-white/5 border border-white/10'
          : 'bg-civic-slate/30 border border-white/5'
      }`}>
        <p className="text-white/40 font-body text-sm">{title}</p>
        <p className="text-nigeria-green font-display font-bold text-lg mt-1">
          {t('home.pastElection')}
        </p>
      </div>
    )
  }

  // Primary variant: large hero countdown
  if (variant === 'primary') {
    return (
      <div className="text-center">
        <p className="text-white/50 font-body text-sm uppercase tracking-widest mb-4">{title}</p>
        <div className="flex items-end justify-center gap-2 sm:gap-3">
          <CountUnit value={time.days} label={t('home.days')} />
          <Separator />
          <CountUnit value={time.hours} label={t('home.hours')} />
          <Separator />
          <CountUnit value={time.minutes} label={t('home.mins')} />
          {showSeconds && (
            <>
              <Separator />
              <CountUnit value={time.seconds} label={t('home.secs')} />
            </>
          )}
        </div>
      </div>
    )
  }

  // Secondary variant: compact inline countdown for deadlines
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-white/60 font-body text-sm flex-1">{title}</p>
      <div className="flex items-center gap-1.5">
        <span className="bg-white/10 border border-white/10 rounded-lg px-2.5 py-1 font-mono text-sm font-bold text-white tabular-nums">
          {pad(time.days)}<span className="text-white/40 text-xs ml-0.5">d</span>
        </span>
        <span className="text-white/30 text-xs">:</span>
        <span className="bg-white/10 border border-white/10 rounded-lg px-2.5 py-1 font-mono text-sm font-bold text-white tabular-nums">
          {pad(time.hours)}<span className="text-white/40 text-xs ml-0.5">h</span>
        </span>
        <span className="text-white/30 text-xs">:</span>
        <span className="bg-white/10 border border-white/10 rounded-lg px-2.5 py-1 font-mono text-sm font-bold text-white tabular-nums">
          {pad(time.minutes)}<span className="text-white/40 text-xs ml-0.5">m</span>
        </span>
      </div>
    </div>
  )
}
