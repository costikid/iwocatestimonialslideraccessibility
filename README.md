# iwoca Testimonial Slider — Keyboard Accessibility Fix | Costanza C, Front-End Engineer

A case study and live demo showing how to make the **iwoca testimonial slider**
fully keyboard-accessible by replacing the original Slick slider `<div>` markup
with the [WAI-ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

Built in plain HTML/CSS/JS — no frameworks, no build step.

## The accessibility problem

The original iwoca slider used the **Slick slider** jQuery library. The topic
buttons ("Purchasing equipment", "Pay a due bill", etc.) were plain `<div>`
elements with `tabindex="0"` on every item — no ARIA roles, no `aria-selected`,
no `aria-controls`, and no `keydown` handler. This meant:

- Keyboard users could not navigate between slides with arrow keys
- Screen reader users had no indication of which slide was active
- Every button was in the Tab order, requiring excessive Tab presses

## The fix: WAI-ARIA Tabs pattern

- Every topic control is a real `<button>` (not a `<div>`), so it's natively
  focusable and works with click, Enter, and Space with zero extra code.
- The group is marked up as `role="tablist"` / `role="tab"` / `role="tabpanel"`,
  and each tab has `aria-selected` + `aria-controls` pointing at its panel, so
  screen reader users hear "tab, 2 of 4, selected" instead of silence.
- **Roving tabindex**: only the active tab has `tabindex="0"`; the rest are
  `tabindex="-1"`. That means one `Tab` key press lands you in the group, and
  from there `←`/`→` (or `Home`/`End`) flip through all four topics — you never
  have to `Tab` through each button individually.
- Arrow keys work from both the tab buttons and the card panel itself.

## Keywords

iwoca, web accessibility, ARIA tabs, keyboard navigation, testimonial slider,
WAI-ARIA, roving tabindex, Slick slider accessibility fix, screen reader,
WCAG, front-end engineer

## Live demo

Hosted on GitHub Pages: https://costikid.github.io/iwocatestimonialslideraccessibility/



