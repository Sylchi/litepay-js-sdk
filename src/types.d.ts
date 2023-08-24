export type AmountCurrency = 'Original' | 'USD' | 'EUR'

export interface PaymentLinkCreateInput {
  amount: string
  amountCurrency: AmountCurrency
  description?: string
  title?: string
  metadata?: Record<string, unknown>
  toCcy: string
  receiveAddress: string
  tag?: string
}

export interface PaymentLinkCreateOutput {
  friendlyId: string
  title: string
  description: string
  allowCustomPrice: boolean
  amount: string
  amountCurrency: string
  metadata?: Record<string, unknown>
  toCcy: string
  receiveToken: string
  receiveNetwork: string
  receiveAddress: string
  createdAt: string
  formatToken: string
  formatAmount: string
  tokenInfo: TokenInfo
}
export interface TokenInfo {
  code: string
  coin: string
  network: string
  priority: number
  name: string
  recv: number
  send: number
  tag: any
  color: string
}
