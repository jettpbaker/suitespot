function formatPrice(price: number) {
  const value = price / 100
  if (Number.isInteger(value)) {
    return value.toString()
  }
  return `${value.toFixed(2)}`
}
function formatPriority(priority: string) {
  return priority.charAt(0).toUpperCase() + priority.slice(1)
}

export { formatPrice, formatPriority }
