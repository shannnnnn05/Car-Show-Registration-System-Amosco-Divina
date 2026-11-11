import type {
  CreateRegistrationPayload,
  ProblemDetails,
  Registration,
  RegistrationPage,
  RegistrationQuery,
  RegistrationSummary,
} from '../types/registration'

const baseUrl = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5205').replace(/\/$/, '')

export class ApiError extends Error {
  status: number
  problem: ProblemDetails

  constructor(status: number, problem: ProblemDetails) {
    super(problem.detail ?? problem.title ?? 'The request could not be completed.')
    this.name = 'ApiError'
    this.status = status
    this.problem = problem
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
        ...init?.headers,
      },
    })
  } catch {
    throw new ApiError(0, {
      title: 'Network.Error',
      detail: `Cannot reach the API at ${baseUrl}. Check that the backend is running.`,
    })
  }

  if (!response.ok) {
    let problem: ProblemDetails

    try {
      problem = (await response.json()) as ProblemDetails
    } catch {
      problem = { title: 'Request.Error', detail: `The API returned ${response.status}.` }
    }

    throw new ApiError(response.status, problem)
  }

  return (await response.json()) as T
}

export function getRegistrations(query: RegistrationQuery, signal?: AbortSignal): Promise<RegistrationPage> {
  const parameters = new URLSearchParams({
    page: String(query.page),
    pageSize: String(query.pageSize),
  })

  if (query.participantName?.trim()) {
    parameters.set('participantName', query.participantName.trim())
  }

  if (query.type) {
    parameters.set('type', query.type)
  }

  if (query.status) {
    parameters.set('status', query.status)
  }

  return request<RegistrationPage>(`/api/registrations?${parameters.toString()}`, { signal })
}

export function getSummary(signal?: AbortSignal): Promise<RegistrationSummary> {
  return request<RegistrationSummary>('/api/registrations/summary', { signal })
}

export function getRegistrationById(id: string, signal?: AbortSignal): Promise<Registration> {
  return request<Registration>(`/api/registrations/${id}`, { signal })
}

export function createRegistration(payload: CreateRegistrationPayload): Promise<Registration> {
  return request<Registration>('/api/registrations', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
