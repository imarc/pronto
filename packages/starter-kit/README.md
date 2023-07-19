
# Component Library: Starter Kit

A light, customizable frontend starter kit for the Imarc Component Library.


## Installation

Install with NPM

```bash
  npm i @imarc/component-library-starter-kit
```

To clone assets (js, scss) and vite.config.js files directly into current folder structure:

```bash
  npx component-library-starter-kit
```

### Styles

To import just the compiled CSS into CSS or SCSS:

__SCSS__

```bash
    @use '@imarc/component-library-starter-kit/dist/main.css' as *;
```

__CSS__

```bash
    @import '@imarc/component-library-starter-kit/dist/main.css' as *;
```