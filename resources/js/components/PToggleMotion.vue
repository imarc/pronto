<script setup>
import { ref } from 'vue'

const root = document.documentElement
const reducedMotion = ref(getComputedStyle(root).getPropertyValue('--root-motion').trim() === 'reduce')

const toggleMotion = () => {
  reducedMotion.value = !reducedMotion.value
  root.style.setProperty('--root-motion', reducedMotion.value ? 'reduce' : 'unset')
}
</script>

<template>
  <button v-bind="$attrs" type="button" :aria-pressed="reducedMotion" @click="toggleMotion">
    <slot>{{ reducedMotion ? 'Enable motion' : 'Reduce motion' }}</slot>
  </button>
</template>
