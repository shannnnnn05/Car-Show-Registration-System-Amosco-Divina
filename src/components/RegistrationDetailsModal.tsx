import { useEffect, useState } from 'react'
import { getRegistrationById } from '../api'
import type { Registration } from '../types/registration'
import { formatCurrency, formatDate } from '../utils/format'
import { PaymentBadge } from './PaymentBadge'
import { StatusBadge } from './StatusBadge'
import { Modal } from './Modal'

interface RegistrationDetailsModalProps {
  id: string
  onClose: () => void
}

export function RegistrationDetailsModal({ id, onClose }: RegistrationDetailsModalProps) {
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setError('')

    getRegistrationById(id, controller.signal)
      .then(setRegistration)
      .catch((caught: unknown) => {
        if (controller.signal.aborted) return
        setError(caught instanceof Error ? caught.message : 'Cannot load this registration.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [id])

  return (
    <Modal title="Registration details" subtitle={registration?.registrationNumber} onClose={onClose} wide>
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-10 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
          >
            Close
          </button>
        </div>
      )}

      {!loading && registration && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={registration.status} />
            <PaymentBadge status={registration.paymentStatus} />
            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-inset ring-cyan-200">
              {registration.registrationType}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Participant</p>
              <p className="mt-1 font-semibold text-slate-800">{registration.participantName}</p>
              <p className="text-sm text-slate-500">{registration.contactNumber}</p>
              <p className="text-sm text-slate-500">{registration.email}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Address</p>
              <p className="mt-1 text-sm text-slate-700">{registration.address}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Car</p>
              <p className="mt-1 font-semibold text-slate-800">{registration.carMakeModel}</p>
              <p className="text-sm uppercase tracking-wide text-slate-500">{registration.plateNumber}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Registered on</p>
              <p className="mt-1 text-sm text-slate-700">{formatDate(registration.registrationDate)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Registration fee</p>
              <p className="mt-1 text-sm font-semibold tabular-nums text-slate-800">{formatCurrency(registration.registrationFee)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Amount paid</p>
              <p className="mt-1 text-sm font-semibold tabular-nums text-slate-800">{formatCurrency(registration.amountPaid)}</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
            Registration ID: <span className="font-mono text-slate-600">{registration.id}</span>
          </div>
        </div>
      )}
    </Modal>
  )
}
