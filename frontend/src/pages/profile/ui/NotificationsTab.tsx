'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { Switch } from '@/shared/ui/switch'
import { Table, Td, Th } from '@/shared/ui/table'

import type { ProfileSettingsModel } from '../model/useProfileSettings'

export function NotificationsTab({ model }: { model: ProfileSettingsModel }) {
	const t = useTranslations('Profile')
	return (
		<div className='animate-fade pt-0.5 pb-2'>
			<div className='overflow-x-auto'>
				<Table className='min-w-140' hoverRows={false}>
					<thead>
						<tr>
							<Th>{t('event')}</Th>
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
									<div className='text-[12.5px] leading-4.5 text-ink-muted'>
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
			<div className={cn(formGrid2, 'mt-4.5')}>
				<Field label={t('doNotDisturb')}>
					<input
						className={cn(inputClass, 'font-mono')}
						defaultValue='21:00 – 07:30'
					/>
				</Field>
				<Field label={t('daySummary')}>
					<select className={inputClass}>
						<option>{t('at0745Daily')}</option>
						<option>{t('dontSend')}</option>
					</select>
				</Field>
			</div>
		</div>
	)
}
