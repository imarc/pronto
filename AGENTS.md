# AGENTS.md

## Project

Pronto is a package of front-end components built by Imarc. The components in Pronto are built to be changed over configured, with an emphasis on the code being simple to read and adapt to individual project needs.

Documentation: https://pronto.imarc.com/components/Overview/

Components: https://pronto.imarc.com/components/

## Architecture

Pronto is a Vue 3 + Vite frontend framework with a component library, built for copying into projects instead of configuring from `node_modules`. It uses **Vitrine** (`@imarc/vitrine`) as a component documentation server. `npm run dev` launches the Vitrine UI, which reads HTML examples from component folders.

Build entrypoints: `resources/styles/index.scss` and `resources/js/index.js`. CSS is imported from JS (Vite convention).

Vue components load asynchronously via `defineAsyncComponent`. The Vue app mounts to `#app`.

## Pronto Skill

Reusable Pronto usage guidance lives in `.agents/skills/pronto/SKILL.md`. Use that skill when working on components, SCSS/JS conventions, Vitrine examples, or guidance intended to be copied into consuming projects.

## Installation Flow

The package installer is exposed through `bin.js` and can be run with:

```bash
npx @imarc/pronto@latest
```

There is also a non-interactive installation mode. Expect this interface to change in future versions:

```bash
npx @imarc/pronto@latest --non-interactive <copy components> <copy path> <add dependency> <create vite.config.js> <copy sprite sheet> <sprite sheet path> <copy agent files>
```

Other than `<copy path>` and `<sprite sheet path>`, each argument should be `y` or `n`, and correspond to the interactive prompts.

Agent-facing Pronto usage guidance should live under `.agents/`, with reusable Pronto usage instructions in `.agents/skills/pronto/SKILL.md`. Installer work should offer to copy relevant `.agents/` content into the parent project rather than depending on agents reading inside `node_modules`.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vitrine dev server
npm run build     # production build
npm run lint      # check formatting + lint (no changes)
npm run lint:fix  # auto-fix formatting + lint
```

Node >= 24 required.

The recommended development workflow is to work within Vitrine after cloning Pronto. Run `npm install`, run `npm run dev`, and verify functional changes with `npm run build` before considering them done. `npm run prod` is an alias for `npm run build`.

Formatting is handled by Prettier, while ESLint and Stylelint focus on linting. Use `npm run lint` to check formatting and linting without changes, and `npm run lint:fix` to apply automatic fixes.

## Contributing

Pronto is developed as an open source project and welcomes contributions. Be judicious about adding new dependencies. Pronto may leverage Vue, Vite, and Pinia, but new dependencies should have a clear maintainability or functionality benefit.
