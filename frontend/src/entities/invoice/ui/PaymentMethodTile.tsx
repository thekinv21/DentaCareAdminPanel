'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'

import { PAYMENT_METHODS } from '../model/maps'
import type { PaymentMethodId } from '../model/types'

interface PaymentMethodTileProps {
	method: PaymentMethodId
	size?: 'sm' | 'md' | 'lg'
	className?: string
}

/**
 * Small bank mark: "MB", "VISA", "OPT", "КОМ"
 */
export function PaymentMethodTile({
	method,
	size = 'md',
	className,
}: PaymentMethodTileProps) {
	const { t } = useI18n()
	const { code, tileClass } = PAYMENT_METHODS[method]
	return (
		<span
			aria-hidden='true'
			className={cn(
				'inline-flex shrink-0 items-center justify-center font-display font-extrabold tracking-[0.02em]',
				size === 'sm' && 'h-[22px] w-[34px] rounded-md text-[9.5px]',
				size === 'md' && 'h-7 w-10 rounded-[7px] text-[11px]',
				size === 'lg' && 'size-10 rounded-xl text-[11px]',
				tileClass,
				className,
			)}
		>
			{t(code)}
		</span>
	)
}
