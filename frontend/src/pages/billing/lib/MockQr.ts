/**
 * Deterministic QR-looking SVG path (25×25 modules) for the payment mock-up.
 * Not a scannable code: the real one will come from the bank API.
 */
export function mockQrPath(seedValue: number): string {
	let seed = seedValue
	const random = () => {
		seed = (seed * 9301 + 49297) % 233280
		return seed / 233280
	}

	let path = ''
	for (let y = 0; y < 25; y++) {
		for (let x = 0; x < 25; x++) {
			const inFinder =
				(x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16)
			if (!inFinder && random() > 0.52) path += `M${x} ${y}h1v1h-1z`
		}
	}

	const finder = (x: number, y: number) =>
		`M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`

	return path + finder(0, 0) + finder(18, 0) + finder(0, 18)
}
