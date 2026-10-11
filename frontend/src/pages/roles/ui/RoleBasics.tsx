'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { ColorSwatches } from '@/shared/ui/color-swatches'
import {
	Field,
	FormField,
	formGrid2,
	inputClass,
	textareaClass,
} from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import type { TRoleFormValues } from '../model/RoleFormSchema'
import type { TRoleFormModel } from '../model/useRoleForm'

type TRoleBasicsProps = { colors: TRoleFormModel['colors'] }

export function RoleBasics({ colors }: TRoleBasicsProps) {
	const t = useTranslations('RoleForm')

	const { control } = useFormContext<TRoleFormValues>()

	const inputProps = useFieldProps<TRoleFormValues>()

	return (
		<FormSection title={t('basics')}>
			<div className={formGrid2}>
				<FormField name='name' label={t('roleName')} required>
					<input
						className={inputClass}
						placeholder={t('roleNamePlaceholder')}
						{...inputProps('name')}
					/>
				</FormField>
				<Field as='div' label={t('color')}>
					<Controller
						control={control}
						name='color'
						render={({ field }) => (
							<ColorSwatches
								aria-label={t('roleColor')}
								swatches={colors}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</Field>
				<Field label={t('description')} className='col-span-full'>
					<textarea
						className={cn(textareaClass, 'min-h-15')}
						placeholder={t('descriptionPlaceholder')}
						{...inputProps('description')}
					/>
				</Field>
			</div>
		</FormSection>
	)
}
