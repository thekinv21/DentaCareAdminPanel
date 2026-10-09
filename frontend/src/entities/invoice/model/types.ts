export type PaymentMethodId = 'visa' | 'mbank' | 'komp' | 'optima'

export interface PaymentMethod {
	id: PaymentMethodId
	name: string
	/**
	 * Short mark shown on the method tile
	 */
	code: string
	kind: string
	/**
	 * Tile classes (soft background + strong text)
	 */
	tileClass: string
	/**
	 * Solid fill class for bars
	 */
	barClass: string
}

export type InvoiceStatus = 'paid' | 'partial' | 'due' | 'overdue'

export interface Invoice {
	number: string
	patientId: string
	patientName: string
	service: string
	dueDate: string
	amount: number
	balance: number
	method: PaymentMethodId
	status: InvoiceStatus
}
