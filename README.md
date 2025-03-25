
# Pronto

Pronto is a package of front-end components built by Imarc. The components in Pronto are built to be changed over configured, with an emphasis on the code being simple to read and adapt to individual project needs.

Pronto uses Vite and Vitrine to provide a library of its components, viewable at https://imarc-pronto.netlify.app/components/

Goals
-----

### Accessibility

Components within Pronto should be accessible and promote accessible development. Tags should be semantic.

### Built to Change

CSS should be built primarily to be changed. In general, favor simple code over configuration through custom properties. JS components should be built to be style and layout agnostic, focused on extending and working with builtin browser functionality instead of recreating it. For example, prefer CSS animations, native dialog and popover behaviors. Avoid running JS unthrottled, whether through intervals or high volume events like resize.

### Developer Experience

When making decisions, prefer the option that will be easier to for new developers to read and understand. If there is good reason to use a more complicated approach, make sure the approach and its justification are well documented.


Structure
---------

Contributing
------------
