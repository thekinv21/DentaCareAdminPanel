'use client'

import { Monitor } from 'lucide-react'

import { useI18n } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { ToggleRow } from '@/shared/ui/toggle-row'

import type { ProfileSettingsModel } from '../model/use-profile-settings'

export function SecurityTab({ model }: { model: ProfileSettingsModel }) {
	const { t } = useI18n()
	return (
		<div className='flex animate-fade flex-col gap-[22px] pt-0.5 pb-2'>
			<div>
				<p className='mb-2.5 font-display text-[15px] leading-6 font-bold'>
					{t('Смена пароля')}
				</p>
				<div className={formGrid3}>
					<Field label={t('Текущий пароль')}>
						<input
							className={inputClass}
							type='password'
							defaultValue='••••••••••'
							autoComplete='current-password'
						/>
					</Field>
					<Field label={t('Новый пароль')}>
						<input
							className={inputClass}
							type='password'
							placeholder={t('Минимум 10 символов')}
							autoComplete='new-password'
						/>
					</Field>
					<Field label={t('Повторите пароль')}>
						<input
							className={inputClass}
							type='password'
							placeholder={t('Ещё раз')}
							autoComplete='new-password'
						/>
					</Field>
				</div>
				<p className='mt-2 text-[12.5px] leading-[18px] text-ink-muted'>
					{t('Пароль меняли 64 дня назад. Рекомендуем менять каждые 90 дней.')}
				</p>
			</div>

			<div className='rounded-2xl border border-line px-3.5 py-1'>
				{model.security.map(option => (
					<ToggleRow
						key={option.id}
						label={option.label}
						hint={option.hint}
						checked={option.checked}
						onChange={option.flip}
					/>
				))}
			</div>

			<div>
				<div className='mb-1.5 flex flex-wrap items-center justify-between gap-2.5'>
					<p className='font-display text-[15px] leading-6 font-bold'>
						{t('Активные сеансы')}
					</p>
					<Button
						size='sm'
						className='text-danger'
						onClick={model.endOtherSessions}
					>
						{t('Завершить все, кроме текущего')}
					</Button>
				</div>
				<ul>
					{model.sessions.map(session => (
						<li
							key={session.id}
							className='flex items-center gap-3.5 border-b border-line py-3 last:border-b-0'
						>
							<span className='inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-sunken'>
								<Monitor size={18} aria-hidden='true' />
							</span>
							<div className='min-w-0 flex-grow'>
								<div className='flex items-center gap-2'>
									<span className='font-semibold'>{session.device}</span>
									{session.current && (
										<Badge tone='ok'>{t('Этот сеанс')}</Badge>
									)}
								</div>
								<p className='text-[12.5px] leading-[18px] text-ink-muted'>
									{session.where}
								</p>
							</div>
							<span className='font-mono text-[12.5px] whitespace-nowrap text-ink-muted'>
								{session.when}
							</span>
							{!session.current && (
								<Button size='sm' onClick={session.end}>
									{t('Завершить')}
								</Button>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
