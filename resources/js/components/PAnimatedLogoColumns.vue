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
import { computed, onMounted, ref } from 'vue'

// Accessible name for the logo group. Pass the section heading id via aria-labelledby.
const props = defineProps({
  ariaLabel: {
    type: String,
    default: undefined,
  },
  ariaLabelledby: {
    type: String,
    default: undefined,
  },
  // Id of the #company-list <ul>. Used as aria-describedby during flipper mode only.
  ariaDescribedby: {
    type: String,
    default: undefined,
  },
})

const isPlaying = ref(true)

const prefersReducedMotion = ref(false)

// Default: flipper for sighted users, visually hiddencompany list for screen readers.
const isFlipperMode = computed(() => !prefersReducedMotion.value)

// Reduced motion: static grid for everyone
const isGridMode = computed(() => prefersReducedMotion.value)

// Links the group to #company-list during flipper mode only.
const ariaDescribedbyInFlipperMode = computed(() => (isFlipperMode.value ? props.ariaDescribedby : undefined))

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

// WCAG / ARIA carousel pattern: stop auto-rotation when focus enters the component.
// Rotation only resumes if the user clicks play.
const onFocusIn = () => {
  if (!prefersReducedMotion.value) {
    isPlaying.value = false
  }
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<template>
  <div class="animatedLogoColumns__wrapper" :class="{ '-paused': !isPlaying }" role="group" :aria-label="ariaLabel" :aria-labelledby="ariaLabelledby" :aria-describedby="ariaDescribedbyInFlipperMode" @focusin="onFocusIn">
    <!-- Company list: screen reader fallback during flipper mode -->
    <div :aria-hidden="isGridMode">
      <slot name="company-list" />
    </div>

    <button v-if="isFlipperMode" class="animatedLogoColumns__playPause button -circle accent-primary" :aria-label="isPlaying ? 'Stop logo rotation' : 'Start logo rotation'" @click="togglePlay">
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
