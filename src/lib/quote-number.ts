import { nanoid } from 'nanoid'

export function generateQuoteNumber(): string {
  return `QT-${nanoid(16)}`
}
