import { registerScrollHeader, unregisterScrollHeader, updateScrollHeaderBinding } from '../composables/scrollHeaders.js'

/**
 * Registers a site header for shared scroll state (`-active` / `-hidden`).
 * CSS in `siteHeader/index.scss` handles layout and motion.
 *
 * @example v-scroll-header
 * @example v-scroll-header="{ fixedOverride: true }"
 * @example v-scroll-header="{ threshold: 80, delta: 5 }"
 */
export default {
  mounted(el, binding) {
    registerScrollHeader(el, binding)
  },

  updated(el, binding) {
    updateScrollHeaderBinding(el, binding)
  },

  unmounted(el) {
    unregisterScrollHeader(el)
  },
}
