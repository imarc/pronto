# `/new-component` Command Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a local Claude Code slash command that scaffolds a Pronto component (SCSS skeleton, HTML example, layer wiring, and optional Vue SFC).

**Architecture:** Single `.claude/commands/new-component.md` file with natural-language instructions Claude follows at invocation time. No scripts, no templates — Claude uses its own Write/Edit tools to create files.

**Tech Stack:** Claude Code slash commands (local), SCSS, Vue 3 SFC

---

### Task 1: Create the command file

**Files:**
- Create: `.claude/commands/new-component.md`

- [ ] **Step 1: Create `.claude/commands/` directory and write the command file**

Create `.claude/commands/new-component.md` with this exact content:

````markdown
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

```html
<div class="<name>"><name></div>
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
````

- [ ] **Step 2: Verify the file exists and has correct frontmatter**

Run:
```bash
head -5 .claude/commands/new-component.md
```
Expected output:
```
---
description: Scaffold a new Pronto component — SCSS skeleton, HTML example, layer wiring, and optional Vue SFC
---
```

- [ ] **Step 3: Smoke-test the command**

Run `/new-component atoms testWidget` and verify:
- `resources/styles/atoms/testWidget/index.scss` exists with `.testWidget { $b: &; }`
- `resources/styles/atoms/testWidget/testWidget.html` exists with `<div class="testWidget">testWidget</div>`
- `resources/styles/atoms/index.scss` ends with `@forward 'testWidget';`

Then answer `y` to the Vue prompt and verify:
- `resources/js/components/TestWidget.vue` exists
- `resources/js/index.js` contains `TestWidget: defineAsyncComponent(() => import('./components/TestWidget.vue')),`

- [ ] **Step 4: Clean up test component**

Remove the test files added during smoke test:
```bash
rm -rf resources/styles/atoms/testWidget resources/js/components/TestWidget.vue
git checkout resources/styles/atoms/index.scss resources/js/index.js
```

- [ ] **Step 5: Commit**

```bash
git add .claude/commands/new-component.md
git commit -m "feat: add /new-component slash command"
```
