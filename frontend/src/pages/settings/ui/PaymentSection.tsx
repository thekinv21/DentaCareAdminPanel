'use client'

import { useTranslations } from 'next-intl'

import { PaymentMethodTile, usePaymentMethods } from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'
import { translateOptional } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Switch } from '@/shared/ui/switch'
import { ToggleRow } from '@/shared/ui/toggle-row'

import { BANK_DETAILS, PAYMENT_OPTIONS } from '../model/Payments'
import type { TogglesProps } from '../model/useSettings'

export function PaymentSection({ toggles, flip }: TogglesProps) {
	const t = useTranslations('Settings')
	const methods = usePaymentMethods()
	return (
		<div className='flex animate-fade flex-col gap-3 pb-2'>
			{BANK_DETAILS.map(bank => {
				const name = methods.byId(bank.id).name
				const on = toggles[bank.id]
				return (
					<div
						key={bank.id}
						className={cn(
							'flex flex-col gap-3 rounded-2xl border border-line p-3.5',
							on ? 'bg-surface' : 'bg-raised',
						)}
					>
						<div className='flex items-center gap-3'>
							<PaymentMethodTile method={bank.id} size='lg' />
							<div className='min-w-0 grow'>
								<div className='flex items-center gap-2'>
									<span className='font-bold'>{name}</span>
									<Badge tone={on ? 'ok' : 'neutral'}>
										{t(on ? 'connected' : 'disabled')}
									</Badge>
								</div>
								<p className='text-[12.5px] leading-4.5 text-ink-muted'>
									{t(bank.description)}
								</p>
							</div>
							<Switch
								checked={on}
								onChange={() => flip(bank.id)}
								aria-label={`${t('acceptPayment')} ${name}`}
							/>
						</div>
						{on && (
							<dl className='grid grid-cols-4 gap-x-4 gap-y-3.5 border-t border-dashed border-line pt-3 max-[1100px]:grid-cols-2'>
								{bank.meta.map(([key, value]) => (
									<div key={key}>
										<dt className='text-[12.5px] text-ink-muted'>
											{translateOptional(t, key)}
										</dt>
										<dd className='font-mono text-[13px] font-semibold'>
											{translateOptional(t, value)}
										</dd>
									</div>
								))}
							</dl>
						)}
					</div>
				)
			})}
			<div className='rounded-2xl border border-line px-3.5 py-1'>
				{PAYMENT_OPTIONS.map(option => (
					<ToggleRow
						key={option.id}
						label={t(option.label)}
						hint={t(option.hint)}
						checked={toggles[option.id]}
						onChange={() => flip(option.id)}
					/>
				))}
			</div>
		</div>
	)
}
