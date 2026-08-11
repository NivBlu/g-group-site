const nf = new Intl.NumberFormat('he-IL')

export const num = (n: number) => nf.format(Math.round(n))
export const shekel = (n: number) => `${num(n)} ₪`
export const sqm = (n: number) => `${num(n)} מ״ר`

/** 690000 -> "690K" */
export const compact = (n: number) => `${Math.round(n / 1000)}K`

/** Hebrew has a distinct singular here — "יחידה אחת", not "1 יחידות". */
export const units = (n: number) => (n === 1 ? 'יחידה אחת' : `${num(n)} יחידות`)

/** Prefixed form. A maqaf is required before a numeral: "ל־4 יחידות", not "ל4 יחידות". */
export const forUnits = (n: number) => (n === 1 ? 'ליחידה אחת' : `ל־${num(n)} יחידות`)
