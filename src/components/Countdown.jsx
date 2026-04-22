import { useState, useEffect, useRef } from 'react'
import { getTimeRemaining, pad } from '../utils/countdown'
import { useLanguage } from '../context/LanguageContext'

// Single unit block with pop animation on change
function CountUnit({ value, label, size = 'lg' }) {
  const prev = useRef(value)
  const [popping, setPopping] = useState(false)

  useEffect(() => {
    if (prev.current !== value) {
      setPopping(true)
      const t = setTimeout(() => setPopping(false), 280)
      prev.current = value
      return () => clearTimeout(t)
    }
  }, [value])

  const isLg = size === 'lg'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`
        relative flex items-center justify-center
        bg-surface-card border border-surface-border rounded-2xl
        shadow-count tabular-nums font-mono
        ${isLg ? 'w-[72px] h-[72px] sm:w-20 sm:h-20' : 'w-14 h-14'}
        ${popping ? 'animate-count-pop' : ''}
        transition-shadow duration-200
      `}>
        {/* Top sheen */}
        <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
        {/* Center divider */}
        <div className="absolute inset-x-2 top-1/2 h-px bg-surface-border opacity-60" />
        <span className={`font-mono font-semibold text-ink-900 ${isLg ? 'text-[2rem] sm:text-[2.25rem]' : 'text-2xl'}`}>
          {pad(value)}
        </span>
      </div>
      <span className="text-2xs font-body font-medium uppercase tracking-[0.12em] text-ink-400">
        {label}
      </span>
    </div>
  )
}

function Colon({ size = 'lg' }) {
  return (
    <div className={`flex flex-col gap-1.5 pb-7 ${size === 'lg' ? 'px-0.5' : 'px-0'}`}>
      <div className="w-1 h-1 rounded-full bg-ink-200" />
      <div className="w-1 h-1 rounded-full bg-ink-200" />
    </div>
  )
}

export default function Countdown({ targetDate, title, variant = 'primary' }) {
  const { t } = useLanguage()
  const [time, setTime] = useState(() => getTimeRemaining(targetDate))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeRemaining(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (time.isPast) {
    return (
      <div className="text-center py-4">
        <p className="text-ink-400 font-body text-sm">{title}</p>
        <p className="text-forest-700 font-display text-lg mt-1">{t('home.pastElection')}</p>
      </div>
    )
  }

  // Primary: large hero
  if (variant === 'primary') {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-2xs font-body font-semibold uppercase tracking-[0.14em] text-ink-400">{title}</p>
        <div className="flex items-end gap-2 sm:gap-3">
          <CountUnit value={time.days}    label={t('home.days')}  size="lg" />
          <Colon />
          <CountUnit value={time.hours}   label={t('home.hours')} size="lg" />
          <Colon />
          <CountUnit value={time.minutes} label={t('home.mins')}  size="lg" />
          <Colon />
          <CountUnit value={time.seconds} label={t('home.secs')}  size="lg" />
        </div>
      </div>
    )
  }

  // Secondary: compact inline
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm font-body text-ink-600 leading-snug">{title}</p>
      <div className="flex items-center gap-1 flex-shrink-0">
        {[
          { v: time.days,    s: t('home.days')[0]    },
          { v: time.hours,   s: t('home.hours')[0]   },
          { v: time.minutes, s: t('home.mins')[0]    },
        ].map(({ v, s }, i) => (
          <span key={i} className="flex items-baseline gap-0.5">
            {i > 0 && <span className="text-ink-200 text-xs mx-0.5">·</span>}
            <span className="font-mono font-medium text-sm text-ink-800 tabular-nums">{pad(v)}</span>
            <span className="text-2xs text-ink-400 font-body">{s}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
