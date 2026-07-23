# Pronto

Pronto is a package of front-end components built by Imarc. The components in Pronto are built to be changed over configured, with an emphasis on the code being simple to read and adapt to individual project needs.

For documentation, see https://imarc-pronto.netlify.app/components/overview/

## Installation

To install Pronto into your project, you can run:

```
npx @imarc/pronto@latest
```

### Advanced, non-interactive installation

There is a non-interactive way to install pronto that works, but you should expect changes in future versions:

```
npx @imarc/pronto@latest --non-interactive <copy components> <copy path> <add dependency> <create vite.config.js> <copy sprite sheet> <sprite sheet path> <copy agent files>
```

Other than `<copy path>` and `<sprite sheet path>`, each argument should be `y` or `n`, and correspond to the interactive prompts.

## Contributing

Pronto is being developed as an open source project and welcomes contributions. Please read through Pronto's goals before contributing. We will be judicious about adding new dependencies to Pronto, however Pronto may leverage Vue, Vite, and Pinia.

### Working on Pronto

#### Node.js (mise)

This project pins the **Node.js** version with [**mise**](https://mise.jdx.dev/) (see `.mise.toml` at the repo root). That keeps everyone on a version compatible with `package.json` `engines.node`.

**First time on your machine (one-time):**

1. **Install the mise CLI.** The usual command is:
   ```bash
   curl https://mise.run | sh
   ```
   That installs `mise` under `~/.local/bin` (see [other install options](https://mise.jdx.dev/installing-mise.html) — Homebrew, etc.). It is **not** a zsh-specific URL; you do not run `curl …/zsh | sh`.
2. **Hook mise into your shell** so `mise` and the right `node` are on your `PATH` in every terminal. Follow [Activate mise](https://mise.jdx.dev/getting-started.html#activate-mise) for your shell — for **zsh**, add this to `~/.zshrc` (or run the command the installer prints at the end of step 1):
   ```bash
   eval "$(~/.local/bin/mise activate zsh)"
   ```
   Open a **new terminal tab/window** (or run `source ~/.zshrc`) so the change applies. Run **`mise doctor`** if you want to confirm the setup.

**Every clone / after pulling `.mise.toml` changes:**

3. From the project directory, run **`mise install`** to install the pinned Node version if needed. The first time you use this project’s config, mise may ask you to **[trust](https://mise.jdx.dev/cli/trust.html)** `.mise.toml` — that is expected.
4. Run **`npm install`** and other npm scripts as usual.

If you choose not to use mise, install a Node version that satisfies `engines.node` in `package.json` by other means (for example, your system package manager or another version manager).

#### Getting started

The recommended way to work on Pronto is to work within Vitrine after cloning Pronto:

1. Clone Pronto to a folder of your choosing.
2. From the project directory, run `mise install` (see [Node.js (mise)](#nodejs-mise) above), then `npm install` and `npm run dev`.
3. Make sure to check any functional changes to Vitrine or Pronto also work properly with the build step `npm run prod` as well.

#### Formatting and linting

Formatting is handled by Prettier, while ESLint and Stylelint focus on linting. Use these commands during development:

- `npm run lint` checks Prettier formatting without making changes, then runs ESLint and Stylelint.
- `npm run lint:fix` tries to fix the code to match Prettier formatting, then runs ESLint and Stylelint.
