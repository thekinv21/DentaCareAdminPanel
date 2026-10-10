'use client'

import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AuthField } from '@/widgets/auth-panel'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { Button } from '@/shared/ui/button'
import { inputLgClass } from '@/shared/ui/field'
import { PhoneInput } from '@/shared/ui/phone-input'
import { Select } from '@/shared/ui/select'

import { CITIES, type TRegisterInput } from '../model/RegisterSchema'

type TClinicStepProps = { onNext: () => void }

export function ClinicStep({ onNext }: TClinicStepProps) {
	const t = useTranslations('Register')

	const inputProps = useFieldProps<TRegisterInput>()

	return (
		<div className='flex animate-fade flex-col gap-4'>
			<AuthField name='clinicName' label={t('clinicName')}>
				<input
					id='clinicName'
					className={inputLgClass}
					placeholder={t('clinicNamePlaceholder')}
					{...inputProps('clinicName')}
				/>
			</AuthField>
			<div className='grid grid-cols-[1fr_140px] gap-3'>
				<AuthField name='city' label={t('city')}>
					<Select id='city' size='lg' {...inputProps('city')}>
						{CITIES.map(city => (
							<option key={city} value={city}>
								{t(city)}
							</option>
						))}
					</Select>
				</AuthField>
				<AuthField name='chairs' label={t('chairs')}>
					<input
						id='chairs'
						type='number'
						min={1}
						className={cn(inputLgClass, 'font-mono')}
						{...inputProps('chairs')}
					/>
				</AuthField>
			</div>
			<AuthField name='clinicPhone' label={t('clinicPhone')}>
				<PhoneInput
					id='clinicPhone'
					placeholder='312 90 41 41'
					{...inputProps('clinicPhone')}
				/>
			</AuthField>
			<Button variant='primary' size='lg' block onClick={onNext}>
				{t('continue')}
				<ChevronRight size={18} aria-hidden='true' />
			</Button>
		</div>
	)
}
