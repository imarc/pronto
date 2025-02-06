<script>
import { h, onMounted, ref } from 'vue'

const handleToggle = (event) => {
  const el = event.currentTarget
  const duration = parseFloat(getComputedStyle(el).transitionDuration) * 1000
  const summary = el.querySelector('summary:first-of-type')
  const summaryHeight = summary.clientHeight

  if (!summary.contains(event.target)) {
    return
  }

  event.preventDefault()

  if (el.open) {
    el.classList.add('-closing')
    el.style.setProperty('--accordion-height-closed', `${summaryHeight}px`)

    setTimeout(() => {
      el.open = false
      el.classList.remove('-closing')
      el.style.setProperty('--accordion-height-closed', 'auto')
    }, duration)

  } else {
    el.style.transitionDuration = '0s'
    el.style.setProperty('--accordion-height-closed', `${summaryHeight}px`)

    requestAnimationFrame(() => {
      el.style.transitionDuration = ''
      el.open = true
    })
  }
}

export default {
  name: 'BpAccordion',
  setup(props, { slots, attrs }) {
    const details = ref(null)

    onMounted(() => {
      details?.value.style.setProperty('--accordion-height-closed', 'auto')
    })

    return () => h('details', {
      ...attrs,
      ref: details,
      class: attrs.class || 'accordion',
      onClick: handleToggle
    }, slots.default?.())
  }
}
</script>
