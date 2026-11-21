import type { RegistrationSummary } from '../types/registration'
import { formatCurrency, formatNumber } from '../utils/format'
import { AlertIcon, ChartIcon, CheckIcon, DoorIcon, TicketIcon, WalletIcon } from './Icons'
import { KpiCard, KpiCardSkeleton } from './KpiCard'

interface KpiCardsProps {
  summary: RegistrationSummary | null
  loading: boolean
}

export function KpiCards({ summary, loading }: KpiCardsProps) {
  if (loading || !summary) {
    return (
      <section aria-label="Event totals" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <KpiCardSkeleton key={index} />
        ))}
      </section>
    )
  }

  const collectionRate = summary.totalFees === 0 ? 0 : (summary.totalPayments / summary.totalFees) * 100

  return (
    <section aria-label="Event totals" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
      <KpiCard
        label="Total Registrations"
        value={formatNumber(summary.totalRegistrations)}
        detail={`${formatNumber(summary.pending)} pending, ${formatNumber(summary.cancelled)} cancelled`}
        tone="cyan"
        icon={<TicketIcon />}
      />
      <KpiCard
        label="Total Payments"
        value={formatCurrency(summary.totalPayments)}
        detail="Collected from active registrations"
        tone="green"
        icon={<WalletIcon />}
      />
      <KpiCard
        label="Uncollected Payments"
        value={formatCurrency(summary.uncollectedPayments)}
        detail={`Total fees ${formatCurrency(summary.totalFees)}`}
        tone="red"
        icon={<AlertIcon />}
      />
      <KpiCard
        label="Confirmed"
        value={formatNumber(summary.confirmed)}
        detail="Participants with confirmed slots"
        tone="blue"
        icon={<CheckIcon />}
      />
      <KpiCard
        label="Checked In"
        value={formatNumber(summary.checkedIn)}
        detail="Already at the venue"
        tone="cyan"
        icon={<DoorIcon />}
      />
      <KpiCard
        label="Collection Rate"
        value={`${collectionRate.toFixed(1)}%`}
        detail="Payments against total fees"
        tone="amber"
        icon={<ChartIcon />}
      />
    </section>
  )
}
