/**
 * Project imagery, extracted from the project deck.
 *
 * Imported rather than string-referenced so Vite hashes them for cache-busting
 * and emits exactly one copy of each. Intrinsic dimensions travel with each
 * image so the browser can reserve space before a lazy image loads — without
 * them, images arriving late push the page around and break anchor scrolling.
 */
import aerialSiteSrc from './aerial-site.jpg'
import gindiCompareSrc from './gindi-compare.jpg'
import heroRenderSrc from './hero-render.jpg'
import hiTowerSrc from './hi-tower.jpg'
import hubLayersSrc from './hub-layers.jpg'
import hubRenderSrc from './hub-render.jpg'
import locationMapSrc from './location-map.jpg'
import plan5500Src from './plan-5500.jpg'
import transportNetworkSrc from './transport-2026-2037.jpg'

export type Img = { src: string; width: number; height: number }

export const heroRender: Img = { src: heroRenderSrc, width: 2600, height: 1111 }
export const aerialSite: Img = { src: aerialSiteSrc, width: 1900, height: 1115 }
export const locationMap: Img = { src: locationMapSrc, width: 1449, height: 1155 }
export const hubRender: Img = { src: hubRenderSrc, width: 1248, height: 890 }
export const hubLayers: Img = { src: hubLayersSrc, width: 1400, height: 1097 }
export const transportNetwork: Img = { src: transportNetworkSrc, width: 2200, height: 1081 }
export const plan5500: Img = { src: plan5500Src, width: 2200, height: 863 }
export const gindiCompare: Img = { src: gindiCompareSrc, width: 1700, height: 977 }
export const hiTower: Img = { src: hiTowerSrc, width: 841, height: 1100 }
