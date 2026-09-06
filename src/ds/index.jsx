/**
 * Swissquote design-system primitives.
 *
 * Faithful React re-implementations of the five components the app actually
 * uses, ported 1:1 from the design-system export bundle
 * (_ds/.../_ds_bundle.js). Re-implemented rather than script-loaded so the app
 * is a normal, buildable React project with no global-window dependency.
 */
import { useState } from 'react'

/* ---------------------------------------------------------------- Badge ---- */
const BADGE_TONES = {
  neutral: { background: 'var(--sq-gray-100)', color: 'var(--sq-gray-700)' },
  positive: { background: 'color-mix(in oklch,var(--status-positive) 16%,white)', color: 'var(--sq-green-700)' },
  negative: { background: 'color-mix(in oklch,var(--status-negative) 14%,white)', color: 'var(--sq-red-700)' },
  brand: { background: 'var(--sq-orange-50)', color: 'var(--sq-orange-700)' },
}

export function Badge({ tone = 'neutral', children }) {
  const t = BADGE_TONES[tone] || BADGE_TONES.neutral
  return (
    <span
      style={{
        ...t,
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        fontWeight: 600,
        padding: '3px 10px',
        borderRadius: 'var(--radius-pill)',
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  )
}

/* --------------------------------------------------------------- Button ---- */
const BTN_SIZES = {
  sm: { padding: '6px 14px', fontSize: 13 },
  md: { padding: '10px 20px', fontSize: 14 },
  lg: { padding: '13px 26px', fontSize: 15 },
}
const BTN_VARIANTS = {
  primary: { background: 'var(--brand-primary)', color: 'var(--brand-on-primary)', border: 'none' },
  secondary: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' },
  ghost: { background: 'transparent', color: 'var(--text-primary)', border: 'none' },
  danger: { background: 'var(--status-negative)', color: '#fff', border: 'none' },
}

export function Button({ variant = 'primary', size = 'md', disabled = false, icon = null, children, onClick, style }) {
  const v = BTN_VARIANTS[variant] || BTN_VARIANTS.primary
  const s = BTN_SIZES[size] || BTN_SIZES.md
  const [hover, setHover] = useState(false)
  let background = v.background
  if (variant === 'primary' && hover && !disabled) background = 'var(--brand-primary-hover)'
  if (variant === 'secondary' && hover && !disabled) background = 'var(--sq-gray-50)'
  if (variant === 'ghost' && hover && !disabled) background = 'var(--sq-gray-50)'
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'default' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'background var(--duration-fast) var(--ease-standard)',
        opacity: disabled ? 0.45 : 1,
        ...v,
        background,
        ...s,
        ...style,
      }}
    >
      {icon}
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ Tag ---- */
export function Tag({ children, onRemove }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-primary)',
        background: 'var(--sq-gray-50)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-sm)',
        padding: '4px 8px 4px 10px',
      }}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: 14, lineHeight: 1, padding: 0 }}
        >
          ×
        </button>
      )}
    </span>
  )
}

/* ---------------------------------------------------------------- Toast ---- */
const TOAST_ACCENT = {
  success: 'var(--status-positive)',
  error: 'var(--status-negative)',
  info: 'var(--status-info)',
}

export function Toast({ tone = 'info', children, onClose }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'var(--surface-inverse)',
        color: '#fff',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        padding: '12px 16px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        borderLeft: `3px solid ${TOAST_ACCENT[tone] || TOAST_ACCENT.info}`,
      }}
    >
      <span style={{ flex: 1 }}>{children}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ border: 'none', background: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 14 }}
        >
          ×
        </button>
      )}
    </div>
  )
}

/* --------------------------------------------------------------- Dialog ---- */
export function Dialog({ open, title, children, onClose, actions }) {
  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--surface-overlay)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans)',
        zIndex: 90,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          width: 320,
          padding: 'var(--space-6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{title}</h3>
          <button
            onClick={onClose}
            style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text-tertiary)' }}
          >
            ×
          </button>
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{children}</div>
        {actions && <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>{actions}</div>}
      </div>
    </div>
  )
}
