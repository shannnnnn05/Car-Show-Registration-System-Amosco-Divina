import type { ReactNode } from 'react'

type Tone = 'cyan' | 'blue' | 'red' | 'green' | 'amber'

const tones: Record<Tone, string> = {
  cyan: 'bg-cyan-50 text-cyan-700',
  blue: 'bg-sky-50 text-sky-700',
  red: 'bg-rose-50 text-rose-600',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
}

interface KpiCardProps {
  label: string
  value: string
  detail?: string
  tone: Tone
  icon: ReactNode
}

export function KpiCard({ label, value, detail, tone, icon }: KpiCardProps) {
  return (
    <article className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm shadow-cyan-900/5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>{icon}</span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      {detail && <p className="mt-1 text-xs text-slate-500">{detail}</p>}
    </article>
  )
}

export function KpiCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="h-4 w-28 rounded bg-slate-100" />
        <div className="h-9 w-9 rounded-xl bg-slate-100" />
      </div>
      <div className="mt-4 h-7 w-24 rounded bg-slate-100" />
      <div className="mt-2 h-3 w-32 rounded bg-slate-100" />
    </div>
  )
}
