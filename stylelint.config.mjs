/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    'alpha-value-notation': 'number',
    'color-hex-length': 'long',
    'custom-property-pattern': null,
    'container-name-pattern': '^(?:#\{[^}]+\}|[a-z][a-z0-9-]*)$',
    'selector-class-pattern': '^-?[a-z][a-zA-Z0-9]*(__[a-zA-Z0-9]+)?(-[a-zA-Z0-9]+)*$',
    'scss/at-extend-no-missing-placeholder': null,
  },
}
