# Design: `/new-component` Slash Command

## Summary

A local Claude Code slash command (`.claude/commands/new-component.md`) that scaffolds a new Pronto component, wires it into its layer's index, and optionally creates a Vue component.

## Invocation

```
/new-component [layer] [name]
```

- `layer` — one of: `atoms`, `molecules`, `organisms`, `templates`, `pages`, `utilities`
- `name` — camelCase component name (e.g. `myButton`, `heroSection`)

If either arg is missing, Claude asks interactively before proceeding. Invalid layer triggers re-prompt. Name is normalized to camelCase if needed.

## Files Created / Modified

Given `/new-component atoms myButton`:

### Created

**`resources/styles/atoms/myButton/index.scss`**
```scss
.myButton {
  $b: &;
}
```

**`resources/styles/atoms/myButton/myButton.html`**
```html
<button class="myButton">My Button</button>
```

### Modified

**`resources/styles/atoms/index.scss`** — appends:
```scss
@forward 'myButton';
```

### Optional Vue Component

Claude asks: *"Add a Vue component too? (y/n)"*

If yes:
- Creates `resources/js/components/PMyButton.vue` with minimal single-file component skeleton
- Registers it in `resources/js/index.js` via `defineAsyncComponent`

## Implementation

Single file: `.claude/commands/new-component.md`

Plain-language instructions telling Claude to:
1. Parse `$ARGUMENTS` for layer and name
2. Ask for any missing values, validate layer against the allowed list
3. Write the three files above
4. Append the `@forward` line to the layer's `index.scss`
5. Ask about Vue component, scaffold if confirmed
