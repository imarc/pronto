<script setup>
import { register } from 'swiper/element/bundle'
import { computed, ref, useAttrs } from 'vue'

register()

const attrs = useAttrs()
const hasAutoplay = computed(() => !!attrs.autoplay)
const isPlaying = ref(true)

const props = defineProps({
  ariaLabel: {
    type: String,
    required: true,
  },
})

let swiperInstance = null

const toggleAutoplay = () => {
  if (!swiperInstance) return

  if (isPlaying.value) {
    swiperInstance.autoplay.stop()
    swiperInstance.wrapperEl.setAttribute('aria-live', 'polite')
  } else {
    swiperInstance.autoplay.start()
    swiperInstance.wrapperEl.setAttribute('aria-live', 'off')
  }
  isPlaying.value = !isPlaying.value
}

const init = e => {
  swiperInstance = e.detail[0]
  const slides = swiperInstance?.slides

  // The following code is for slider accessibility
  // Please see the slider README.md or the W3C carousel pattern for more information:
  // README: ../../../styles/organisms/slider/README.md
  // W3C: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/

  // Main swiper container
  e.target.setAttribute('role', 'group')
  e.target.setAttribute('aria-roledescription', 'carousel')
  // This should be customized for each carousel via props
  e.target.setAttribute('aria-label', props.ariaLabel)

  // Swiper wrapper - aria-live is "off" while autoplaying to avoid interrupting the user
  swiperInstance.wrapperEl.setAttribute('aria-atomic', 'false')
  swiperInstance.wrapperEl.setAttribute('aria-live', hasAutoplay.value ? 'off' : 'polite')

  // Pause autoplay the first time keyboard focus enters the carousel
  // { once: true } removes the listener after it fires so subsequent focus events
  // (e.g. tabbing to the play button and continuing) don't re-stop user-initiated playback
  if (hasAutoplay.value) {
    e.target.addEventListener('focusin', () => {
      if (isPlaying.value) {
        swiperInstance.autoplay.stop()
        swiperInstance.wrapperEl.setAttribute('aria-live', 'polite')
        isPlaying.value = false
      }
    }, { once: true })
  }

  // Swiper correctly sets role="group" per slide and aria-label to index/total slides
  // we still need to set aria-roledescription to "slide"
  slides.forEach((slide) => {
    slide.setAttribute('aria-roledescription', 'slide')
  })

  // Swiper pagination wrapper
  swiperInstance.pagination.el.setAttribute('role', 'group')
  swiperInstance.pagination.el.setAttribute('aria-label', 'Choose a slide')

  // Swiper pagination bullets
  // set active bullet to aria-disabled="true", this updates with each slide change
  const updateActiveBullet = (swiper) => {
    swiper.pagination.bullets.forEach((bullet) => {
      bullet.setAttribute('aria-disabled', bullet.classList.contains('swiper-pagination-bullet-active') ? 'true' : 'false')
    })
  }

  updateActiveBullet(swiperInstance)
  swiperInstance.on('slideChange', updateActiveBullet)

}
</script>
<template>
  <swiper-container v-bind="$attrs" @swiperafterinit="init">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -- native web component slot, not Vue 2 slot syntax -->
    <button
      v-if="hasAutoplay"
      slot="container-start"
      class="slider__playPause button -circle"
      :aria-label="isPlaying ? 'Stop slide rotation' : 'Start slide rotation'"
      @click="toggleAutoplay"
    >
      <svg class="button__icon" aria-hidden="true">
        <use :href="isPlaying ? '/main-icons-sprite.svg#pause' : '/main-icons-sprite.svg#play'" />
      </svg>
    </button>
    <slot />
  </swiper-container>
</template>
