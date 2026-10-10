export type TPageItem = number | 'gap'

/**
 * Page indexes around the current one plus the first and last page,
 * with gaps instead of long runs: 0 … 4 5 6 … 11
 */
export function getPageItems(pageIndex: number, pageCount: number) {
	const pages = new Set([
		0,
		pageCount - 1,
		pageIndex - 1,
		pageIndex,
		pageIndex + 1,
	])

	const visible = [...pages]
		.filter(page => page >= 0 && page < pageCount)
		.sort((a, b) => a - b)

	return visible.flatMap<TPageItem>((page, index) => {
		const previous = visible[index - 1]

		if (previous === undefined || page - previous === 1) return [page]

		return page - previous === 2 ? [previous + 1, page] : ['gap', page]
	})
}
