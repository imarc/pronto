# Accessibility Guidelines for Carousel Elements

Please see the [W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) for more detail.

Swiper's web component instance currently contains some, but not all, of the accessibility features needed for carousels.

The rest are added in `PSlider.vue`, but here we are documenting the full requirements for reference when updating older sliders or creating new ones with different libraries.

## Basic Slider — Not Autoplaying

### Main Carousel Container

The element that contains all slides and controls:

- Must have `role="group"` — or `role="region"` if it contains vital page information (e.g. a product slider)
- Must have `aria-roledescription="carousel"`
- Must have `aria-label` or `aria-labelledby` — use `aria-labelledby="headingID"` if the carousel has a primary heading. The label should not contain the word "carousel", as it is already conveyed by `aria-roledescription`

### Direct Wrapper Parent of Slides

- `aria-atomic="false"` — directs the live region to announce only the node that changed, not the entire container
- `aria-live="polite"` — directs the carousel to announce changing slides to screen readers without interrupting ongoing speech

### Slide

- Must have `role="group"`
- Must have `aria-roledescription="slide"`
- Must have `aria-label="index / total slides"` or `aria-labelledby="slide heading ID"`

### Previous Slide / Next Slide Buttons

- Should be native `&lt;button&gt;` elements — if not, must have:
  - `role="button"`
  - `aria-label="Next slide"` / `aria-label="Previous slide"`
- Optional: `aria-controls="ID of the direct wrapper of slides"`

### Pagination Bullet Wrapper

- Must have `role="group"`
- Must have `aria-label="Choose a slide"`

### Pagination Bullets

- Must have `aria-label="Go to slide {index}"` — label must match or contain the corresponding slide label
- The active bullet must have:
  - `aria-current="true"`
  - `aria-disabled="true"` (preferred over the HTML `disabled` attribute, so the button remains in the tab sequence)

> **Note:** Pagination bullets and previous/next slide controls should ideally be `&lt;button&gt;` elements. If they are not, they must have `role="button"` and an `aria-label`. They must be activatable with `Enter` or `Space` and must be reachable via keyboard tab navigation.

## Additional Instructions for Autoplaying Sliders

### Rotation Control (Play/Pause Button)

- Must be the first element within the carousel/slider container
- Should be a native `&lt;button&gt;` element — if not, must have `role="button"`
- Must have an accessible label provided by either its inner text or `aria-label`. The label changes to match the action the button will perform, e.g., "Stop slide rotation" or "Start slide rotation". A label that changes when the button is activated clearly communicates both that slide content can change automatically and when it is doing so. Note that since the label changes, the rotation control does not have any states, e.g., `aria-pressed`, specified.

### Autoplay Behavior

- Autoplay pauses when keyboard focus enters the carousel and does not resume unless the play button is engaged by the user
- Autoplay pauses on mouse hover of the carousel, but may resume when the cursor moves away

### Direct Wrapper Parent of Slides (Autoplaying)

- `aria-live="off"` — while the carousel is autoplaying, suppresses slide change announcements to avoid interrupting the user
- `aria-live="polite"` — updates to `polite` when autoplay is stopped, so slide changes are announced to screen readers without interrupting ongoing speech
