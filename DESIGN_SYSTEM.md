# Design System Compliance Report

This project follows established design system principles to ensure consistent,
accessible UI. Below is a breakdown of how each principle is applied.

## Design Tokens

All colours, spacing, typography, radii, shadows, and animation values are
defined as CSS custom properties in `:root` — no hardcoded values anywhere in
the component CSS.

**Semantic naming over raw values:**

```css
/* Good — semantic tokens referencing the palette */
--color-link:          var(--color-brown);
--color-pill-bg:       var(--color-light);
--color-pill-bg-hover: var(--color-slate);
--color-focus:         var(--color-green);
```

```css
/* Bad — this pattern never appears in the codebase */
color: #486791;
background: #e0e8ed;
```

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

- [x] **Uses design tokens, not hardcoded values** — every colour, spacing,
      font size, radius, shadow, and animation duration references a `--` token
- [x] **Supports reduced motion** — `@media (prefers-reduced-motion: reduce)`
      disables all animations and transitions
- [x] **Has consistent spacing with siblings** — all components use the same
      `--space-*` scale
- [x] **Typography matches the established scale** — all text uses
      `--font-size-*` tokens
- [x] **Interactive states (hover, focus, active, disabled)** — tabs have
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
handles overflow, the panels handle content, and the tabs handle navigation.
