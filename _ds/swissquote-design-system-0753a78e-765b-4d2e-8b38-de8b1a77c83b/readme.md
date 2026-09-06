# Swissquote Design System

Design system for **Swissquote**, Switzerland's leading online banking and trading group (SIX: SQN, banking license since 2000). Swissquote lets retail and institutional clients trade equities, forex, crypto, and manage banking/investing in one platform, and co-owns the neobank **Yuh**.

## Sources
No Figma file, codebase, or slide deck was attached to this project — only the instruction to build against "the Swissquote Switzerland design system." Everything here is therefore reconstructed from **public brand facts** (brand color, company description, Swiss-finance sector conventions), not from Swissquote's actual internal design system, product code, or a Figma file. There is no real design-system source to link back to.

If you have access to Swissquote's actual brand guidelines, a Figma link, or product codebase, attach it and this system should be rebuilt against it — see Caveats below.

## Caveats — please help iterate
- **No real logo.** No logo file was provided or found accessible for reuse; the Swissquote mark is a registered trademark and was not recreated. Every "brand mark" surface here is plain type reading "Swissquote" — replace with real logo files (SVG) via the Import menu.
- **No real font.** The wordmark/UI likely uses a custom or licensed grotesque (Swissquote's own type or something like Suisse Int'l). We substituted **Inter** (Google Fonts) as the closest freely-available neo-grotesque. Please supply real webfont files if you have them.
- **Colors are approximate.** Primary orange (`#FA5B35`) and graphite gray (`#3F3F3F`) come from third-party brand-color aggregators, not an official style guide — treat as a starting point, not ground truth.
- **No component/screen source.** No Figma or codebase defined a component inventory, so a standard fintech component set was authored from scratch (see Components below), and the UI kit is an original, plausible trading-platform layout — not a pixel copy of swissquote.com or the Swissquote app. Please attach the real product (codebase or Figma) so this can be corrected to match reality.

## Content fundamentals
- **Tone:** confident, precise, low-hype. Finance copy earns trust through clarity, not excitement — no exclamation marks, no emoji.
- **Voice:** direct address ("you"/"your portfolio"), second person, active verbs ("Trade now", "Open an account"). Avoid first-person plural marketing fluff ("we believe...").
- **Casing:** sentence case for headings and buttons ("Open an account", not "Open An Account" or "OPEN AN ACCOUNT"). All-caps reserved for small eyebrow labels/badges only, with wide letter-spacing (`--ls-caps`).
- **Numbers:** always precise and tabular — prices to 2 decimals, percentages with sign (`+1.84%`, `-0.32%`), currency codes before amounts (`CHF 12,480.00`).
- **Emoji:** never used in-product. This is a regulated financial brand; iconography carries meaning instead.
- **Vibe:** competent, Swiss-precise, slightly technical — a platform for people who already know what a limit order is, not a beginner-hand-holding app.

## Visual foundations
- **Color:** one saturated brand color (orange, `--brand-primary`) used sparingly for primary actions and highlights; everything else is white/graphite neutrals. Financial semantic colors (green = gain, red = loss) are used strictly for data, never decoration.
- **Type:** Inter (substitute), sans-serif throughout — headings tight tracking, body relaxed (1.5 line-height). A monospace face (IBM Plex Mono) for tabular price/quantity data so digits align.
- **Backgrounds:** flat white or very light gray (`--surface-sunken`) page backgrounds. No photography-heavy hero treatment, no textures, no patterns, no gradients on surfaces. Dark inverse surface (`--surface-inverse`, near-black not pure black) for toasts, tooltips, and occasional dark-mode-style panels.
- **Animation:** minimal — short (120–180ms), standard-eased fades/color transitions on hover and focus. No bounce, no scale-pop, no spring physics. This is a trading platform; motion should never distract from live data.
- **Hover states:** background darkens one token step (e.g. `--brand-primary` → `--brand-primary-hover`) or a light neutral wash appears behind ghost/secondary buttons. No lightening, no glow.
- **Press/active states:** darkens one step further than hover; no scale/shrink transforms (would feel unstable on a screen showing live prices).
- **Borders:** hairline 1px borders in light gray (`--border-subtle` / `--border-default`) define cards and inputs rather than heavy drop shadows. Focus state adds a 3px soft brand-colored ring (`--shadow-focus`), not a border-color-only change.
- **Shadows:** soft and low-elevation (`--shadow-sm`/`--shadow-md`) for in-flow cards; a stronger shadow (`--shadow-lg`) only for modals/toasts that float above content.
- **Corner radii:** small and consistent — 4px (inputs/tags), 6–10px (cards/dialogs), full pill for badges/switches. Nothing aggressively rounded.
- **Transparency/blur:** used only for the modal scrim (`--surface-overlay`, ~55% black) — no frosted-glass panels elsewhere.
- **Imagery:** none supplied; no stock photography assumed. If/when product photography is added, keep it cool-toned and realistic (no warm lifestyle gradients) to match the precise, technical brand feel.
- **Layout:** dense, grid-aligned, data-forward. Fixed top navigation; content in a max-width container (`--container-max: 1200px`). Tables and lists prioritize scanability (tabular figures, right-aligned numbers) over decoration.

## Iconography
No icon font, SVG sprite, or icon library was supplied with this system. **Substitute:** [Lucide](https://lucide.dev) icons (CDN) are recommended — a neutral, 1.5–2px stroke-weight outline set that matches the precise, non-decorative brand feel described above. This is a substitution, not a confirmed brand asset; flag if Swissquote's real product uses something else (many trading platforms use a proprietary icon set for order-type/asset-class glyphs).
- No emoji in-product (see Content fundamentals).
- No unicode-character icons in real UI; the `×` close glyphs used in this system's own component code are a lightweight implementation detail, not a brand icon convention.
- `assets/` currently has no real logo/icon/illustration files — see Caveats.

## Components
Standard fintech primitive set (no source defined an inventory, so a from-scratch set sized to a trading/banking product was authored — see `components/`):
- **Core** (`components/core/`): Button, IconButton, Card, Badge, Tag
- **Forms** (`components/forms/`): Input, Select, Checkbox, Radio, Switch
- **Navigation** (`components/navigation/`): Tabs
- **Feedback** (`components/feedback/`): Dialog, Tooltip, Toast

## UI kit
`ui_kits/trading-platform/` — an original, plausible desktop trading-platform recreation (login, dashboard/portfolio, instrument/trade ticket, orders/history) built from the visual foundations above. Not a copy of any real Swissquote screen — see Caveats.

## Index
- `styles.css` — root stylesheet, imports everything under `tokens/`
- `tokens/` — colors, typography, spacing, effects (shadows/motion) custom properties
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand)
- `components/` — reusable React primitives, grouped by concern
- `ui_kits/trading-platform/` — full-screen product recreation
- `assets/` — empty; no real logo/icon files were available (see Caveats)
- `thumbnail.html` — homepage tile
- `SKILL.md` — portable skill file for use in Claude Code
