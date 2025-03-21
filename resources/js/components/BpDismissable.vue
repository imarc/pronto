<script setup>
import { ref, useTemplateRef } from 'vue'

const { name } = defineProps({ name: { type: String } })
const dismissable = useTemplateRef('dismissable')
const open = ref(name ? sessionStorage[name] !== 'dismissed' : true)
const close = () => {
  open.value = false
  if (name) {
    sessionStorage[name] = 'dismissed'
  }
}
</script>

<template>
  <div ref="dismissable" v-if="open" @close="close">
    <slot :close="close" />
  </div>
</template>
