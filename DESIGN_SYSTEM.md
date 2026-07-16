# Design System Compliance Report

This project follows established design system principles to ensure consistent,
accessible UI. Below is a breakdown of how each principle is applied.

## Design Tokens

All colours, spacing, typography, radii, shadows, and animation values are
defined as CSS custom properties in `:root`. The vast majority of the stylesheet
references these tokens — a small number of hardcoded values remain where CSS
custom properties cannot express the value (e.g. alpha-channel tinted backgrounds,
decorative border widths on the pointer triangle).

**Semantic naming over raw values:**

```css
/* Good — semantic tokens referencing the palette */
--color-link:          var(--color-brown);
--color-pill-bg:       var(--color-light);
--color-pill-bg-hover: var(--color-slate);
--color-focus:         var(--color-green);
```

```css
/* Avoid — raw hex appears only in the palette layer */
color: #486791;
background: #e0e8ed;
```

A few properties use hardcoded `rgba()` values where a token-derived colour
needs an alpha channel — for example the tinted backgrounds on the problem and
solution blocks (`rgba(249, 89, 80, 0.06)`, `rgba(42, 154, 111, 0.06)`) and the
pointer drop-shadow. These are the raw RGB equivalents of `--color-red` and
`--color-green` with opacity applied, which CSS custom properties cannot express
without `color-mix()` or relative colour syntax.

The palette layer (`--color-navy`, `--color-red`, `--color-slate`, etc.) is
separated from the semantic layer (`--color-link`, `--color-pill-bg`,
`--color-focus`), so a theme change only requires updating the palette tokens.

## Spacing Scale

A 2px base scale is used consistently throughout, defined as `--space-*` tokens:

| Token | Value | Example usage |
|-------|-------|---------------|
| `--space-2` | 4px | Small gaps, list item spacing |
| `--space-4` | 8px | Code block padding, bullet margins |
| `--space-8` | 16px | Card padding, section gaps |
| `--space-12` | 24px | Code block padding, grid gaps |
| `--space-20` | 40px | Hero padding, section margins |
| `--space-24` | 48px | Page padding, large section gaps |
| `--space-40` | 80px | Hero top padding |

Every `margin`, `padding`, and `gap` in the stylesheet references one of these
tokens — no magic numbers.

## Typography Scale

A 13-step type scale is defined as `--font-size-*` tokens, from `xs` (13px) to
`8xl` (48px):

| Token | Value | Usage |
|-------|-------|-------|
| `--font-size-xs` | 13px | Code block text, footer |
| `--font-size-sm` | 14px | Nav links, code labels |
| `--font-size-base` | 15px | Body text, tab labels |
| `--font-size-md` | 16px | Case study body, captions |
| `--font-size-xl` | 18px | Section intros, card headings |
| `--font-size-2xl` | 20px | Quote text, nav brand |
| `--font-size-6xl` | 32px | Section titles |
| `--font-size-8xl` | 48px | Hero title |

Three font families are tokenised: `--font-body` (Public Sans),
`--font-serif` (Georgia), and `--font-mono` (SF Mono).

## Colour Usage

Colours are split into a palette layer (raw hex values) and a semantic layer
(meaning-based aliases). Components primarily reference the semantic layer,
though a few use palette tokens directly where no semantic alias exists (e.g.
`--color-navy` for code block backgrounds, `--color-light` for the active tab
border).

| Purpose | Token | Value |
|---------|-------|-------|
| Headings, quote text | `--color-navy` | `#0b182a` |
| Body text, author name | `--color-slate` | `#486791` |
| Accent (quote mark, icons) | `--color-red` | `#f95950` |
| Focus ring | `--color-focus` → `--color-green` | `#2a9a6f` |
| Pill background | `--color-pill-bg` → `--color-light` | `#e0e8ed` |
| Pill hover | `--color-pill-bg-hover` → `--color-slate` | `#486791` |
| Links | `--color-link` → `--color-brown` | `#8a5f4d` |
| Card surface | `--color-white` | `#FFFFFF` |

## Component Checklist

- [x] **Uses design tokens, not hardcoded values** — the vast majority of
      colours, spacing, font sizes, radii, shadows, and animation durations
      reference a `--` token; a small number of hardcoded `rgba()` values remain
      where alpha channels are needed
- [x] **Supports reduced motion** — `@media (prefers-reduced-motion: reduce)`
      disables all animations and transitions
- [x] **Has consistent spacing with siblings** — all components use the same
      `--space-*` scale
- [x] **Typography matches the established scale** — all text uses
      `--font-size-*` tokens
- [x] **Interactive states (hover, focus, active, selected)** — tabs have
      `:hover`, `:active`, `[aria-selected]`, and `:focus-visible` states;
      focus ring uses `--color-focus` with 3px outline
- [x] **Follows existing naming conventions** — BEM-style class names
      (`.topic-tab`, `.topic-tab__icon`, `.topic-tab--active`)

## Composition Pattern

The slider uses a composition approach rather than a monolithic component:

```html
<div class="testimonial-slider">
  <div class="slider-card">
    <div class="slider-viewport">
      <article class="slide-panel">…</article>
    </div>
    <span class="slider-pointer"></span>
  </div>
  <div class="topic-tabs" role="tablist">
    <button class="topic-tab">…</button>
  </div>
</div>
```

Each layer has a single responsibility — the card handles layout, the viewport
uses `min-width: 0` to prevent flex blowout, the panels handle content, and the
tabs handle navigation.
