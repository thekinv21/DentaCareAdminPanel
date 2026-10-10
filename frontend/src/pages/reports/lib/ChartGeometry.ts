/**
 * SVG box and plot area of the revenue chart, in viewBox units
 */
export const CHART = {
	width: 640,
	height: 250,
	left: 44,
	right: 640,
	base: 210,
	top: 15,
	max: 3000,
	monthLabelY: 230,
	axisLabelX: 0,
	zeroLabelX: 30,
}
export const GRID_VALUES = [3000, 2000, 1000]

const MAX_BAR_WIDTH = 34
const BAR_SHARE_OF_SLOT = 0.6

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
	const width = Math.min(MAX_BAR_WIDTH, slot * BAR_SHARE_OF_SLOT)
	return (index: number) => {
		const x = CHART.left + index * slot + (slot - width) / 2
		return { x, width, center: x + width / 2 }
	}
}
