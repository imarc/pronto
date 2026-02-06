import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import vue from 'eslint-plugin-vue'
import globals from 'globals'

const vueMacros = {
  defineProps: 'readonly',
  defineEmits: 'readonly',
  defineExpose: 'readonly',
  defineOptions: 'readonly',
  withDefaults: 'readonly',
}

export default [
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...vueMacros,
      },
    },
  },
  eslintConfigPrettier,
  {
    files: ['bin.js', 'vite.config.js', 'vite.config.template.js', 'index.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]
