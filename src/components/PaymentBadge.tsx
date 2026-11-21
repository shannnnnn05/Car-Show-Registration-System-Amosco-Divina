import type { PaymentStatus } from '../types/registration'

const styles: Record<PaymentStatus, string> = {
  Unpaid: 'bg-red-50 text-red-700 ring-red-200',
  Partial: 'bg-amber-50 text-amber-700 ring-amber-200',
  Paid: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

export function PaymentBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}>
      {status}
    </span>
  )
}
