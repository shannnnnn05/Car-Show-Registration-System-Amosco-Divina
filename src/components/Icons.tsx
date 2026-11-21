interface IconProps {
  className?: string
}

export function TicketIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 0 0 4v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a2 2 0 0 0 0-4V8Z" strokeLinejoin="round" />
      <path d="M12 7v2M12 11v2M12 15v2" strokeLinecap="round" />
    </svg>
  )
}

export function WalletIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 7a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v2" strokeLinecap="round" />
      <path d="M4 7v10a2 2 0 0 0 2 2h13a1 1 0 0 0 1-1v-2" strokeLinejoin="round" />
      <path d="M20 9h-4a3 3 0 0 0 0 6h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Z" strokeLinejoin="round" />
    </svg>
  )
}

export function AlertIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function CheckIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12 2.4 2.4 4.6-4.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DoorIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 20V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v15" strokeLinejoin="round" />
      <path d="M4 20h16" strokeLinecap="round" />
      <circle cx="13" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ChartIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 19V5M4 19h16" strokeLinecap="round" />
      <path d="m8 15 3-4 3 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SearchIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 3.5 3.5" strokeLinecap="round" />
    </svg>
  )
}

export function PlusIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronLeftIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronRightIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function RefreshIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 13.5-5.8L20 8.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.5 5.8L4 15.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20v-4.5h4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
