export type AmountCurrency = 'Original' | 'USD' | 'EUR'

export type PaymentLinkCreateInput = {
  amount: string,
  amountCurrency: AmountCurrency,
  description?: string,
  title?: string,
  metadata?: Record<string, unknown>,
  toCcy: string,
  receiveAddress: string,
  tag?: string
}