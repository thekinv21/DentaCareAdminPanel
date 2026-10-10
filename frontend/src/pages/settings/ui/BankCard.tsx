'use client'

import { useTranslations } from 'next-intl'
import { useController, useFormContext } from 'react-hook-form'

import { PaymentMethodTile, usePaymentMethods } from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'
import { translateOptional } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Switch } from '@/shared/ui/switch'

import type { BANK_DETAILS } from '../model/Payments'
import type { TSettingsFormValues } from '../model/SettingsForm'
import { useBankSwitch } from '../model/useBankSwitch'

type TBankCardProps = { bank: (typeof BANK_DETAILS)[number] }

/**
 * One connected bank: on/off switch (turning off asks first) and its details
 */
export function BankCard({ bank }: TBankCardProps) {
	const t = useTranslations('Settings')
	const paymentMethods = usePaymentMethods()
	const switchBank = useBankSwitch()
	const { control } = useFormContext<TSettingsFormValues>()
	const { field } = useController({ control, name: `banks.${bank.id}` })
	const name = paymentMethods.byId(bank.id).name
	const isConnected = field.value

	return (
		<div
			className={cn(
				'flex flex-col gap-3 rounded-2xl border border-line p-3.5',
				isConnected ? 'bg-surface' : 'bg-raised',
			)}
		>
			<div className='flex items-center gap-3'>
				<PaymentMethodTile method={bank.id} size='lg' />
				<div className='min-w-0 grow'>
					<div className='flex items-center gap-2'>
						<span className='font-bold'>{name}</span>
						<Badge tone={isConnected ? 'ok' : 'neutral'}>
							{t(isConnected ? 'connected' : 'disabled')}
						</Badge>
					</div>
					<p className='text-[12.5px] leading-4.5 text-ink-muted'>
						{t(bank.description)}
					</p>
				</div>
				<Switch
					checked={isConnected}
					onChange={next => switchBank(name, next, field.onChange)}
					aria-label={`${t('acceptPayment')} ${name}`}
				/>
			</div>
			{isConnected && (
				<dl className='grid grid-cols-4 gap-x-4 gap-y-3.5 border-t border-dashed border-line pt-3 max-laptop:grid-cols-2'>
					{bank.details.map(detail => (
						<div key={detail.label}>
							<dt className='text-[12.5px] text-ink-muted'>
								{translateOptional(t, detail.label)}
							</dt>
							<dd className='font-mono text-[13px] font-semibold'>
								{translateOptional(t, detail.value)}
							</dd>
						</div>
					))}
				</dl>
			)}
		</div>
	)
}
