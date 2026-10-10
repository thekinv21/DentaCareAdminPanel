'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { Badge } from '@/shared/ui/badge'
import { ToggleChipsField } from '@/shared/ui/choice-chips'
import { Field, formGrid2 } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { Select } from '@/shared/ui/select'
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
					<Select {...inputProps('exportFormat')}>
						{EXPORT_FORMATS.map(exportFormat => (
							<option key={exportFormat} value={exportFormat}>
								{t(`format_${exportFormat}`)}
							</option>
						))}
					</Select>
				</Field>
				<Field label={t('branchesInReports')}>
					<Select {...inputProps('reportBranches')}>
						{REPORT_BRANCHES.map(branchScope => (
							<option key={branchScope} value={branchScope}>
								{t(branchScope)}
							</option>
						))}
					</Select>
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
