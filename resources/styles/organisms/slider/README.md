# Accessibility Guidelines for PSlider

Please see the [W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) for more detail. We also have full guidelines for carousel attributes and functionality in [Outline](https://imarc.getoutline.com/doc/carousel-accessibility-SB2GKM2wJt).

`PSlider` wraps Swiper's `swiper-container` web component. Swiper's a11y module is enabled by default and handles most carousel accessibility automatically. `PSlider` configures the remaining Swiper options and adds a few attributes Swiper does not support.

## Swiper a11y Options

These are the configurable options Swiper's a11y module provides. On `<p-slider>`, they are passed as `a11y-*` kebab-case attributes (e.g. `a11y-prev-slide-message="Go back"`). Options configured by `PSlider` should not be overridden on individual carousels.

- `a11y-enabled` — Swiper default: `true`
- `a11y-container-role` — Swiper default: none; PSlider default: `"group"`
- `a11y-container-role-description-message` — Swiper default: none; PSlider default: `"carousel"`
- `a11y-container-message` — Swiper default: none; PSlider: set from `ariaLabel` prop
- `a11y-item-role-description-message` — Swiper default: none; PSlider default: `"slide"`
- `a11y-slide-role` — Swiper default: `"group"`
- `a11y-slide-label-message` — Swiper default: `"{{index}} / {{slidesLength}}"`
- `a11y-prev-slide-message` — Swiper default: `"Previous slide"`
- `a11y-next-slide-message` — Swiper default: `"Next slide"`
- `a11y-first-slide-message` — Swiper default: `"This is the first slide"`
- `a11y-last-slide-message` — Swiper default: `"This is the last slide"`
- `a11y-pagination-bullet-message` — Swiper default: `"Go to slide {{index}}"`
- `a11y-id` — Swiper default: none (auto-generated on the slide wrapper)
- `a11y-scroll-on-focus` — Swiper default: `true`

## Using PSlider

### Required

- `aria-label` or `aria-labelledby` — every carousel must have an accessible name. Use `aria-labelledby` if the carousel has a primary heading — see `testimonialSlider.html`. Use `aria-label` if there is no heading — see `slider.html`. The label should not contain the word "carousel", as it is already conveyed by `aria-roledescription`.
- `navigation="true"` — required for prev/next controls
- `pagination-clickable="true"` — required for pagination bullets

### Autoplaying Sliders

- `autoplay` prop — enables the play/pause button, focus-pause behavior, and `aria-live` management
- `pauseOnMouseEnter: true` in the autoplay config — see `slider--autoplaying.html` for a full example


`:autoplay="{ speed: 500, pauseOnMouseEnter: true }"`

