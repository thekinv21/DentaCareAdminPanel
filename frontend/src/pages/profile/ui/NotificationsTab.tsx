'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { Switch } from '@/shared/ui/switch'
import { Table, Td, Th } from '@/shared/ui/table'

import type { ProfileSettingsModel } from '../model/use-profile-settings'

export function NotificationsTab({ model }: { model: ProfileSettingsModel }) {
	const { t } = useI18n()
	return (
		<div className='animate-fade pt-0.5 pb-2'>
			<div className='overflow-x-auto'>
				<Table className='min-w-[560px]' hoverRows={false}>
					<thead>
						<tr>
							<Th>{t('Событие')}</Th>
							{model.channels.map(channel => (
								<Th key={channel.id} align='center'>
									{channel.label}
								</Th>
							))}
						</tr>
					</thead>
					<tbody>
						{model.events.map(event => (
							<tr key={event.id}>
								<Td>
									<div className='font-semibold'>{event.label}</div>
									<div className='text-[12.5px] leading-[18px] text-ink-muted'>
										{event.hint}
									</div>
								</Td>
								{event.channels.map(channel => (
									<Td key={channel.id} align='center'>
										<span className='inline-flex align-middle'>
											<Switch
												checked={channel.checked}
												onChange={channel.flip}
												aria-label={channel.aria}
											/>
										</span>
									</Td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			<div className={cn(formGrid2, 'mt-[18px]')}>
				<Field label={t('Не беспокоить')}>
					<input
						className={cn(inputClass, 'font-mono')}
						defaultValue='21:00 – 07:30'
					/>
				</Field>
				<Field label={t('Сводка дня')}>
					<select className={inputClass}>
						<option>{t('В 07:45 · расписание на день')}</option>
						<option>{t('Не присылать')}</option>
					</select>
				</Field>
			</div>
		</div>
	)
}
