<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  target: {
    type: String,
    default: ':root',
  }
})

const target = computed(() => document.querySelector(props.target))

const reduceMotion = ref(getComputedStyle(target.value).getPropertyValue('--reduce-motion').trim() === 'reduce')

const toggleMotion = () => {
  reduceMotion.value = !reduceMotion.value
  target.value.style.setProperty('--reduce-motion', reduceMotion.value ? 'reduce' : null)
}
</script>

<template>
  <button
    type="button"
    class="button"
    :aria-pressed="reduceMotion"
    @click="toggleMotion"
  >
    <slot>
      <svg class="button__icon" aria-hidden="true">
        <use :href="reduceMotion ? '/main-icons-sprite.svg#play' : '/main-icons-sprite.svg#pause'" />
      </svg>
    </slot>
  </button>
</template>
