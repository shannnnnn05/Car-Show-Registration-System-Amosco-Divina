import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ApiError, createRegistration } from '../api'
import type { CreateRegistrationPayload, Registration, RegistrationType } from '../types/registration'
import { Modal } from './Modal'

interface NewRegistrationModalProps {
  onClose: () => void
  onCreated: (registration: Registration) => void
}

type Field = 'participantName' | 'contactNumber' | 'email' | 'address' | 'carMakeModel' | 'plateNumber' | 'registrationType' | 'amountPaid'

const fees: Record<RegistrationType, number> = {
  Exhibitor: 1500,
  Competitor: 2500,
  VIP: 5000,
}

const serverFieldNames: Record<string, Field> = {
  ParticipantName: 'participantName',
  ContactNumber: 'contactNumber',
  Email: 'email',
  Address: 'address',
  CarMakeModel: 'carMakeModel',
  PlateNumber: 'plateNumber',
  RegistrationType: 'registrationType',
  AmountPaid: 'amountPaid',
}

const emptyForm = {
  participantName: '',
  contactNumber: '',
  email: '',
  address: '',
  carMakeModel: '',
  plateNumber: '',
  registrationType: 'Competitor' as RegistrationType,
  amountPaid: '0',
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100'

export function NewRegistrationModal({ onClose, onCreated }: NewRegistrationModalProps) {
  const [form, setForm] = useState(emptyForm)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Field, string>>>({})
  const [generalError, setGeneralError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fee = fees[form.registrationType]

  function update(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => ({ ...current, [name]: undefined }))
    setGeneralError('')
  }

  function validate(): Partial<Record<Field, string>> {
    const errors: Partial<Record<Field, string>> = {}
    const amount = Number(form.amountPaid)

    if (!form.participantName.trim()) errors.participantName = 'Participant name is required.'
    if (!/^09\d{9}$/.test(form.contactNumber.trim())) errors.contactNumber = 'Use the 09XXXXXXXXX format.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email address.'
    if (!form.address.trim()) errors.address = 'Address is required.'
    if (!form.carMakeModel.trim()) errors.carMakeModel = 'Car make and model is required.'
    if (!form.plateNumber.trim()) errors.plateNumber = 'Plate number is required.'
    if (Number.isNaN(amount) || amount < 0) errors.amountPaid = 'Amount paid must be 0 or more.'
    else if (amount > fee) errors.amountPaid = `Amount paid cannot be more than the fee (${fee.toLocaleString()}).`

    return errors
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    const payload: CreateRegistrationPayload = {
      participantName: form.participantName.trim(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      carMakeModel: form.carMakeModel.trim(),
      plateNumber: form.plateNumber.trim(),
      registrationType: form.registrationType,
      amountPaid: Number(form.amountPaid),
    }

    setSubmitting(true)
    setGeneralError('')

    try {
      const registration = await createRegistration(payload)
      onCreated(registration)
    } catch (caught) {
      if (caught instanceof ApiError && caught.problem.errors) {
        const mapped: Partial<Record<Field, string>> = {}

        Object.entries(caught.problem.errors).forEach(([key, messages]) => {
          const field = serverFieldNames[key]
          if (field) mapped[field] = messages[0]
        })

        setFieldErrors(mapped)
        setGeneralError('Please correct the highlighted fields.')
      } else {
        setGeneralError(caught instanceof Error ? caught.message : 'Cannot save this registration.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal title="New registration" subtitle="One participant, one car" onClose={onClose} wide>
      <form onSubmit={submit} noValidate className="space-y-5">
        {generalError && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {generalError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="participantName" className="mb-1.5 block text-sm font-medium text-slate-600">
              Participant name
            </label>
            <input id="participantName" name="participantName" value={form.participantName} onChange={update} placeholder="Juan Dela Cruz" className={inputClass} maxLength={150} />
            {fieldErrors.participantName && <p className="mt-1 text-xs text-red-600">{fieldErrors.participantName}</p>}
          </div>

          <div>
            <label htmlFor="contactNumber" className="mb-1.5 block text-sm font-medium text-slate-600">
              Contact number
            </label>
            <input id="contactNumber" name="contactNumber" value={form.contactNumber} onChange={update} placeholder="09171234567" className={inputClass} maxLength={11} />
            {fieldErrors.contactNumber && <p className="mt-1 text-xs text-red-600">{fieldErrors.contactNumber}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-600">
              Email
            </label>
            <input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="juan@example.com" className={inputClass} maxLength={200} />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-slate-600">
              Address
            </label>
            <input id="address" name="address" value={form.address} onChange={update} placeholder="123 Rizal St., Sorsogon City" className={inputClass} maxLength={300} />
            {fieldErrors.address && <p className="mt-1 text-xs text-red-600">{fieldErrors.address}</p>}
          </div>

          <div>
            <label htmlFor="carMakeModel" className="mb-1.5 block text-sm font-medium text-slate-600">
              Car make and model
            </label>
            <input id="carMakeModel" name="carMakeModel" value={form.carMakeModel} onChange={update} placeholder="Toyota Supra MK4" className={inputClass} maxLength={100} />
            {fieldErrors.carMakeModel && <p className="mt-1 text-xs text-red-600">{fieldErrors.carMakeModel}</p>}
          </div>

          <div>
            <label htmlFor="plateNumber" className="mb-1.5 block text-sm font-medium text-slate-600">
              Plate number
            </label>
            <input id="plateNumber" name="plateNumber" value={form.plateNumber} onChange={update} placeholder="ABC 1234" className={`${inputClass} uppercase`} maxLength={15} />
            {fieldErrors.plateNumber && <p className="mt-1 text-xs text-red-600">{fieldErrors.plateNumber}</p>}
          </div>

          <div>
            <label htmlFor="registrationType" className="mb-1.5 block text-sm font-medium text-slate-600">
              Registration type
            </label>
            <select id="registrationType" name="registrationType" value={form.registrationType} onChange={update} className={inputClass}>
              <option value="Exhibitor">Exhibitor</option>
              <option value="Competitor">Competitor</option>
              <option value="VIP">VIP</option>
            </select>
            <p className="mt-1 text-xs text-slate-400">Fee for this type: ₱{fee.toLocaleString()}.00</p>
          </div>

          <div>
            <label htmlFor="amountPaid" className="mb-1.5 block text-sm font-medium text-slate-600">
              Amount paid
            </label>
            <input id="amountPaid" name="amountPaid" type="number" min="0" max={fee} step="0.01" value={form.amountPaid} onChange={update} className={inputClass} />
            {fieldErrors.amountPaid && <p className="mt-1 text-xs text-red-600">{fieldErrors.amountPaid}</p>}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-cyan-600/30 transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Saving registration...' : 'Save registration'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
