'use client'

import { Smartphone } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'

import type { TPaymentDetails } from '../model/usePaymentDetails'

type TPaymentInstructionsProps = { details: TPaymentDetails }

/**
 * Card terminal hint or the bank QR code for the chosen method
 */
export function PaymentInstructions({ details }: TPaymentInstructionsProps) {
	const t = useTranslations('Billing')

	return (
		<div className='flex animate-fade items-center gap-3.5 rounded-[14px] border border-line bg-raised p-3.5'>
			{details.isCard ? (
				<span className='flex size-26 shrink-0 items-center justify-center rounded-[14px] border border-line bg-surface text-info'>
					<Smartphone size={44} strokeWidth={1.4} aria-hidden='true' />
				</span>
			) : (
				<svg
					width='104'
					height='104'
					viewBox='0 0 25 25'
					role='img'
					aria-label={t('paymentQrCode')}
					className='theme-light shrink-0 rounded-lg bg-surface p-1 text-ink'
				>
					<path d={details.qrPath} fill='currentColor' />
				</svg>
			)}
			<div className='flex min-w-0 flex-col gap-1'>
				<span className='font-semibold'>{details.hint.title}</span>
				<span className='text-[12.5px] leading-4.5 text-ink-muted'>
					{details.hint.text}
				</span>
				<Badge tone='info' className='mt-1 self-start'>
					{details.hint.status}
				</Badge>
			</div>
		</div>
	)
}
