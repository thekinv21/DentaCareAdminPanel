/* Open overlays in opening order; only the top one reacts to Esc/Enter */

const openLayers: symbol[] = []

export function pushLayer(): symbol {
	const layer = Symbol('overlay')
	openLayers.push(layer)
	return layer
}

export function removeLayer(layer: symbol): void {
	const index = openLayers.indexOf(layer)
	if (index >= 0) openLayers.splice(index, 1)
}

export const isTopLayer = (layer: symbol) => openLayers.at(-1) === layer
