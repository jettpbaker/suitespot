function formatPrice(price: number) {
  return price / 100
}
function formatPriority(priority: string) {
  return priority.charAt(0).toUpperCase() + priority.slice(1)
}

export { formatPrice, formatPriority }
