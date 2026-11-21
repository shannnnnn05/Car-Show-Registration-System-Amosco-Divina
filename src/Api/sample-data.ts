import type {
  CreateRegistrationPayload,
  Registration,
  RegistrationPage,
  RegistrationQuery,
  RegistrationStatus,
  RegistrationSummary,
  RegistrationType,
} from '../types/registration'
import { ApiError } from './registrationsApi'

const fees: Record<RegistrationType, number> = {
  Exhibitor: 1500,
  Competitor: 2500,
  VIP: 5000,
}

type Seed = [
  string,
  string,
  string,
  string,
  string,
  string,
  RegistrationType,
  RegistrationStatus,
  number,
  number,
]

const seeds: Seed[] = [
  ['Juan Dela Cruz', '09171234567', 'juan.delacruz@example.com', '123 Rizal St., Naga City', 'Toyota Supra MK4', 'ABC 1234', 'Competitor', 'Confirmed', 1000, 0],
  ['Maria Santos', '09182234567', 'maria.santos@example.com', '45 Mabini St., Sorsogon City', 'Honda Civic Type R', 'XYZ 5678', 'Exhibitor', 'Pending', 0, 2],
  ['Ricardo Reyes', '09193234567', 'ricardo.reyes@example.com', '78 Bonifacio Ave., Legazpi City', 'Nissan GT-R R35', 'VIP 0001', 'VIP', 'CheckedIn', 5000, 5],
  ['Ana Villanueva', '09204234567', 'ana.villanueva@example.com', '12 Luna St., Bulan, Sorsogon', 'Mazda RX-7 FD', 'DEF 2345', 'Competitor', 'Cancelled', 0, 7],
  ['Carlos Mendoza', '09215234567', 'carlos.mendoza@example.com', '89 Quezon Blvd., Sorsogon City', 'Ford Mustang GT', 'GHI 6789', 'Exhibitor', 'Confirmed', 1500, 9],
  ['Liza Fernandez', '09226234567', 'liza.fernandez@example.com', '34 Del Pilar St., Gubat, Sorsogon', 'Porsche 911 Carrera', 'JKL 0123', 'VIP', 'Confirmed', 2500, 12],
  ['Mark Aquino', '09237234567', 'mark.aquino@example.com', '67 Burgos St., Casiguran, Sorsogon', 'Subaru WRX STI', 'MNO 4567', 'Competitor', 'Pending', 0, 14],
  ['Grace Lim', '09248234567', 'grace.lim@example.com', '90 Magsaysay Dr., Sorsogon City', 'BMW M3 Competition', 'PQR 8901', 'Exhibitor', 'CheckedIn', 1500, 17],
  ['Paolo Garcia', '09259234567', 'paolo.garcia@example.com', '23 Roxas St., Irosin, Sorsogon', 'Chevrolet Camaro SS', 'STU 2345', 'VIP', 'Pending', 0, 19],
  ['Sofia Torres', '09260234567', 'sofia.torres@example.com', '56 Aguinaldo St., Matnog, Sorsogon', 'Honda NSX', 'VWX 6789', 'Competitor', 'Confirmed', 2500, 22],
  ['Miguel Ramos', '09271234567', 'miguel.ramos@example.com', '18 Katipunan St., Barcelona, Sorsogon', 'Mitsubishi Lancer Evo X', 'YZA 0123', 'Exhibitor', 'Pending', 500, 25],
  ['Camille Cruz', '09282234567', 'camille.cruz@example.com', '41 Rizal Ave., Prieto Diaz, Sorsogon', 'Toyota GR86', 'BCD 4567', 'Competitor', 'CheckedIn', 2500, 28],
  ['Rafael Bautista', '09293234567', 'rafael.bautista@example.com', '72 Zamora St., Pilar, Sorsogon', 'Audi RS5', 'EFG 8901', 'VIP', 'Cancelled', 1000, 31],
  ['Isabel Navarro', '09304234567', 'isabel.navarro@example.com', '15 Mabini Ext., Sorsogon City', 'Hyundai Ioniq 5 N', 'HIJ 2345', 'Exhibitor', 'Confirmed', 1500, 34],
  ['Daniel Pascual', '09315234567', 'daniel.pascual@example.com', '38 Bonifacio St., Donsol, Sorsogon', 'Nissan Silvia S15', 'KLM 6789', 'Competitor', 'Pending', 1000, 37],
  ['Patricia Ong', '09326234567', 'patricia.ong@example.com', '64 Luna Ave., Magallanes, Sorsogon', 'Lexus LC 500', 'NOP 0123', 'VIP', 'CheckedIn', 5000, 40],
  ['Jose Ramirez', '09337234567', 'jose.ramirez@example.com', '87 Del Rosario St., Bulusan, Sorsogon', 'Volkswagen Golf GTI', 'QRS 4567', 'Exhibitor', 'Confirmed', 750, 43],
  ['Angela Salazar', '09348234567', 'angela.salazar@example.com', '29 Zamora Ave., Sorsogon City', 'Toyota GR Yaris', 'TUV 8901', 'Competitor', 'Confirmed', 2500, 46],
  ['Ferdinand Cruz', '09359234567', 'ferdinand.cruz@example.com', '53 Burgos Ave., Juban, Sorsogon', 'Mercedes-AMG C63', 'WXY 2345', 'VIP', 'Pending', 0, 49],
  ['Bianca Flores', '09360234567', 'bianca.flores@example.com', '76 Rizal St., Castilla, Sorsogon', 'Mazda MX-5 Miata', 'ZAB 6789', 'Exhibitor', 'Cancelled', 0, 52],
  ['Enrique Mercado', '09371234567', 'enrique.mercado@example.com', '14 Aguirre St., Sorsogon City', 'Subaru BRZ', 'CDE 0123', 'Competitor', 'CheckedIn', 1500, 55],
  ['Teresa Domingo', '09382234567', 'teresa.domingo@example.com', '47 Magallanes St., Bacon, Sorsogon', 'Porsche Taycan Turbo', 'FGH 4567', 'VIP', 'Confirmed', 5000, 58],
  ['Alfonso Padilla', '09393234567', 'alfonso.padilla@example.com', '82 Mabini St., Sta. Magdalena, Sorsogon', 'Ford Focus RS', 'IJK 8901', 'Exhibitor', 'Pending', 0, 61],
  ['Natalia Robles', '09404234567', 'natalia.robles@example.com', '25 Luna St., Sorsogon City', 'Honda Integra Type R', 'LMN 2345', 'Competitor', 'Cancelled', 500, 64],
  ['Gabriel Soriano', '09415234567', 'gabriel.soriano@example.com', '59 Bonifacio St., Pilar, Sorsogon', 'Audi TT RS', 'OPQ 6789', 'VIP', 'CheckedIn', 2500, 67],
]

function paymentStatus(registration: Registration) {
  if (registration.amountPaid <= 0) return 'Unpaid' as const
  if (registration.amountPaid < registration.registrationFee) return 'Partial' as const
  return 'Paid' as const
}

const start = Date.UTC(2026, 9, 20, 8, 30, 0)

const registrations: Registration[] = seeds.map((seed, index) => {
  const [
    participantName,
    contactNumber,
    email,
    address,
    carMakeModel,
    plateNumber,
    registrationType,
    status,
    amountPaid,
    hourOffset,
  ] = seed

  const registration: Registration = {
    id: `00000000-0000-0000-0000-${String(index + 1).padStart(12, '0')}`,
    registrationNumber: `CS27-${String(index + 1).padStart(4, '0')}`,
    registrationDate: new Date(start + hourOffset * 3600000).toISOString(),
    participantName,
    contactNumber,
    email,
    address,
    carMakeModel,
    plateNumber,
    registrationType,
    status,
    registrationFee: fees[registrationType],
    amountPaid,
    paymentStatus: 'Unpaid',
  }

  return { ...registration, paymentStatus: paymentStatus(registration) }
})

function delay(milliseconds = 350) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export async function getRegistrations(query: RegistrationQuery): Promise<RegistrationPage> {
  await delay()

  let rows = [...registrations]

  if (query.participantName?.trim()) {
    const name = query.participantName.trim().toLowerCase()
    rows = rows.filter((registration) => registration.participantName.toLowerCase().includes(name))
  }

  if (query.type) {
    rows = rows.filter((registration) => registration.registrationType === query.type)
  }

  if (query.status) {
    rows = rows.filter((registration) => registration.status === query.status)
  }

  rows.sort((a, b) => {
    const difference = new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
    return difference !== 0 ? difference : b.registrationNumber.localeCompare(a.registrationNumber)
  })

  const totalCount = rows.length
  const totalPages = totalCount === 0 ? 0 : Math.ceil(totalCount / query.pageSize)
  const startIndex = (query.page - 1) * query.pageSize

  return {
    items: rows.slice(startIndex, startIndex + query.pageSize),
    page: query.page,
    pageSize: query.pageSize,
    totalCount,
    totalPages,
  }
}

export async function getSummary(): Promise<RegistrationSummary> {
  await delay(250)

  const active = registrations.filter((registration) => registration.status !== 'Cancelled')
  const totalFees = active.reduce((total, registration) => total + registration.registrationFee, 0)
  const totalPayments = active.reduce((total, registration) => total + registration.amountPaid, 0)

  return {
    totalRegistrations: registrations.length,
    confirmed: registrations.filter((registration) => registration.status === 'Confirmed').length,
    checkedIn: registrations.filter((registration) => registration.status === 'CheckedIn').length,
    pending: registrations.filter((registration) => registration.status === 'Pending').length,
    cancelled: registrations.filter((registration) => registration.status === 'Cancelled').length,
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  }
}

export async function getRegistrationById(id: string): Promise<Registration> {
  await delay(200)
  const registration = registrations.find((row) => row.id === id)

  if (!registration) {
    throw new ApiError(404, { title: 'Registration.NotFound', detail: 'Registration was not found.' })
  }

  return registration
}

function nextNumber() {
  const highest = registrations.reduce((maximum, registration) => {
    const value = Number(registration.registrationNumber.replace('CS27-', ''))
    return Number.isNaN(value) ? maximum : Math.max(maximum, value)
  }, 0)

  return `CS27-${String(highest + 1).padStart(4, '0')}`
}

export async function createRegistration(payload: CreateRegistrationPayload): Promise<Registration> {
  await delay(400)

  const duplicate = registrations.some(
    (registration) => registration.plateNumber.toLowerCase() === payload.plateNumber.trim().toLowerCase(),
  )

  if (duplicate) {
    throw new ApiError(409, {
      title: 'Registration.Conflict',
      detail: `A registration with plate number '${payload.plateNumber.trim()}' already exists.`,
    })
  }

  const registration: Registration = {
    id: crypto.randomUUID(),
    registrationNumber: nextNumber(),
    registrationDate: new Date().toISOString(),
    participantName: payload.participantName.trim(),
    contactNumber: payload.contactNumber.trim(),
    email: payload.email.trim(),
    address: payload.address.trim(),
    carMakeModel: payload.carMakeModel.trim(),
    plateNumber: payload.plateNumber.trim(),
    registrationType: payload.registrationType,
    status: 'Pending',
    registrationFee: fees[payload.registrationType],
    amountPaid: payload.amountPaid,
    paymentStatus: 'Unpaid',
  }

  registration.paymentStatus = paymentStatus(registration)
  registrations.push(registration)

  return registration
}
