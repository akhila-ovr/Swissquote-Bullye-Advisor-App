/**
 * Tiny helper: turn a plain CSS declaration string into a React style object.
 *
 *   css('padding:14px 18px;color:var(--text-primary)')
 *   // => { padding: '14px 18px', color: 'var(--text-primary)' }
 *
 * The original prototype (Bullye Financial Advisor.dc.html) wrote every element
 * style as an inline CSS string. Keeping this helper lets the ported JSX stay
 * close to that source so the two can be diffed. Splitting each declaration on
 * its FIRST colon keeps values like `var(--x)`, `rgba(...)` and
 * `linear-gradient(...)` intact.
 */
export function css(str) {
  if (!str) return {}
  const out = {}
  for (const decl of String(str).split(';')) {
    const i = decl.indexOf(':')
    if (i === -1) continue
    const prop = decl.slice(0, i).trim()
    const value = decl.slice(i + 1).trim()
    if (!prop || !value) continue
    const key = prop.startsWith('--')
      ? prop
      : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    out[key] = value
  }
  return out
}

/** Merge several CSS strings / style objects into one style object. */
export function sx(...parts) {
  return parts.reduce((acc, p) => {
    if (!p) return acc
    return Object.assign(acc, typeof p === 'string' ? css(p) : p)
  }, {})
}
