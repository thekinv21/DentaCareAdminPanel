'use client'

import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AuthField } from '@/widgets/auth-panel'

import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button'
import { inputLgClass } from '@/shared/ui/field'
import { PhoneInput } from '@/shared/ui/phone-input'

import type { RegisterFormModel } from '../model/useRegisterForm'

export function ClinicStep({ form }: { form: RegisterFormModel }) {
	const t = useTranslations('Register')
	return (
		<div className='flex animate-fade flex-col gap-4'>
			<AuthField
				id='clinicName'
				label={t('clinicName')}
				error={form.errorOf('clinicName')}
			>
				<input
					id='clinicName'
					className={inputLgClass}
					placeholder={t('eGDentaAla')}
					{...form.fieldProps('clinicName')}
				/>
			</AuthField>
			<div className='grid grid-cols-[1fr_140px] gap-3'>
				<AuthField id='city' label={t('city')}>
					<select
						id='city'
						className={inputLgClass}
						{...form.fieldProps('city')}
					>
						{form.cities.map(city => (
							<option key={city.value} value={city.value}>
								{city.label}
							</option>
						))}
					</select>
				</AuthField>
				<AuthField
					id='chairs'
					label={t('chairs')}
					error={form.errorOf('chairs')}
				>
					<input
						id='chairs'
						type='number'
						min={1}
						className={cn(inputLgClass, 'font-mono')}
						{...form.fieldProps('chairs')}
					/>
				</AuthField>
			</div>
			<AuthField
				id='clinicPhone'
				label={t('clinicPhone')}
				error={form.errorOf('clinicPhone')}
			>
				<PhoneInput
					id='clinicPhone'
					placeholder='312 90 41 41'
					{...form.fieldProps('clinicPhone')}
				/>
			</AuthField>
			<Button variant='primary' size='lg' block onClick={form.next}>
				{t('continue')}
				<ChevronRight size={18} aria-hidden='true' />
			</Button>
		</div>
	)
}
