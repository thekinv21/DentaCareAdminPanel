import type { TChipOption } from './ChoiceChips'

type TChipContentProps<T extends string | number> = { option: TChipOption<T> }

/**
 * Leading mark, label and muted trailing text of one chip
 */
export function ChipContent<T extends string | number>({
	option,
}: TChipContentProps<T>) {
	return (
		<>
			{option.leading}
			{option.label}
			{option.trailing && (
				<span className='font-mono text-xs text-ink-muted'>
					{option.trailing}
				</span>
			)}
		</>
	)
}
