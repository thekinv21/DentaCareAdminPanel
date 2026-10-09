'use client'

import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'
import { ToggleChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCard } from '@/shared/ui/switch-card'

import { EXPORT_FORMATS, REPORT_BRANCHES, REPORTS } from '../model/Options'
import type { TUserFormModel } from '../model/useUserForm'

type TAccountantSectionProps = { form: TUserFormModel }

export function AccountantSection({ form }: TAccountantSectionProps) {
	const t = useTranslations('UserForm')

	return (
		<FormSection
			className='animate-fade'
			title={t('finance')}
			aside={<Badge tone='warning'>{t('accountantFields')}</Badge>}
		>
			<Field as='div' label={t('availableReports')}>
				<ToggleChips
					aria-label={t('reports')}
					options={REPORTS.map(id => ({
						id: id as string,
						label: t(`report_${id}`),
					}))}
					value={form.choices.reports}
					onChange={value => form.choose('reports', value)}
				/>
			</Field>
			<div className={formGrid2}>
				<Field label={t('exportFormat')}>
					<select className={inputClass} {...form.field('exportFormat')}>
						{EXPORT_FORMATS.map(item => (
							<option key={item} value={item}>
								{t(`format_${item}`)}
							</option>
						))}
					</select>
				</Field>
				<Field label={t('branchesInReports')}>
					<select className={inputClass} {...form.field('reportBranches')}>
						{REPORT_BRANCHES.map(item => (
							<option key={item} value={item}>
								{t(item)}
							</option>
						))}
					</select>
				</Field>
				<SwitchCard
					label={t('seeBankStatements')}
					hint={t('seeBankStatementsHint')}
					aria-label={t('bankStatements')}
					checked={form.switches.bank}
					onChange={form.flip('bank')}
				/>
				<SwitchCard
					label={t('closeTillShift')}
					hint={t('closeTillShiftHint')}
					checked={form.switches.close}
					onChange={form.flip('close')}
				/>
			</div>
		</FormSection>
	)
}
