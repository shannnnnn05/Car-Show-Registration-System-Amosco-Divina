import { useCallback, useEffect, useState } from 'react'
import { ApiError, getRegistrations, getSummary } from '../api'
import { KpiCards } from '../components/KpiCards'
import { CloseIcon, PlusIcon, RefreshIcon } from '../components/Icons'
import { NewRegistrationModal } from '../components/NewRegistrationModal'
import { Pagination } from '../components/Pagination'
import { RegistrationDetailsModal } from '../components/RegistrationDetailsModal'
import { RegistrationFilters } from '../components/RegistrationFilters'
import { RegistrationTable } from '../components/RegistrationTable'
import { useDebounce } from '../hooks/useDebounce'
import type {
  Registration,
  RegistrationPage,
  RegistrationStatus,
  RegistrationSummary,
  RegistrationType,
} from '../types/registration'

export function RegistrationsPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState<RegistrationType | ''>('')
  const [status, setStatus] = useState<RegistrationStatus | ''>('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = useState<RegistrationPage | null>(null)
  const [summary, setSummary] = useState<RegistrationSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showNewRegistration, setShowNewRegistration] = useState(false)
  const [notice, setNotice] = useState('')

  const debouncedSearch = useDebounce(search, 400)

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setError('')

    getRegistrations(
      {
        participantName: debouncedSearch,
        type,
        status,
        page,
        pageSize,
      },
      controller.signal,
    )
      .then((result) => {
        setData(result)

        const typedName = debouncedSearch.trim()

        if (result.totalCount === 0 && typedName !== '' && type === '' && status === '') {
          window.alert(`Di po mahanap si ${typedName} sa lista.`)
          setSearch('')
          setPage(1)
        }
      })
      .catch((caught: unknown) => {
        if (controller.signal.aborted) return
        setData(null)
        setError(
          caught instanceof ApiError
            ? caught.message
            : 'Cannot reach the API. Check that the backend is running and try again.',
        )
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, type, status, page, pageSize, refreshKey])

  useEffect(() => {
    const controller = new AbortController()

    setSummaryLoading(true)

    getSummary(controller.signal)
      .then((result) => setSummary(result))
      .catch(() => {
        if (!controller.signal.aborted) setSummary(null)
      })
      .finally(() => {
        if (!controller.signal.aborted) setSummaryLoading(false)
      })

    return () => controller.abort()
  }, [refreshKey])

  const clearFilters = useCallback(() => {
    setSearch('')
    setType('')
    setStatus('')
    setPage(1)
  }, [])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleTypeChange = (value: RegistrationType | '') => {
    setType(value)
    setPage(1)
  }

  const handleStatusChange = (value: RegistrationStatus | '') => {
    setStatus(value)
    setPage(1)
  }

  const handlePageSizeChange = (value: number) => {
    setPageSize(value)
    setPage(1)
  }

  const refresh = () => setRefreshKey((current) => current + 1)

  const handleCreated = (registration: Registration) => {
    setShowNewRegistration(false)
    setSelectedId(null)
    setNotice(`Registration ${registration.registrationNumber} saved.`)
    setPageSize((current) => current)
    setRefreshKey((current) => current + 1)
  }

  const closeDetails = useCallback(() => setSelectedId(null), [])
  const closeNewRegistration = useCallback(() => setShowNewRegistration(false), [])

  const hasFilters = search !== '' || type !== '' || status !== ''

  return (
    <div className="min-h-screen pb-12">
      <header className="border-b border-cyan-100/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-sm font-black text-white shadow-lg shadow-cyan-500/30">
              CS
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">Divina CarShow</p>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Car Show Registration by Adams Divina</h1>
              <p className="text-sm text-slate-500">Sorsogon City Coliseum · Event staff console</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={refresh}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            >
              <RefreshIcon />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => setShowNewRegistration(true)}
              className="flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-cyan-600/30 transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              <PlusIcon />
              New registration
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-6 max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        {notice && (
          <div className="flex items-center justify-between gap-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status">
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice('')}
              className="rounded-md p-1 transition hover:bg-emerald-100"
              aria-label="Dismiss message"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        <KpiCards summary={summary} loading={summaryLoading} />

        <RegistrationFilters
          search={search}
          type={type}
          status={status}
          hasFilters={hasFilters}
          onSearchChange={handleSearchChange}
          onTypeChange={handleTypeChange}
          onStatusChange={handleStatusChange}
          onClear={clearFilters}
        />

        <section className="overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-sm shadow-cyan-900/5" aria-label="Registrations">
          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Registrations</h2>
              <p className="text-xs text-slate-500">
                {error
                  ? 'Registration list is unavailable'
                  : loading
                    ? 'Loading registrations…'
                    : `${data?.totalCount ?? 0} registration${data?.totalCount === 1 ? '' : 's'} found`}
              </p>
            </div>
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="self-start text-xs font-semibold text-cyan-700 underline-offset-2 hover:underline">
                Reset active filters
              </button>
            )}
          </div>

          {error ? (
            <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v5" strokeLinecap="round" />
                  <circle cx="12" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-slate-800">Cannot reach the API</p>
                <p className="mt-1 max-w-md text-sm text-slate-500">{error}</p>
              </div>
              <button
                type="button"
                onClick={refresh}
                className="rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                Try again
              </button>
            </div>
          ) : !loading && data && data.items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
                  <circle cx="11" cy="11" r="6" />
                  <path d="m16 16 3.5 3.5" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-slate-800">No registrations match your filters</p>
                <p className="mt-1 text-sm text-slate-500">
                  Try a different name, type or status, or clear the filters to see every registration.
                </p>
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl border border-cyan-200 bg-white px-4 py-2.5 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-200"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <RegistrationTable items={data?.items ?? []} loading={loading} onView={setSelectedId} />
              <Pagination
                page={data?.page ?? page}
                pageSize={pageSize}
                totalCount={data?.totalCount ?? 0}
                totalPages={data?.totalPages ?? 0}
                loading={loading}
                onPageChange={setPage}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          )}
        </section>

        <footer className="flex flex-col gap-1 pt-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Car Show 2027 · Divina CarShow · Sorsogon City Coliseum</p>
          <p>Backend API and React dashboard</p>
        </footer>
      </main>

      {selectedId && <RegistrationDetailsModal id={selectedId} onClose={closeDetails} />}
      {showNewRegistration && <NewRegistrationModal onClose={closeNewRegistration} onCreated={handleCreated} />}
    </div>
  )
}
