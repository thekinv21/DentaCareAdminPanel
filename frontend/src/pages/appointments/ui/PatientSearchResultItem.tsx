import { Avatar } from '@/shared/ui/avatar'

import type { TPatientSearchResult } from '../model/usePatientSearch'

type TPatientSearchResultItemProps = {
	result: TPatientSearchResult
	onPick: (patientId: string) => void
}

export function PatientSearchResultItem({
	result,
	onPick,
}: TPatientSearchResultItemProps) {
	return (
		<li className='border-b border-line'>
			<button
				type='button'
				onClick={() => onPick(result.id)}
				className='flex w-full items-center gap-2.5 bg-transparent px-3 py-2.25 text-left hover:bg-raised'
			>
				<Avatar initials={result.initials} tone={result.tone} />
				<span className='min-w-0 flex-1'>
					<span className='block font-semibold'>{result.name}</span>
					<span className='block text-[12.5px] text-ink-muted'>
						<span className='font-mono'>{result.id}</span> · {result.phone}
					</span>
				</span>
				<span className='text-[12.5px] whitespace-nowrap text-ink-muted'>
					{result.lastVisit}
				</span>
			</button>
		</li>
	)
}
