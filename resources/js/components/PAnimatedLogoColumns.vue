<!--
  Animated logo columns with accessible fallbacks.

  Two modes (handled automatically):

  1. Animation on (default)
     - CSS animates logos in each column.
     - The visual grid is hidden from assistive tech (aria-hidden).
     - A separate visually hidden text list (#company-list slot) announces brand names.
     - Play/pause and stop-on-focus give users control over motion.

  2. prefers-reduced-motion: reduce
     - CSS shows a static grid of all logos (see index.scss).
     - Images use their alt text; the text list is hidden from assistive tech.
     - Play/pause is hidden; no animation to control.

  Markup lives in HTML/CMS. This component only handles motion prefs and ARIA toggling.
-->
<script setup>
import { computed, onMounted, ref, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const isPlaying = ref(true)
const playPauseButton = ref(null)

const prefersReducedMotion = ref(false)

// Default: flipper for sighted users, visually hidden company list for screen readers.
const isFlipperMode = computed(() => !prefersReducedMotion.value)

// Reduced motion: static grid for everyone
const isGridMode = computed(() => prefersReducedMotion.value)

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

// Pause when focus enters the content, but let the play/pause button control itself.
// Rotation only resumes if the user activates play.
const onFocusIn = event => {
  if (isPlaying.value && event.target !== playPauseButton.value) {
    isPlaying.value = false
  }
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion.value) {
    isPlaying.value = false
  }
})
</script>

<template>
  <div v-bind="attrs" class="animatedLogoColumns__wrapper" :class="{ '-paused': !isPlaying }" role="group" :aria-describedby="isFlipperMode ? attrs['aria-describedby'] : undefined" @focusin="onFocusIn">
    <!-- Company list: screen reader fallback during flipper mode -->
    <div :aria-hidden="isGridMode">
      <slot name="company-list" />
    </div>

    <button v-if="isFlipperMode" ref="playPauseButton" type="button" class="animatedLogoColumns__playPause button -circle accent-primary" :aria-label="isPlaying ? 'Stop logo rotation' : 'Start logo rotation'" @click="togglePlay">
      <svg class="button__icon" aria-hidden="true">
        <use :href="isPlaying ? '/main-icons-sprite.svg#pause' : '/main-icons-sprite.svg#play'" />
      </svg>
    </button>

    <!-- Logo grid: flipper by default, static grid when reduced motion -->
    <div :aria-hidden="isFlipperMode">
      <slot />
    </div>
  </div>
</template>
