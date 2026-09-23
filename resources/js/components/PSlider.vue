<script setup>
import { register } from 'swiper/element/bundle'
import { onBeforeUnmount, ref } from 'vue'

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
const reduceMotion = ref(false)

let swiperInstance = null
let sliderElement = null
let sliderSpeed = null

const stopAutoplay = () => {
  if (!isPlaying.value || !swiperInstance) return
  swiperInstance.autoplay.stop()
  swiperInstance.wrapperEl.setAttribute('aria-live', 'polite')
  isPlaying.value = false
}

const syncMotion = target => {
  reduceMotion.value = getComputedStyle(target).getPropertyValue('--reduce-motion').trim() === 'reduce'
  swiperInstance.params.speed = reduceMotion.value ? 0 : sliderSpeed

  if (reduceMotion.value) stopAutoplay()
}

const handleMotionChange = event => {
  if (!sliderElement || !event.target?.contains(sliderElement)) return
  syncMotion(sliderElement)
}

window.addEventListener('reduce-motion-change', handleMotionChange)
onBeforeUnmount(() => window.removeEventListener('reduce-motion-change', handleMotionChange))

const toggleAutoplay = () => {
  if (!swiperInstance || reduceMotion.value) return

  if (isPlaying.value) {
    swiperInstance.autoplay.stop()
    swiperInstance.wrapperEl.setAttribute('aria-live', 'polite')
  } else {
    swiperInstance.autoplay.start()
    swiperInstance.wrapperEl.setAttribute('aria-live', 'off')
  }
  isPlaying.value = !isPlaying.value
}

const updateActiveBullet = swiper => {
  if (!swiper.pagination?.bullets) return
  swiper.pagination.bullets.forEach(bullet => {
    bullet.setAttribute('aria-disabled', bullet.classList.contains('swiper-pagination-bullet-active') ? 'true' : 'false')
  })
}

const init = e => {
  swiperInstance = e.detail[0]
  sliderElement = e.target
  sliderSpeed = swiperInstance.params.speed
  syncMotion(sliderElement)

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

  // Pause autoplay on user interaction (focus or intentional click) while playing.
  // Listens on both the host (slotted play button) and swiper.el (shadow DOM controls).
  // Skips the play/pause button so clicking it to resume does not immediately re-pause.
  if (props.autoplay) {
    const pauseAutoplayOnFocus = event => {
      if (event.target.closest?.('.slider__playPause')) return
      stopAutoplay()
    }

    // Pause on click of a slide, pagination bullet, or prev/next nav button.
    const pauseAutoplayOnClick = event => {
      if (!event.target.closest('.swiper-slide, .swiper-pagination-bullet, .swiper-button-prev, .swiper-button-next')) return
      stopAutoplay()
    }

    e.target.addEventListener('focusin', pauseAutoplayOnFocus)
    swiperInstance.el.addEventListener('focusin', pauseAutoplayOnFocus)
    swiperInstance.el.addEventListener('click', pauseAutoplayOnClick)
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
  <swiper-container v-bind="$attrs" :autoplay="autoplay" a11y-container-role="group" a11y-container-role-description-message="carousel" :a11y-container-message="ariaLabel" a11y-item-role-description-message="slide" @swiperafterinit="init">
    <button v-if="autoplay" slot="container-start" class="slider__playPause button -circle" :aria-label="isPlaying ? 'Stop slide rotation' : 'Start slide rotation'" :disabled="reduceMotion" @click="toggleAutoplay">
      <svg class="button__icon" aria-hidden="true">
        <use :href="isPlaying ? '/main-icons-sprite.svg#pause' : '/main-icons-sprite.svg#play'" />
      </svg>
    </button>
    <slot />
  </swiper-container>
</template>
