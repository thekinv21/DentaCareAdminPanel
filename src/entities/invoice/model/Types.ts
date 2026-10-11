export type TPaymentMethodId = 'visa' | 'mbank' | 'komp' | 'optima'

export type TPaymentMethod = {
	id: TPaymentMethodId
	/**
	 * Message key in the Invoice namespace
	 */
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

export type TInvoiceStatus = 'paid' | 'partial' | 'due' | 'overdue'

export type TInvoice = {
	number: string
	patientId: string
	patientName: string
	/**
	 * Service message key of the Invoice namespace
	 */
	service: string
	tooth?: string
	/**
	 * "dd.mm" of the current year
	 */
	dueDate: string
	amount: number
	balance: number
	method: TPaymentMethodId
	status: TInvoiceStatus
}
