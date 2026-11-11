import type { RegistrationStatus, RegistrationType } from '../types/registration'
import { SearchIcon } from './Icons'

interface RegistrationFiltersProps {
  search: string
  type: RegistrationType | ''
  status: RegistrationStatus | ''
  hasFilters: boolean
  onSearchChange: (value: string) => void
  onTypeChange: (value: RegistrationType | '') => void
  onStatusChange: (value: RegistrationStatus | '') => void
  onClear: () => void
}

export function RegistrationFilters({
  search,
  type,
  status,
  hasFilters,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onClear,
}: RegistrationFiltersProps) {
  return (
    <section aria-label="Registration filters" className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm shadow-cyan-900/5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
        <div>
          <label htmlFor="search" className="mb-1.5 block text-sm font-medium text-slate-600">
            Search by participant name
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              id="search"
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search participant name..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </div>
        </div>

        <div>
          <label htmlFor="type" className="mb-1.5 block text-sm font-medium text-slate-600">
            Registration type
          </label>
          <select
            id="type"
            value={type}
            onChange={(event) => onTypeChange(event.target.value as RegistrationType | '')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          >
            <option value="">All types</option>
            <option value="Exhibitor">Exhibitor</option>
            <option value="Competitor">Competitor</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-slate-600">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value as RegistrationStatus | '')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          >
            <option value="">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="CheckedIn">Checked In</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasFilters}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear filters
        </button>
      </div>
    </section>
  )
}
