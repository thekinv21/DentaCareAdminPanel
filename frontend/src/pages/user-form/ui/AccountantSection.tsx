'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { Badge } from '@/shared/ui/badge'
import { ToggleChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import { EXPORT_FORMATS, REPORT_BRANCHES, REPORTS } from '../model/Options'
import type { TUserFormValues } from '../model/Schema'
import { UserSwitch } from './UserSwitch'

export function AccountantSection() {
	const t = useTranslations('UserForm')
	const { control, register } = useFormContext<TUserFormValues>()

	return (
		<FormSection
			className='animate-fade'
			title={t('finance')}
			aside={<Badge tone='warning'>{t('accountantFields')}</Badge>}
		>
			<Field as='div' label={t('availableReports')}>
				<Controller
					control={control}
					name='reports'
					render={({ field }) => (
						<ToggleChips
							aria-label={t('reports')}
							options={REPORTS.map(id => ({
								id: id as string,
								label: t(`report_${id}`),
							}))}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</Field>
			<div className={formGrid2}>
				<Field label={t('exportFormat')}>
					<select className={inputClass} {...register('exportFormat')}>
						{EXPORT_FORMATS.map(item => (
							<option key={item} value={item}>
								{t(`format_${item}`)}
							</option>
						))}
					</select>
				</Field>
				<Field label={t('branchesInReports')}>
					<select className={inputClass} {...register('reportBranches')}>
						{REPORT_BRANCHES.map(item => (
							<option key={item} value={item}>
								{t(item)}
							</option>
						))}
					</select>
				</Field>
				<UserSwitch
					name='bank'
					label={t('seeBankStatements')}
					hint={t('seeBankStatementsHint')}
					ariaLabel={t('bankStatements')}
				/>
				<UserSwitch
					name='close'
					label={t('closeTillShift')}
					hint={t('closeTillShiftHint')}
				/>
			</div>
		</FormSection>
	)
}
