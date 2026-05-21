<script setup>
import { register } from 'swiper/element/bundle'
import { ref } from 'vue'

register()

const slides = ref([])
const props = defineProps({
  ariaLabel: {
    type: String,
    required: true,
  },
})

const init = e => {
  const swiperInstance = e.detail[0]
  slides.value = swiperInstance?.slides

  // The following code is for slider accessibility
  // Please see the slider README.md or the W3C carousel pattern for more information:
  // README: ../../../styles/organisms/slider/README.md
  // W3C: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/

  // Main swiper container
  e.target.setAttribute('role', 'group')
  e.target.setAttribute('aria-roledescription', 'carousel')
  // This should be customized for each carousel via props
  e.target.setAttribute('aria-label', props.ariaLabel)


  // Swiper wrapper
  swiperInstance.wrapperEl.setAttribute('aria-atomic', 'false')

  // Swiper correctly sets role="group" per slide and aria-label to index/total slides
  // we still need to set aria-roledescription to "slide"
  slides.value.forEach((slide) => {
    slide.setAttribute('aria-roledescription', 'slide')
  })

  // Swiper pagination wrapper
  swiperInstance.pagination.el.setAttribute('role', 'group')
  swiperInstance.pagination.el.setAttribute('aria-label', 'Choose a slide')

  // Swiper pagination bullets
  // set active bullet to aria-disabled=true, this updates with each slide change
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
  <swiper-container ref="swiper" v-bind="$attrs" @swiperafterinit="init">
    <slot />
  </swiper-container>
</template>
