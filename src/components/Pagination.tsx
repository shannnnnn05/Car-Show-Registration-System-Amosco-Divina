import { ChevronLeftIcon, ChevronRightIcon } from './Icons'

interface PaginationProps {
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  loading: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

function pageNumbers(page: number, totalPages: number): number[] {
  const size = Math.min(5, totalPages)
  let start = Math.max(1, page - 2)
  const end = Math.min(totalPages, start + size - 1)
  start = Math.max(1, end - size + 1)

  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

export function Pagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  loading,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const first = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const last = Math.min(page * pageSize, totalCount)

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span>
          {loading && totalCount === 0 ? (
            'Loading registrations…'
          ) : (
            <>
              Showing <span className="font-semibold text-slate-700">{first}</span>–<span className="font-semibold text-slate-700">{last}</span> of{' '}
              <span className="font-semibold text-slate-700">{totalCount}</span>
            </>
          )}
        </span>
        <label className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-slate-400">Rows</span>
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            disabled={loading}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 disabled:opacity-50"
            aria-label="Rows per page"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <nav className="flex items-center gap-1.5" aria-label="Pagination">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={loading || page <= 1}
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeftIcon />
          Prev
        </button>

        {pageNumbers(page, totalPages).map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => onPageChange(number)}
            disabled={loading}
            aria-current={number === page ? 'page' : undefined}
            className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:cursor-not-allowed ${
              number === page
                ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                : 'border border-slate-200 text-slate-600 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700'
            }`}
          >
            {number}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={loading || page >= totalPages}
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRightIcon />
        </button>
      </nav>
    </div>
  )
}
