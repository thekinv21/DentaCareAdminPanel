'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { Badge } from '@/shared/ui/badge'
import { ToggleChipsField } from '@/shared/ui/choice-chips'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCardField } from '@/shared/ui/switch-card'

import { EXPORT_FORMATS, REPORT_BRANCHES, REPORTS } from '../model/Options'
import type { TUserFormValues } from '../model/UserFormSchema'

export function AccountantSection() {
	const t = useTranslations('UserForm')

	const { control } = useFormContext<TUserFormValues>()

	const inputProps = useFieldProps<TUserFormValues>()

	return (
		<FormSection
			className='animate-fade'
			title={t('finance')}
			aside={<Badge tone='warning'>{t('accountantFields')}</Badge>}
		>
			<Field as='div' label={t('availableReports')}>
				<ToggleChipsField
					control={control}
					name='reports'
					aria-label={t('reports')}
					options={REPORTS.map(report => ({
						id: report,
						label: t(`report_${report}`),
					}))}
				/>
			</Field>
			<div className={formGrid2}>
				<Field label={t('exportFormat')}>
					<select className={inputClass} {...inputProps('exportFormat')}>
						{EXPORT_FORMATS.map(exportFormat => (
							<option key={exportFormat} value={exportFormat}>
								{t(`format_${exportFormat}`)}
							</option>
						))}
					</select>
				</Field>
				<Field label={t('branchesInReports')}>
					<select className={inputClass} {...inputProps('reportBranches')}>
						{REPORT_BRANCHES.map(branchScope => (
							<option key={branchScope} value={branchScope}>
								{t(branchScope)}
							</option>
						))}
					</select>
				</Field>
				<SwitchCardField
					control={control}
					name='switches.seeBankStatements'
					label={t('seeBankStatements')}
					hint={t('seeBankStatementsHint')}
					aria-label={t('bankStatements')}
				/>
				<SwitchCardField
					control={control}
					name='switches.closeTillShift'
					label={t('closeTillShift')}
					hint={t('closeTillShiftHint')}
				/>
			</div>
		</FormSection>
	)
}
