# Pronto

Use this skill when working in a project that has copied Pronto components or uses the Pronto/Vitrine tooling.

## Overview

Pronto is a package of front-end components built by Imarc. Pronto components are built to be changed over configured, with an emphasis on code being simple to read and adapt to individual project needs.

Documentation: https://imarc-pronto.netlify.app/components/overview/

## Architecture

Pronto is a Vue 3 + Vite frontend framework with a component library, built for copying into projects instead of configuring from `node_modules`. It uses **Vitrine** (`@imarc/vitrine`) as a component documentation server. `npm run dev` launches the Vitrine UI, which reads HTML examples from component folders.

Build entrypoints are usually `resources/styles/index.scss` and `resources/js/index.js`. CSS is imported from JS using the Vite convention.

Vue components load asynchronously via `defineAsyncComponent`. The Vue app mounts to `#app`.

## Commands

Most Pronto projects should have the Pronto/Vitrine tooling installed. When available, use:

```bash
npm install       # install dependencies
npm run dev       # start Vitrine dev server
npm run build     # production build
npm run lint      # check formatting + lint, no changes
npm run lint:fix  # auto-fix formatting + lint
```

Node >= 24 is required for Pronto itself. Consuming projects should follow their own `package.json` engine requirements if they differ.

## Principles

Components should be accessible and use semantic tags. Prefer simple code that is easy to change over configuration.

Components should extend and work with native browser functionality instead of recreating it. Prefer CSS animations, `dialog`, `popover`, and the anchor API where appropriate. Avoid unthrottled JavaScript, including intervals and high-volume events like `resize`.

## SCSS Structure

`resources/styles/` follows Atomic Design:

- `atoms/` contains buttons, inputs, labels, and icons.
- `molecules/` contains cards, form fields, and navigation.
- `organisms/` contains headers, footers, page sections, and sliders.
- `utilities/` contains helpers such as container, colors, and srOnly.
- `config/` contains Pronto CSS custom property configuration.
- `core/` contains mixins, functions, and shared properties.

Each component lives in its own folder with `index.scss` and a `componentName.html` Vitrine example file.

## Naming

Use ABEM conventions:

```scss
.blockName .-blockModifier
.blockName .-blockModifier .-blockModifier-modifierValue
.blockName__elementName .-elementModifier
```

Use these custom property conventions:

- Root: `--root-property-name`
- Overrideable: `--property-name`
- Component-private: `--componentName-property-name`

## JavaScript Structure

`resources/js/` usually contains:

- `components/` for Vue components. Pronto's own components are prefixed with `P`, such as `PAccordion`, `POpenable`, and `PTabs`. Project-specific components should not use the `P` prefix.
- `composables/` for shared Vue composables.
- `directives/` for Vue directives, named in lowerCamelCase and prefixed with `v`, such as `vScrolllock` and `vDirectionals`.

Use `const` instead of the `function` keyword for function definitions.

## Adding a Component

When available, use the `/new-component` command for component creation.

Otherwise:

1. Create `resources/styles/<layer>/<componentName>/index.scss`.
2. Create `resources/styles/<layer>/<componentName>/<componentName>.html` as the Vitrine example.
3. Add an `@forward` reference to the layer's `index.scss`.

Vue components go in `resources/js/components/` and must be registered in `resources/js/index.js`.
