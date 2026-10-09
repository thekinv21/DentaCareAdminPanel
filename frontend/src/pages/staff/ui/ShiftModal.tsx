'use client'

import { CalendarClock, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Alert } from '@/shared/ui/alert'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'

import {
	SHIFT_REPEATS,
	SHIFT_TYPES,
	type TShiftFormModel,
} from '../model/useShiftForm'

type TShiftModalProps = { shift: TShiftFormModel }

export function ShiftModal({ shift }: TShiftModalProps) {
	const t = useTranslations('ShiftForm')
	const tCommon = useTranslations('Common')
	const { target, draft } = shift
	if (!target || !draft) return null

	return (
		<Modal
			open={shift.open}
			onClose={shift.close}
			busy={shift.saving}
			icon={<CalendarClock size={20} aria-hidden='true' />}
			title={t('shift')}
			subtitle={t('subtitle')}
			footer={
				<>
					<Button variant='dangerGhost' onClick={shift.remove}>
						<Trash2 size={16} aria-hidden='true' />
						{t('deleteShift')}
					</Button>
					<span className='flex-1' />
					<Button onClick={shift.close}>{tCommon('cancel')}</Button>
					<Button
						variant='primary'
						onClick={shift.save}
						aria-busy={shift.saving}
					>
						{shift.saving && <Spinner />}
						{shift.saving ? tCommon('saving') : t('saveShift')}
					</Button>
				</>
			}
		>
			<div className='flex items-center gap-3 rounded-[14px] border-[1.5px] border-brand bg-brand-soft px-3 py-2.5'>
				<Avatar initials={target.initials} tone={target.tone} size={40} />
				<div className='flex-1'>
					<div className='font-bold'>{target.name}</div>
					<div className='text-[12.5px] text-ink-muted'>{shift.day}</div>
				</div>
			</div>
			<Field as='div' label={t('type')}>
				<ChoiceChips
					aria-label={t('type')}
					options={SHIFT_TYPES.map(id => ({ id, label: t(`type_${id}`) }))}
					value={draft.type}
					onChange={type => shift.change({ type })}
				/>
			</Field>
			{draft.type === 'work' && (
				<div className={formGrid3}>
					<Field label={t('start')}>
						<input
							className={`${inputClass} font-mono`}
							value={draft.from}
							onChange={event => shift.change({ from: event.target.value })}
						/>
					</Field>
					<Field label={t('end')}>
						<input
							className={`${inputClass} font-mono`}
							value={draft.to}
							onChange={event => shift.change({ to: event.target.value })}
						/>
					</Field>
					<Field as='div' label={t('chair')}>
						<ChoiceChips
							aria-label={t('chair')}
							options={[1, 2, 3, 4].map(n => ({ id: n, label: String(n) }))}
							value={draft.chair}
							onChange={chair => shift.change({ chair })}
							chipClassName='min-w-10 justify-center'
						/>
					</Field>
				</div>
			)}
			<Field as='div' label={t('repeat')}>
				<ChoiceChips
					aria-label={t('repeat')}
					options={SHIFT_REPEATS.map(id => ({ id, label: t(`repeat_${id}`) }))}
					value={draft.repeat}
					onChange={repeat => shift.change({ repeat })}
				/>
			</Field>
			{shift.conflict && (
				<Alert tone='warning' className='text-[13px] leading-4.75'>
					{shift.conflict}
				</Alert>
			)}
		</Modal>
	)
}
