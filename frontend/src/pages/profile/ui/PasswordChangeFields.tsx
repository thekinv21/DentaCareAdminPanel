'use client'

import { useTranslations } from 'next-intl'

import { useFieldProps } from '@/shared/lib/form'
import { FormField, formGrid3, inputClass } from '@/shared/ui/field'

import type { TProfileFormValues } from '../model/ProfileFormSchema'

type TPasswordChangeFieldsProps = { hint: string }

/**
 * Current, new and repeated password; left empty when not changing it
 */
export function PasswordChangeFields({ hint }: TPasswordChangeFieldsProps) {
	const t = useTranslations('Profile')
	const inputProps = useFieldProps<TProfileFormValues>()

	return (
		<div>
			<p className='mb-2.5 font-display text-[15px] leading-6 font-bold'>
				{t('changePassword')}
			</p>
			<div className={formGrid3}>
				<FormField name='password.current' label={t('currentPassword')}>
					<input
						className={inputClass}
						type='password'
						placeholder='••••••••••'
						autoComplete='current-password'
						{...inputProps('password.current')}
					/>
				</FormField>
				<FormField name='password.next' label={t('newPassword')}>
					<input
						className={inputClass}
						type='password'
						placeholder={t('atLeast10Characters')}
						autoComplete='new-password'
						{...inputProps('password.next')}
					/>
				</FormField>
				<FormField name='password.repeat' label={t('repeatPassword')}>
					<input
						className={inputClass}
						type='password'
						placeholder={t('repeatPlaceholder')}
						autoComplete='new-password'
						{...inputProps('password.repeat')}
					/>
				</FormField>
			</div>
			<p className='mt-2 text-[12.5px] leading-4.5 text-ink-muted'>{hint}</p>
		</div>
	)
}
