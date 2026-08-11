/**
 * Stitches the dist-artifact build into one self-contained HTML file.
 *
 * Output is page *content* only — no doctype/html/head/body — because the
 * preview host wraps it in its own skeleton. Fonts are inlined from
 * fonts-inline.css (base64 woff2) since the host CSP blocks font CDNs.
 *
 *   node scripts/bundle.mjs <fonts-inline.css> <out.html>
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist-artifact'
const ASSETS = join(DIST, 'assets')

const [, , fontsPath, outPath] = process.argv
if (!fontsPath || !outPath) {
  console.error('usage: node scripts/bundle.mjs <fonts-inline.css> <out.html>')
  process.exit(1)
}

const files = readdirSync(ASSETS)
const jsFile = files.find((f) => f.endsWith('.js'))
const cssFile = files.find((f) => f.endsWith('.css'))
if (!jsFile || !cssFile) {
  console.error('expected one .js and one .css in', ASSETS, '— got', files)
  process.exit(1)
}

const js = readFileSync(join(ASSETS, jsFile), 'utf8')
const css = readFileSync(join(ASSETS, cssFile), 'utf8')
const fonts = readFileSync(fontsPath, 'utf8')

// Anything still pointing at a sibling file would 404 behind the CSP.
// Strip data: URIs first — they legitimately contain nested url(#id) filter
// references that would otherwise look like external ones.
// A quoted data URI runs to its closing quote and may contain ")" along the
// way; an unquoted one cannot, so the two need different bounds.
const cssWithoutData = css
  .replace(/url\(\s*(['"])data:[\s\S]*?\1\s*\)/g, 'url(data:)')
  .replace(/url\(\s*data:[^)]*\)/g, 'url(data:)')
const leftovers = [...cssWithoutData.matchAll(/url\(\s*(['"]?)(?!data:|#)([^)'"]+)\1\s*\)/g)].map(
  (m) => m[2],
)
if (leftovers.length) {
  console.error('CSS still references external assets:', leftovers)
  process.exit(1)
}
if (/from\s*["']\.\//.test(js) || /import\(["']\.\//.test(js)) {
  console.error('JS still imports a sibling chunk — expected a single bundle')
  process.exit(1)
}

const title = 'G-Group | קרקע בטאבו בתל אביב — 690,000 ₪ ליחידה'

const html = `<title>${title}</title>
<style>
${fonts}
${css}
</style>
<div id="root"></div>
<script type="module">
${js}
</script>
`

writeFileSync(outPath, html)
const mb = (Buffer.byteLength(html) / 1024 / 1024).toFixed(2)
console.log(`wrote ${outPath} — ${mb} MB (js ${(js.length / 1024 / 1024).toFixed(2)} MB, css ${(css.length / 1024).toFixed(0)} KB, fonts ${(fonts.length / 1024).toFixed(0)} KB)`)
