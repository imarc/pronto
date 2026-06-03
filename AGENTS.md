# AGENTS.md

## Architecture

Pronto is a Vue 3 + Vite frontend framework with component library, built for copying into projects (not configuring). It uses **Vitrine** (`@imarc/vitrine`) as a component documentation server — `npm run dev` launches the Vitrine UI, which reads HTML examples from component folders.

Build entrypoints: `resources/styles/index.scss` and `resources/js/index.js`. CSS is imported from JS (Vite convention).

Vue components load asynchronously via `defineAsyncComponent`. The Vue app mounts to `#app`.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vitrine dev server
npm run build     # production build
npm run lint      # check formatting + lint (no changes)
npm run lint:fix  # auto-fix formatting + lint
```

Node >= 24 required.

## Principles

Components should be accessible and use semantic tags. Prefer simple code that is easy to change over configuration. Components should aim to extend and work with native browser functionality instead of recreating it: prefer CSS animations, dialog, popover, anchor API. No unthrottled JS.


## SCSS Structure

`resources/styles/` follows Atomic Design:

- `atoms/` — buttons, inputs, labels, icons
- `molecules/` — cards, form fields, navigation
- `organisms/` — headers, footers, page sections, sliders
- `utilities/` — container, colors, srOnly
- `config/` — Pronto CSS custom property configuration
- `core/` — mixins, functions, shared properties

Each component lives in its own folder with `index.scss` + a `componentName.html` example file.

### Naming

ABEM conventions:

```
.blockName .-blockModifier
.blockName .-blockModifier .-blockModifier-modifierValue
.blockName__elementName .-elementModifier
```

Custom property conventions:
- Root: `--root-property-name`
- Overrideable: `--property-name`
- Component-private: `--componentName-property-name`

## JS Structure

`resources/js/` contains:
- `components/` — Vue components. Pronto's own components prefixed with `P` (e.g. `PAccordion`, `POpenable`, `PTabs`), do not prefix other components with `P`.
- `composables/` — shared Vue composables
- `directives/` — Vue directives, named in `lowerCamelCase` prefixed with `v` (e.g. `vScrolllock`, `vDirectionals`)

Use `const` instead of `function` keyword for function definitions.

## Adding a Component

When available, use the /new-component command for component creation.

1. Create `resources/styles/<layer>/<componentName>/index.scss`
2. Create `resources/styles/<layer>/<componentName>/<componentName>.html` (Vitrine example)
3. Add `@forward` reference to the layer's `index.scss`

Vue components go in `resources/js/components/` and must be registered in `resources/js/index.js`.
