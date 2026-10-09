export const CHART = { left: 44, right: 640, base: 210, top: 15, max: 3000 }
export const GRID_VALUES = [3000, 2000, 1000]

/**
 * Value in thousands of som → SVG y
 */
export const chartY = (value: number) =>
	CHART.base - (value / CHART.max) * (CHART.base - CHART.top)

/**
 * Evenly spaced bars across the plot width
 */
export function barLayout(count: number) {
	const slot = (CHART.right - CHART.left) / count
	const width = Math.min(34, slot * 0.6)
	return (index: number) => {
		const x = CHART.left + index * slot + (slot - width) / 2
		return { x, width, center: x + width / 2 }
	}
}
