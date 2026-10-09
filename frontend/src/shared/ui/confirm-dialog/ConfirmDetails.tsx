'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { getInitials } from '@/shared/lib/format'
import { Avatar } from '@/shared/ui/avatar'

import { IMPACT_CLASS, IMPACT_MARK, sectionLabelClass } from './ConfirmTone'
import type { TConfirmOptions } from './ConfirmTypes'
import type { TConfirmDialogModel } from './useConfirmDialog'

const VISIBLE_BULK = 6

type TConfirmDetailsProps = {
	request: TConfirmOptions
	model: TConfirmDialogModel
}

/**
 * Who or what the action touches: subject, bulk list, impact and a choice
 */
export function ConfirmDetails({ request, model }: TConfirmDetailsProps) {
	const t = useTranslations('Confirm')
	const { subject, bulk, impact, choice } = request

	return (
		<>
			{subject && !bulk && (
				<div className='flex items-center gap-2.5 rounded-[14px] border border-line bg-raised px-3 py-2.5'>
					<Avatar
						initials={subject.initials ?? getInitials(subject.title)}
						tone={subject.tone ?? 'neutral'}
						size={34}
					/>
					<div className='min-w-0'>
						<div className='truncate font-bold'>{subject.title}</div>
						{subject.subtitle && (
							<div className='truncate text-[12.5px] text-ink-muted'>
								{subject.subtitle}
							</div>
						)}
					</div>
				</div>
			)}
			{bulk && (
				<div className='flex flex-col gap-2'>
					<span className={sectionLabelClass}>
						{bulk.title ?? t('selectedN', { n: bulk.items.length })}
					</span>
					<div className='flex flex-wrap gap-1.5'>
						{bulk.items.slice(0, VISIBLE_BULK).map(item => (
							<span
								key={item.id}
								className='inline-flex items-center gap-1.5 rounded-full border border-line bg-raised py-0.75 pr-2.5 pl-1 text-[12.5px] font-semibold'
							>
								<Avatar
									initials={item.initials ?? getInitials(item.name)}
									tone={item.tone ?? 'neutral'}
									size={22}
								/>
								{item.name}
							</span>
						))}
						{bulk.items.length > VISIBLE_BULK && (
							<span className='pl-2.5 text-[12.5px] font-semibold'>
								{t('moreN', { n: bulk.items.length - VISIBLE_BULK })}
							</span>
						)}
					</div>
				</div>
			)}
			{!!impact?.length && (
				<div className='flex flex-col gap-2'>
					<span className={sectionLabelClass}>{t('whatWillHappen')}</span>
					<ul className='flex flex-col gap-1.5'>
						{impact.map(item => {
							const tone = item.tone ?? 'neutral'
							return (
								<li
									key={item.text}
									className='flex items-start gap-2.5 text-[13.5px] leading-4.75'
								>
									<span
										className={cn(
											'inline-flex size-5 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-bold',
											IMPACT_CLASS[tone],
										)}
									>
										{item.n ?? IMPACT_MARK[tone]}
									</span>
									<span>{item.text}</span>
								</li>
							)
						})}
					</ul>
				</div>
			)}
			{choice && (
				<div className='flex flex-col gap-2'>
					<span className={sectionLabelClass}>{choice.label}</span>
					<div
						role='radiogroup'
						aria-label={choice.label}
						className='grid gap-1.5'
					>
						{choice.items.map(item => {
							const on = model.choice === item.id
							return (
								<button
									key={item.id}
									type='button'
									role='radio'
									aria-checked={on}
									onClick={() => model.setChoice(item.id)}
									className={cn(
										'flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left text-ink',
										on
											? 'border-brand bg-brand-soft'
											: 'border-line bg-surface',
									)}
								>
									<span
										className={cn(
											'mt-px size-4.5 shrink-0 rounded-full bg-surface',
											on
												? 'border-[5px] border-brand'
												: 'border-2 border-line-strong',
										)}
									/>
									<span>
										<span className='block font-semibold'>{item.label}</span>
										{item.hint && (
											<span className='block text-[12.5px] text-ink-muted'>
												{item.hint}
											</span>
										)}
									</span>
								</button>
							)
						})}
					</div>
				</div>
			)}
		</>
	)
}
