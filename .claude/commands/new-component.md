---
description: Scaffold a new Pronto component — SCSS skeleton, HTML example, layer wiring, and optional Vue SFC
---

# New Pronto Component

Scaffold a new Pronto component. Called as `/new-component [layer] [name]`.

## 1. Parse Arguments

`$ARGUMENTS` contains the raw argument string. Split on whitespace:
- First token = `layer`
- Second token = `name`

Valid layers: `atoms`, `molecules`, `organisms`, `templates`, `pages`, `utilities`

If `layer` is missing or not in the valid list, ask:
> "Which layer? (atoms / molecules / organisms / templates / pages / utilities)"

If `name` is missing, ask:
> "Component name? (camelCase, e.g. myButton)"

Normalize `name` to camelCase if the user types it in another format (e.g. `my-button` → `myButton`, `MyButton` → `myButton`).

Derive `pascalName` from `name` by uppercasing the first letter (e.g. `myButton` → `MyButton`).

## 2. Create SCSS File

Create `resources/styles/<layer>/<name>/index.scss`:

```scss
.<name> {
  $b: &;
}
```

## 3. Create HTML Example File

Create `resources/styles/<layer>/<name>/<name>.html`:

To generate the label, split `name` on uppercase letters, title-case each word, join with spaces (e.g. `myButton` → `My Button`, `heroSection` → `Hero Section`). Call this `label`.

The file content:

```html
<div class="<name>"><label></div>
```

## 4. Wire into Layer Index

Append to `resources/styles/<layer>/index.scss`:

```scss
@forward '<name>';
```

Add it at the end of the file, after all existing `@forward` lines.

## 5. Optional Vue Component

Ask the user:
> "Add a Vue component? (y/n)"

If yes:

**Create `resources/js/components/<pascalName>.vue`:**

```vue
<template>
  <div class="<name>">
    <slot />
  </div>
</template>

<script setup>
</script>
```

**Register in `resources/js/index.js`** by adding a new line inside the `components: {` block:

```js
<pascalName>: defineAsyncComponent(() => import('./components/<pascalName>.vue')),
```

Add it after the last existing component entry, before the closing `},` of the `components` object.
