<script setup>
import { register } from 'swiper/element/bundle'
import { ref } from 'vue'

register()

const props = defineProps({
  ariaLabel: {
    type: String,
    default: undefined,
  },
  ariaLabelledby: {
    type: String,
    default: undefined,
  },
  autoplay: {
    type: [Boolean, Object],
    default: undefined,
  },
})

const isPlaying = ref(!!props.autoplay)

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

const updateActiveBullet = (swiper) => {
  if (!swiper.pagination?.bullets) return
  swiper.pagination.bullets.forEach((bullet) => {
    bullet.setAttribute('aria-disabled', bullet.classList.contains('swiper-pagination-bullet-active') ? 'true' : 'false')
  })
}

const init = e => {
  swiperInstance = e.detail[0]

  // The following code is for slider accessibility not covered by Swiper's a11y module.
  // Please see the slider README.md or the W3C carousel pattern for more information:
  // README: ../../../styles/organisms/slider/README.md
  // W3C: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/

  // Swiper has no param for aria-labelledby; set it on the inner .swiper container
  // (swiperInstance.el), matching where the a11y module applies aria-label
  if (props.ariaLabelledby) {
    swiperInstance.el.setAttribute('aria-labelledby', props.ariaLabelledby)
    swiperInstance.el.removeAttribute('aria-label')
  }

  swiperInstance.wrapperEl.setAttribute('aria-atomic', 'false')

  // Pause autoplay whenever keyboard focus moves within the carousel while playing.
  // Listens on both the host (slotted play button) and swiper.el (shadow DOM controls).
  // Skips the play/pause button so clicking it to resume does not immediately re-pause.
  if (props.autoplay) {
    const pauseAutoplayOnFocus = (event) => {
      if (event.target.closest?.('.slider__playPause')) return
      if (!isPlaying.value) return
      swiperInstance.autoplay.stop()
      swiperInstance.wrapperEl.setAttribute('aria-live', 'polite')
      isPlaying.value = false
    }

    e.target.addEventListener('focusin', pauseAutoplayOnFocus)
    swiperInstance.el.addEventListener('focusin', pauseAutoplayOnFocus)
  }

  if (swiperInstance.pagination?.el) {
    swiperInstance.pagination.el.setAttribute('role', 'group')
    swiperInstance.pagination.el.setAttribute('aria-label', 'Choose a slide')
  }

  // Active bullet aria-disabled per W3C carousel pattern (Swiper sets aria-current only)
  updateActiveBullet(swiperInstance)
  swiperInstance.on('slideChange', updateActiveBullet)
  swiperInstance.on('paginationUpdate', updateActiveBullet)
}
</script>
<template>
  <swiper-container
    v-bind="$attrs"
    :autoplay="autoplay"
    a11y-container-role="group"
    a11y-container-role-description-message="carousel"
    :a11y-container-message="ariaLabel"
    a11y-item-role-description-message="slide"
    @swiperafterinit="init"
  >
    <button
      v-if="autoplay"
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
