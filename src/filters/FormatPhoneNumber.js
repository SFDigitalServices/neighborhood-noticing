import { parseNumber, formatNumber } from 'libphonenumber-js'

export default function (number) {
  if (number == null) {
    return ''
  }

  const parsed = parseNumber(number, 'US')
  if (parsed === {}) { // couldn't parse, use original
    return number
  }
  return formatNumber(parsed, 'National')
}
