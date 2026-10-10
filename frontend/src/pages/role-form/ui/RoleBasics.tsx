'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { ChoiceChips } from '@/shared/ui/choice-chips'
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

type TRoleBasicsProps = { form: TRoleFormModel }

export function RoleBasics({ form }: TRoleBasicsProps) {
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
								swatches={form.colors}
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
				{!form.isEdit && (
					<Field
						as='div'
						label={t('startFromPreset')}
						className='col-span-full'
					>
						<Controller
							control={control}
							name='preset'
							render={({ field }) => (
								<ChoiceChips
									aria-label={t('preset')}
									options={form.presets}
									value={field.value}
									onChange={form.applyPreset}
								/>
							)}
						/>
					</Field>
				)}
			</div>
		</FormSection>
	)
}
