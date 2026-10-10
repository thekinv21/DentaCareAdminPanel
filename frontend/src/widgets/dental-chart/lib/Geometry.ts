/**
 * SVG geometry for one tooth in a 40×96 box: crown circle split into 4 surfaces + centre, roots below/above
 */

const point = (cx: number, cy: number, r: number, angle: number) => {
	const rad = (angle * Math.PI) / 180
	return `${(cx + r * Math.cos(rad)).toFixed(2)} ${(cy + r * Math.sin(rad)).toFixed(2)}`
}

const OUTER = 17
const INNER = 7.5

export function sectorPath(cy: number, from: number, to: number): string {
	return (
		`M${point(20, cy, OUTER, from)} A${OUTER} ${OUTER} 0 0 1 ${point(20, cy, OUTER, to)} ` +
		`L${point(20, cy, INNER, to)} A${INNER} ${INNER} 0 0 0 ${point(20, cy, INNER, from)} Z`
	)
}

export function centrePath(cy: number): string {
	return `M12.5 ${cy} a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0 Z`
}

/**
 * [left x, right x, tip x] per root
 */
function rootSet(
	toothNumber: number,
	isUpper: boolean,
): [number, number, number][] {
	const position = toothNumber % 10
	const isPrimary = Math.floor(toothNumber / 10) >= 5
	if (isPrimary) {
		if (position >= 4) {
			return isUpper
				? [
						[6, 17, 11],
						[17.5, 24, 21],
						[23, 34, 29],
					]
				: [
						[7, 18, 12],
						[22, 33, 28],
					]
		}
		return [[14, 26, 20]]
	}
	if (position >= 6) {
		return isUpper
			? [
					[5, 15, 9],
					[15.5, 24.5, 20],
					[25, 35, 31],
				]
			: [
					[6, 18, 11],
					[22, 34, 29],
				]
	}
	if (position === 4 && isUpper)
		return [
			[8, 19, 13],
			[21, 32, 27],
		]
	return [[13, 27, 20]]
}

export function rootPaths(
	toothNumber: number,
	isUpper: boolean,
): { roots: string[]; canals: string[] } {
	const set = rootSet(toothNumber, isUpper)
	return {
		roots: set.map(([left, right, tip]) =>
			isUpper
				? `M${left} 66 C${left} 40 ${tip - 3} 14 ${tip} 6 C${tip + 3} 14 ${right} 40 ${right} 66 Z`
				: `M${left} 30 C${left} 56 ${tip - 3} 82 ${tip} 90 C${tip + 3} 82 ${right} 56 ${right} 30 Z`,
		),
		canals: set.map(([, , tip]) =>
			isUpper ? `M${tip} 58 L${tip} 14` : `M${tip} 38 L${tip} 82`,
		),
	}
}

export function implantPaths(isUpper: boolean) {
	return isUpper
		? {
				screw: 'M15 64 L15 18 Q20 8 25 18 L25 64 Z',
				threads:
					'M13.5 56 L26.5 56 M13.5 48 L26.5 48 M13.5 40 L26.5 40 M13.5 32 L26.5 32 M14.5 24 L25.5 24',
			}
		: {
				screw: 'M15 32 L15 78 Q20 88 25 78 L25 32 Z',
				threads:
					'M13.5 40 L26.5 40 M13.5 48 L26.5 48 M13.5 56 L26.5 56 M13.5 64 L26.5 64 M14.5 72 L25.5 72',
			}
}

export function crossPath(cy: number): string {
	return `M6 ${cy - 14} L34 ${cy + 14} M34 ${cy - 14} L6 ${cy + 14}`
}
