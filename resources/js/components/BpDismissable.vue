<script setup>
import { ref, useTemplateRef } from 'vue'

const { name } = defineProps({
  name: { type: String, required: true },
})

const dialog = useTemplateRef('dialog')

const open = ref(sessionStorage[name] !== 'closed')
const close = () => sessionStorage[name] = 'closed'
</script>
<template>
  <dialog ref="dialog" :open @close="close">
    <slot :close="() => dialog.close()" />
  </dialog>
</template>
