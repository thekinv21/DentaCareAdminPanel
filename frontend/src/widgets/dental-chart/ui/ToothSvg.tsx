import { toothShape } from '../lib/ToothShape'
import type { TSurface, TToothState } from '../model/Teeth'
import { ToothCrown } from './ToothCrown'
import { ToothRoots } from './ToothRoots'

type TToothSvgProps = {
	n: number
	upper: boolean
	state: TToothState
	surfaceTitle: (surface: TSurface, anteriorName?: string) => string
	onPickSurface: (surface: TSurface) => void
}

export function ToothSvg(props: TToothSvgProps) {
	const { n, upper, state, surfaceTitle, onPickSurface } = props

	const shape = toothShape(n, upper, !!(state.missing || state.implant))

	return (
		<svg
			viewBox='0 0 40 96'
			aria-hidden='true'
			className='block h-auto w-full max-w-11.5 overflow-visible'
		>
			<g opacity={state.missing ? 0.45 : 1}>
				<ToothRoots shape={shape} state={state} />
				<ToothCrown
					shape={shape}
					state={state}
					surfaceTitle={surfaceTitle}
					onPickSurface={onPickSurface}
				/>
			</g>
		</svg>
	)
}
