import { toothShape } from '../lib/ToothShape'
import type { TSurface, TToothState } from '../model/Teeth'
import { ToothCrown } from './ToothCrown'
import { ToothRoots } from './ToothRoots'

type TToothSvgProps = {
	toothNumber: number
	isUpper: boolean
	toothState: TToothState
	surfaceTitle: (surface: TSurface, nameKey?: string) => string
	onPickSurface: (surface: TSurface) => void
}

export function ToothSvg(props: TToothSvgProps) {
	const { toothNumber, isUpper, toothState, surfaceTitle, onPickSurface } =
		props

	const shape = toothShape(
		toothNumber,
		isUpper,
		!!(toothState.missing || toothState.implant),
	)

	return (
		<svg
			viewBox='0 0 40 96'
			aria-hidden='true'
			className='block h-auto w-full max-w-11.5 overflow-visible'
		>
			<g opacity={toothState.missing ? 0.45 : 1}>
				<ToothRoots shape={shape} toothState={toothState} />
				<ToothCrown
					shape={shape}
					toothState={toothState}
					surfaceTitle={surfaceTitle}
					onPickSurface={onPickSurface}
				/>
			</g>
		</svg>
	)
}
