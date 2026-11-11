export type RegistrationType = 'Exhibitor' | 'Competitor' | 'VIP'
export type RegistrationStatus = 'Pending' | 'Confirmed' | 'CheckedIn' | 'Cancelled'
export type PaymentStatus = 'Unpaid' | 'Partial' | 'Paid'

export interface Registration {
  id: string
  registrationNumber: string
  registrationDate: string
  participantName: string
  contactNumber: string
  email: string
  address: string
  carMakeModel: string
  plateNumber: string
  registrationType: RegistrationType
  status: RegistrationStatus
  registrationFee: number
  amountPaid: number
  paymentStatus: PaymentStatus
}

export interface RegistrationPage {
  items: Registration[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface RegistrationSummary {
  totalRegistrations: number
  confirmed: number
  checkedIn: number
  pending: number
  cancelled: number
  totalFees: number
  totalPayments: number
  uncollectedPayments: number
}

export interface RegistrationQuery {
  participantName?: string
  type?: RegistrationType | ''
  status?: RegistrationStatus | ''
  page: number
  pageSize: number
}

export interface CreateRegistrationPayload {
  participantName: string
  contactNumber: string
  email: string
  address: string
  carMakeModel: string
  plateNumber: string
  registrationType: RegistrationType
  amountPaid: number
}

export interface ProblemDetails {
  title?: string
  detail?: string
  status?: number
  errors?: Record<string, string[]>
}
