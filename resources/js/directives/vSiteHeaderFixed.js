/* eslint-env browser */
/**
 * Toggles `siteHeader -fixed` on scroll. `binding.value`:
 * - `true` or `{ fixedOverride: true }` — always fixed
 * - number or `{ threshold: n }` — fixed when scrollY > n (default 1)
 */
function apply(el, binding) {
  const v = binding.value
  const forced =
    v === true ||
    (v && typeof v === 'object' && (v.fixedOverride === true || v.force === true))
  const threshold =
    typeof v === 'number'
      ? v
      : v && typeof v === 'object' && typeof v.threshold === 'number'
        ? v.threshold
        : 1
  const y = window.scrollY ?? document.documentElement.scrollTop ?? 0
  el.classList.toggle('-fixed', forced || y > threshold)
}

export default {
  mounted(el, binding) {
    const state = { raf: null, binding, onScroll: null }

    const flush = () => {
      state.raf = null
      apply(el, state.binding)
    }

    state.onScroll = () => {
      if (state.raf != null) {
        return
      }
      state.raf = requestAnimationFrame(flush)
    }

    el._siteHeaderFixed = state
    window.addEventListener('scroll', state.onScroll, { passive: true })
    apply(el, binding)
  },

  updated(el, binding) {
    const state = el._siteHeaderFixed
    if (state) {
      state.binding = binding
      if (state.raf != null) {
        cancelAnimationFrame(state.raf)
        state.raf = null
      }
      apply(el, binding)
    }
  },

  unmounted(el) {
    const state = el._siteHeaderFixed
    if (state?.raf != null) {
      cancelAnimationFrame(state.raf)
    }
    if (state?.onScroll) {
      window.removeEventListener('scroll', state.onScroll)
    }
    delete el._siteHeaderFixed
    el.classList.remove('-fixed')
  },
}
