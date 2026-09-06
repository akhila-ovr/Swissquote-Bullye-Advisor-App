/* @ds-bundle: {"format":4,"namespace":"SwissquoteDesignSystem_0753a7","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"9c07587083aa","components/core/Button.jsx":"411f6069ce2a","components/core/Card.jsx":"41f27d62b704","components/core/IconButton.jsx":"9f546b1f8a24","components/core/Tag.jsx":"3f333c48c9c7","components/feedback/Dialog.jsx":"72c64f856acd","components/feedback/Toast.jsx":"31fb949473f2","components/feedback/Tooltip.jsx":"a22d74b14703","components/forms/Checkbox.jsx":"f07e9a40f980","components/forms/Input.jsx":"48ee7825fa06","components/forms/Radio.jsx":"610578acfed8","components/forms/Select.jsx":"cd8900bf2d03","components/forms/Switch.jsx":"ff8847538f6a","components/navigation/Tabs.jsx":"deff96436cd2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SwissquoteDesignSystem_0753a7 = window.SwissquoteDesignSystem_0753a7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const tones = {
  neutral: {
    background: 'var(--sq-gray-100)',
    color: 'var(--sq-gray-700)'
  },
  positive: {
    background: 'color-mix(in oklch,var(--status-positive) 16%,white)',
    color: 'var(--sq-green-700)'
  },
  negative: {
    background: 'color-mix(in oklch,var(--status-negative) 14%,white)',
    color: 'var(--sq-red-700)'
  },
  brand: {
    background: 'var(--sq-orange-50)',
    color: 'var(--sq-orange-700)'
  }
};
function Badge({
  tone = 'neutral',
  children
}) {
  const t = tones[tone] || tones.neutral;
  return React.createElement('span', {
    style: {
      ...t,
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      display: 'inline-flex',
      alignItems: 'center',
      lineHeight: 1.4
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const sizes = {
  sm: {
    padding: '6px 14px',
    fontSize: 13
  },
  md: {
    padding: '10px 20px',
    fontSize: 14
  },
  lg: {
    padding: '13px 26px',
    fontSize: 15
  }
};
const variants = {
  primary: {
    background: 'var(--brand-primary)',
    color: 'var(--brand-on-primary)',
    border: 'none'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-strong)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: 'none'
  },
  danger: {
    background: 'var(--status-negative)',
    color: '#fff',
    border: 'none'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null,
  children,
  onClick,
  style
}) {
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);
  let background = v.background;
  if (variant === 'primary' && hover && !disabled) background = 'var(--brand-primary-hover)';
  if (variant === 'secondary' && hover && !disabled) background = 'var(--sq-gray-50)';
  if (variant === 'ghost' && hover && !disabled) background = 'var(--sq-gray-50)';
  return React.createElement('button', {
    onClick,
    disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'default' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      transition: 'background var(--duration-fast) var(--ease-standard)',
      opacity: disabled ? 0.45 : 1,
      ...v,
      background,
      ...s,
      ...style
    }
  }, icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  padding = 'var(--space-6)',
  elevated = false,
  style
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: elevated ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      padding,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  label,
  size = 36,
  onClick,
  active = false
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('button', {
    onClick,
    title: label,
    'aria-label': label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-md)',
      border: 'none',
      background: active ? 'var(--sq-gray-100)' : hover ? 'var(--sq-gray-50)' : 'transparent',
      color: 'var(--text-primary)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  onRemove
}) {
  return React.createElement('span', {
    style: {
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
      padding: '4px 8px 4px 10px'
    }
  }, children, onRemove && React.createElement('button', {
    onClick: onRemove,
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--text-tertiary)',
      fontSize: 14,
      lineHeight: 1,
      padding: 0
    }
  }, '\u00d7'));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose,
  actions
}) {
  if (!open) return null;
  return React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-overlay)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)'
    }
  }, React.createElement('div', {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      width: 360,
      padding: 'var(--space-6)'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, React.createElement('h3', {
    style: {
      fontSize: 18,
      fontWeight: 700,
      margin: 0,
      color: 'var(--text-primary)'
    }
  }, title), React.createElement('button', {
    onClick: onClose,
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontSize: 18,
      color: 'var(--text-tertiary)'
    }
  }, '\u00d7')), React.createElement('div', {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginBottom: 20
    }
  }, children), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end'
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const icons = {
  success: 'var(--status-positive)',
  error: 'var(--status-negative)',
  info: 'var(--status-info)'
};
function Toast({
  tone = 'info',
  children,
  onClose
}) {
  return React.createElement('div', {
    style: {
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
      borderLeft: `3px solid ${icons[tone]}`
    }
  }, React.createElement('span', {
    style: {
      flex: 1
    }
  }, children), onClose && React.createElement('button', {
    onClick: onClose,
    style: {
      border: 'none',
      background: 'none',
      color: 'rgba(255,255,255,0.6)',
      cursor: 'pointer',
      fontSize: 14
    }
  }, '\u00d7'));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  children
}) {
  const [show, setShow] = React.useState(false);
  return React.createElement('span', {
    style: {
      position: 'relative',
      display: 'inline-block'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && React.createElement('span', {
    style: {
      position: 'absolute',
      bottom: 'calc(100% + 6px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--surface-inverse)',
      color: '#fff',
      fontSize: 12,
      fontFamily: 'var(--font-sans)',
      padding: '4px 8px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      cursor: 'pointer'
    }
  }, React.createElement('span', {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-sm)',
      border: checked ? 'none' : '1px solid var(--border-strong)',
      background: checked ? 'var(--brand-primary)' : 'transparent',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 12,
      flexShrink: 0
    }
  }, checked ? '\u2713' : ''), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  suffix,
  type = 'text'
}) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)'
    }
  }, label && React.createElement('label', {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, label), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      border: `1px solid ${error ? 'var(--status-negative)' : focus ? 'var(--sq-gray-500)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      background: 'var(--surface-page)',
      transition: 'border-color var(--duration-fast)'
    }
  }, React.createElement('input', {
    type,
    value,
    placeholder,
    onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: '10px 12px',
      fontSize: 14,
      flex: 1,
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)'
    }
  }), suffix && React.createElement('span', {
    style: {
      padding: '0 12px',
      fontSize: 13,
      color: 'var(--text-tertiary)'
    }
  }, suffix)), error && React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--status-negative)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      cursor: 'pointer'
    }
  }, React.createElement('span', {
    onClick: () => onChange && onChange(),
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      border: `1px solid ${checked ? 'var(--brand-primary)' : 'var(--border-strong)'}`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, checked && React.createElement('span', {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--brand-primary)'
    }
  })), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  value,
  options = [],
  onChange
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)'
    }
  }, label && React.createElement('label', {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, label), React.createElement('select', {
    value,
    onChange,
    style: {
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 12px',
      fontSize: 14,
      background: 'var(--surface-page)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)'
    }
  }, options.map(o => React.createElement('option', {
    key: o.value,
    value: o.value
  }, o.label))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  label
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      cursor: 'pointer'
    }
  }, React.createElement('span', {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 36,
      height: 20,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--brand-primary)' : 'var(--sq-gray-300)',
      position: 'relative',
      transition: 'background var(--duration-fast) var(--ease-standard)',
      flexShrink: 0
    }
  }, React.createElement('span', {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--duration-base) var(--ease-standard)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  active,
  onChange
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 24,
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-sans)'
    }
  }, tabs.map(t => React.createElement('button', {
    key: t.value,
    onClick: () => onChange && onChange(t.value),
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: '10px 2px',
      fontSize: 14,
      fontWeight: 600,
      color: active === t.value ? 'var(--text-primary)' : 'var(--text-tertiary)',
      borderBottom: active === t.value ? '2px solid var(--brand-primary)' : '2px solid transparent',
      marginBottom: -1
    }
  }, t.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
