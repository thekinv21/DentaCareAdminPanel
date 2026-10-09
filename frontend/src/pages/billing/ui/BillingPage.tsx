'use client'

import { Plus } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

import { useBilling } from '../model/use-billing'
import { InvoicesTable } from './InvoicesTable'
import { PaymentPanel } from './PaymentPanel'

export function BillingPage() {
	const { t } = useI18n()
	const billing = useBilling()

	return (
		<>
			<PageHeader
				crumb={t(
					'Октябрь 2026 · приём через Visa, MBANK, Компаньон, Optima Bank',
				)}
				title={t('Оплаты')}
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('Новый счёт')}
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label={t('Сводка')}>
					<StatCard
						label={t('Получено в октябре')}
						value='2 184 300'
						unit={t('сом')}
						footer={
							<>
								<Delta>+9%</Delta> {t('к сентябрю')}
							</>
						}
					/>
					<StatCard
						label={t('К оплате')}
						value='218 400'
						unit={t('сом')}
						delay={50}
						footer={t('23 пациента')}
					/>
					<StatCard
						label={t('Просрочено')}
						value='46 900'
						unit={t('сом')}
						valueClass='text-danger'
						delay={100}
						footer={t('6 счетов старше 30 дней')}
					/>
				</StatGrid>
				<section className='flex flex-[1_0_auto] flex-wrap items-stretch gap-4'>
					<InvoicesTable billing={billing} />
					<PaymentPanel billing={billing} />
				</section>
			</PageContent>
		</>
	)
}
