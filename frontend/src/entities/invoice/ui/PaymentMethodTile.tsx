'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'

import { PAYMENT_METHODS } from '../model/Maps'
import type { PaymentMethodId } from '../model/Types'

type TPaymentMethodTileProps = {
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
}: TPaymentMethodTileProps) {
	const t = useTranslations('Invoice')
	return (
		<span
			aria-hidden='true'
			className={cn(
				'inline-flex shrink-0 items-center justify-center font-display font-extrabold tracking-[0.02em]',
				size === 'sm' && 'h-5.5 w-8.5 rounded-md text-[9.5px]',
				size === 'md' && 'h-7 w-10 rounded-[7px] text-[11px]',
				size === 'lg' && 'size-10 rounded-xl text-[11px]',
				PAYMENT_METHODS[method].tileClass,
				className,
			)}
		>
			{t(`methodCode.${method}`)}
		</span>
	)
}
