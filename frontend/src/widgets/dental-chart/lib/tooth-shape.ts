import type { Surface } from '../model/teeth'
import {
	centrePath,
	crossPath,
	implantPaths,
	rootPaths,
	sectorPath,
} from './geometry'

/**
 * Every SVG path of one tooth; upper teeth have the crown at the bottom of the box
 */
export function toothShape(n: number, upper: boolean, hideRoots: boolean) {
	const quadrant = Math.floor(n / 10)
	const cy = upper ? 74 : 22
	const leftIsMesial = [2, 3, 6, 7].includes(quadrant)

	const sides: { surface: Surface; d: string }[] = [
		{ surface: upper ? 'b' : 'o', d: sectorPath(cy, -135, -45) },
		{ surface: leftIsMesial ? 'd' : 'm', d: sectorPath(cy, -45, 45) },
		{ surface: upper ? 'o' : 'b', d: sectorPath(cy, 45, 135) },
		{ surface: leftIsMesial ? 'm' : 'd', d: sectorPath(cy, 135, 225) },
	]

	return {
		cy,
		anterior: n % 10 <= 3,
		sides,
		centre: centrePath(cy),
		cross: crossPath(cy),
		implant: implantPaths(upper),
		...(hideRoots ? { roots: [], canals: [] } : rootPaths(n, upper)),
	}
}
