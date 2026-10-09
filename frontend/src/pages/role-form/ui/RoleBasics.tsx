'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { ColorSwatches } from '@/shared/ui/color-swatches'
import { Field, formGrid2, inputClass, textareaClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import type { TRoleFormModel } from '../model/useRoleForm'

type TRoleBasicsProps = { form: TRoleFormModel }

export function RoleBasics({ form }: TRoleBasicsProps) {
	const t = useTranslations('RoleForm')
	return (
		<FormSection title={t('basics')}>
			<div className={formGrid2}>
				<Field label={t('roleName')} required error={form.errorOf('name')}>
					<input
						className={inputClass}
						placeholder={t('roleNamePlaceholder')}
						{...form.field('name')}
					/>
				</Field>
				<Field as='div' label={t('color')}>
					<ColorSwatches
						aria-label={t('roleColor')}
						swatches={form.colors}
						value={form.color}
						onChange={form.setColor}
					/>
				</Field>
				<Field label={t('description')} className='col-span-full'>
					<textarea
						className={cn(textareaClass, 'min-h-15')}
						placeholder={t('descriptionPlaceholder')}
						{...form.field('description')}
					/>
				</Field>
				{!form.isEdit && (
					<Field
						as='div'
						label={t('startFromPreset')}
						className='col-span-full'
					>
						<ChoiceChips
							aria-label={t('preset')}
							options={form.presets}
							value={form.preset}
							onChange={form.applyPreset}
						/>
					</Field>
				)}
			</div>
		</FormSection>
	)
}
