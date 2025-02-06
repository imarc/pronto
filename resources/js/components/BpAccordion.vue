<script setup>
  import { ref, onMounted } from 'vue'
  const details = ref(null)

  onMounted(() => {
    details.value.style.setProperty('--accordion-height-closed', 'auto')
  })

  const handleToggle = event => {
    const el = details.value
    const duration = parseFloat(getComputedStyle(details.value).transitionDuration) * 1000
    const summaryHeight = details.value.querySelector('summary:first-of-type').clientHeight

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
</script>
<template>
  <details @click="handleToggle" ref="details">
    <slot />
  </details>
</template>
