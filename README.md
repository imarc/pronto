
# Pronto Kit

A light, customizable frontend starter kit for the Imarc Component Library.


## Installation
Note, you may need to update the `outDir` property in the vite build config depending on what your project's webroot is. 

### Command
```bash
  npx pronto-kit
```

### Gitignore
Add the following to your gitignore.
```
node_modules
{webroot}/dist
```

### Icons
`main-icons-sprite.svg` Will also be copied over to your base directory. How this needs to be included may differ based on a particular CMS or project. As long as the svg sheet is included in the base template right after the opening `<body>` tag, it should work just fine.
