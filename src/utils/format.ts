export function formatCurrency(value: number): string {
  return `₱${value.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-PH')
}

export function formatDate(value: string): string {
  const formatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila',
  }).format(new Date(value))

  return formatted.replace(/,(?=\s\d{1,2}:)/, '')
}
