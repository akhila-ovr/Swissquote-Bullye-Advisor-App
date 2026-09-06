# Bullyee - Financial Advisor

A gentle, non-pushy financial-advisor concept for Swissquote, built for the
**Swissquote Wave Fellowship Challenge 2026**. Bullyee 🐂 sends a plain-language
weekly letter, runs a daily quiz, remembers what matters to you, and nudges you
toward a Swiss pillar 3a - without the hard sell.

This is a **React + Vite** single-page app. It was ported from the interactive
design prototype in `Bullyee Financial Advisor.dc.html`.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

## Build a production bundle

```bash
npm run build     # outputs static files to dist/
npm run preview   # serve dist/ locally to check it
```

## Project layout

```
index.html              Vite entry
src/
  main.jsx              React bootstrap
  App.jsx               route + state + handlers + view-model (ported from the .dc.html class)
  entry.jsx             entry screen, onboarding questionnaire, solution explainer
  screens.jsx           Home / Letter / Profile / Notifications / 3a screens
  overlays.jsx          phone chrome, chat drawer, bottom sheets, toast, dialog
  data.js               all copy: onboarding steps, quiz, glossary, notifications, rewards
  ds/index.jsx          Swissquote design-system primitives (Button, Badge, Tag, Toast, Dialog)
  components/
    BullyeAvatar.jsx    the mascot SVG
  lib/css.js            helper: CSS string -> React style object
  styles/
    tokens.css          Swissquote design tokens (colours, type, spacing, effects)
    global.css          app shell + responsive phone frame
```

## Flow

`entry` -> `onboarding` (7 questions, or Skip) -> `app`. The entry screen also
opens `explainer`, a scrollable write-up of the research and design thinking.
Onboarding answers land in a `profile` that personalises the app: the greeting
name, the weekly-letter tone, the 3a strategy label, and the Profile tab.

