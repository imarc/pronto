# Pronto

Pronto is a front-end framework.

## File Structure

Pronto's code is organized within a resources/ directory into styles/ and js/. Styles contains CSS/SCSS-only components, organized following a Atomic Design metholodogy:

* styles/atoms/ - Atoms, the smallest components. They should not depend on other components.
* styles/molecules/ - Molecules, components that should only depend on Atoms.
* styles/organisms/ - Organisms, components that can depend on atoms and molecules. These often represent a full slice across the page.
* styles/templates/ - Templates are used for styles for overall layout across multiple pages.
* styles/pages/ - Pages are used for styles that are page specific.
* styles/config/ - Config contains CSS/SCSS properties and variables to configure the starting look of Pronto.
* styles/utilities/ - Utilities are for utility classes or components that don't align with the Atomic Design metholodogy.
* styles/imported/ - Imported is code that is meant to be imported into your project.

Pronto uses SCSS files for all styles, and using ABEM for class naming:
```
.blockName.-blockModifier
.blockName__elementName
.blockName__elementName.-elementModifier
.-modifierName.-modifierName-modifierValue
```

### Custom Properties

Custom property names should use the following naming convention:
```
--prefix-property-name-suffix
```

* Root level custom properties are prefixed with `--root-` and are not meant to overridden by components.
* Properties that are meant to be overridden should be unprefixed (like `--accent-color`, `--gap`, `--size`)
* Private, component specific properties should be prefixed with the component name in kebab-case.

### Component Structure

Each component should have its own directory with the primary component styles within index.scss. Components can use separate SCSS files for variants or modifiers when appropriate. Also within these directories, should be examples of the markup (for Vitrine) that demonstrate how to use the component.
