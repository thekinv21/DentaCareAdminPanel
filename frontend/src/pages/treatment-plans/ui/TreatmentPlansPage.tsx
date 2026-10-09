'use client'

import { Plus } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

import { PlansTable } from './PlansTable'

export function TreatmentPlansPage() {
	const { t } = useI18n()
	return (
		<>
			<PageHeader
				crumb={t('Согласование и выполнение планов')}
				title={t('Планы лечения')}
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('Новый план')}
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label={t('Сводка')}>
					<StatCard
						label={t('Активные планы')}
						value='64'
						footer={
							<>
								<Delta>+6</Delta> {t('начато в октябре')}
							</>
						}
					/>
					<StatCard
						label={t('Ждут согласия')}
						value='9'
						delay={50}
						footer={t('На сумму 312 400 сом')}
					/>
					<StatCard
						label={t('Согласие пациентов')}
						value='78%'
						delay={100}
						footer={t('За 90 дней · цель 70%')}
					/>
				</StatGrid>
				<PlansTable />
			</PageContent>
		</>
	)
}
