import type { Registration } from '../types/registration'
import { formatCurrency, formatDate } from '../utils/format'
import { PaymentBadge } from './PaymentBadge'
import { StatusBadge } from './StatusBadge'

interface RegistrationTableProps {
  items: Registration[]
  loading: boolean
  onView: (id: string) => void
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-slate-50">
          {Array.from({ length: 8 }).map((__, cellIndex) => (
            <td key={cellIndex} className="px-4 py-4">
              <div className="h-3.5 animate-pulse rounded bg-slate-100" style={{ width: `${55 + ((rowIndex + cellIndex) % 3) * 15}%` }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export function RegistrationTable({ items, loading, onView }: RegistrationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[1040px] w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-500">
            <th scope="col" className="px-4 py-3 font-semibold">Registration No.</th>
            <th scope="col" className="px-4 py-3 font-semibold">Date</th>
            <th scope="col" className="px-4 py-3 font-semibold">Participant</th>
            <th scope="col" className="px-4 py-3 font-semibold">Car</th>
            <th scope="col" className="px-4 py-3 font-semibold">Type</th>
            <th scope="col" className="px-4 py-3 font-semibold">Status</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">Fee / Paid</th>
            <th scope="col" className="px-4 py-3 font-semibold">Payment</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <SkeletonRows />
          ) : (
            items.map((registration) => (
              <tr key={registration.id} className="border-b border-slate-50 transition hover:bg-cyan-50/40">
                <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-slate-800">{registration.registrationNumber}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-slate-600">{formatDate(registration.registrationDate)}</td>
                <td className="px-4 py-3.5">
                  <p className="font-medium text-slate-800">{registration.participantName}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{registration.contactNumber}</p>
                  <p className="text-xs text-slate-400">{registration.email}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="font-medium text-slate-700">{registration.carMakeModel}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wide text-slate-500">{registration.plateNumber}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-slate-600">{registration.registrationType}</td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <StatusBadge status={registration.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-right">
                  <p className="font-medium tabular-nums text-slate-700">
                    <span className="mr-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Fee</span>
                    {formatCurrency(registration.registrationFee)}
                  </p>
                  <p className="mt-0.5 text-xs tabular-nums text-slate-500">
                    <span className="mr-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Paid</span>
                    {formatCurrency(registration.amountPaid)}
                  </p>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <PaymentBadge status={registration.paymentStatus} />
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-right">
                  <button
                    type="button"
                    onClick={() => onView(registration.id)}
                    className="rounded-lg border border-cyan-200 px-3 py-1.5 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
