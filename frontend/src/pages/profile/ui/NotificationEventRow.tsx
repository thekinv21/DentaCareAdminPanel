'use client'

import { useController, useFormContext } from 'react-hook-form'

import { Switch } from '@/shared/ui/switch'
import { Td } from '@/shared/ui/table'

import type { TNotificationChannelId } from '../model/Profile'
import type { TProfileFormValues } from '../model/ProfileFormSchema'
import type { TProfileNotificationEvent } from '../model/useProfileSettings'

type TNotificationEventRowProps = { event: TProfileNotificationEvent }

/**
 * One event with a switch per delivery channel
 */
export function NotificationEventRow({ event }: TNotificationEventRowProps) {
	return (
		<tr>
			<Td>
				<div className='font-semibold'>{event.label}</div>
				<div className='text-[12.5px] leading-4.5 text-ink-muted'>
					{event.hint}
				</div>
			</Td>
			{event.channels.map(channel => (
				<Td key={channel.id} align='center'>
					<ChannelSwitch
						eventId={event.id}
						channelId={channel.id}
						ariaLabel={channel.ariaLabel}
					/>
				</Td>
			))}
		</tr>
	)
}

type TChannelSwitchProps = {
	eventId: TProfileNotificationEvent['id']
	channelId: TNotificationChannelId
	ariaLabel: string
}

function ChannelSwitch({ eventId, channelId, ariaLabel }: TChannelSwitchProps) {
	const { control } = useFormContext<TProfileFormValues>()
	const { field } = useController({
		control,
		name: `notifications.${eventId}.${channelId}`,
	})

	return (
		<span className='inline-flex align-middle'>
			<Switch
				checked={field.value}
				onChange={field.onChange}
				aria-label={ariaLabel}
			/>
		</span>
	)
}
