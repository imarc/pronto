/* eslint-env browser */
/**
 * Toggles `-active` on `-fixed` headers and `-hidden` on `-hideOnScroll` headers.
 * CSS in `siteHeader/index.scss` owns layout and motion.
 */
const headers = new Set()
let lastY = 0
let listening = false
let raf = null

const scrollY = () => window.scrollY ?? document.documentElement.scrollTop ?? 0

const hasOpenMenu = el => el.querySelector('.navigation__dropdown, .mobileNavigation__pane') != null

const parseBinding = binding => {
  if (binding?.value != null && typeof binding.value === 'object') {
    return binding.value
  }

  if (binding?.value === true) {
    return { fixedOverride: true }
  }

  return {}
}

const bindingFor = el => el._scrollHeaderBinding ?? {}

const applyHeader = (el, y) => {
  const v = bindingFor(el)
  const threshold = typeof v.threshold === 'number' ? v.threshold : 1
  const delta = typeof v.delta === 'number' ? v.delta : 5
  const forced = v.fixedOverride === true || v.force === true

  if (el.classList.contains('-hideOnScroll')) {
    if (y <= threshold || hasOpenMenu(el)) {
      el.classList.remove('-hidden')
      return
    }

    let hidden = el.classList.contains('-hidden')
    if (y > lastY + delta) {
      hidden = true
    } else if (y < lastY - delta) {
      hidden = false
    }

    el.classList.toggle('-hidden', hidden)
    return
  }

  if (el.classList.contains('-fixed')) {
    el.classList.toggle('-active', forced || y > threshold)
  }
}

const flush = () => {
  raf = null
  const y = scrollY()
  headers.forEach(el => applyHeader(el, y))
  lastY = y
}

const onScroll = () => {
  if (raf != null) {
    return
  }
  raf = requestAnimationFrame(flush)
}

const ensureListening = () => {
  if (!listening) {
    listening = true
    window.addEventListener('scroll', onScroll, { passive: true })
  }
}

export const registerScrollHeader = (el, binding) => {
  el._scrollHeaderBinding = parseBinding(binding)
  headers.add(el)
  ensureListening()
  flush()
}

export const updateScrollHeaderBinding = (el, binding) => {
  el._scrollHeaderBinding = parseBinding(binding)
  flush()
}

export const unregisterScrollHeader = el => {
  headers.delete(el)
  delete el._scrollHeaderBinding
  el.classList.remove('-active', '-hidden')

  if (headers.size === 0 && listening) {
    window.removeEventListener('scroll', onScroll)
    listening = false
  }
}
