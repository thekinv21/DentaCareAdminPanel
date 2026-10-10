import type { TSurface } from '../model/Teeth'
import {
	centrePath,
	crossPath,
	implantPaths,
	rootPaths,
	sectorPath,
} from './Geometry'

/**
 * Teeth whose mesial side faces left on the chart (patient's left side)
 */
const LEFT_MESIAL_QUADRANTS = [2, 3, 6, 7]

function buildToothShape(
	toothNumber: number,
	isUpper: boolean,
	hideRoots: boolean,
) {
	const quadrant = Math.floor(toothNumber / 10)
	const cy = isUpper ? 74 : 22
	const isLeftMesial = LEFT_MESIAL_QUADRANTS.includes(quadrant)

	const sides: { surface: TSurface; path: string }[] = [
		{ surface: isUpper ? 'b' : 'o', path: sectorPath(cy, -135, -45) },
		{ surface: isLeftMesial ? 'd' : 'm', path: sectorPath(cy, -45, 45) },
		{ surface: isUpper ? 'o' : 'b', path: sectorPath(cy, 45, 135) },
		{ surface: isLeftMesial ? 'm' : 'd', path: sectorPath(cy, 135, 225) },
	]

	return {
		cy,
		isAnterior: toothNumber % 10 <= 3,
		sides,
		centre: centrePath(cy),
		cross: crossPath(cy),
		implant: implantPaths(isUpper),
		...(hideRoots
			? { roots: [], canals: [] }
			: rootPaths(toothNumber, isUpper)),
	}
}

export type TToothShape = ReturnType<typeof buildToothShape>

const shapeCache = new Map<string, TToothShape>()

/**
 * SVG paths of a tooth; a pure function of its inputs, so it is built once and reused
 */
export function toothShape(
	toothNumber: number,
	isUpper: boolean,
	hideRoots: boolean,
): TToothShape {
	const key = `${toothNumber}-${isUpper}-${hideRoots}`
	let shape = shapeCache.get(key)
	if (!shape) {
		shape = buildToothShape(toothNumber, isUpper, hideRoots)
		shapeCache.set(key, shape)
	}
	return shape
}
