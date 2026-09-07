export function formatAmount(amount: number) {
  return new Intl.NumberFormat('uk-UA').format(amount) + ' ₴';
}
