<script>
  const openableGroups = {}
</script>

<script setup>
import { ref, nextTick, useSlots, useTemplateRef } from 'vue'

import focusableElements from '../composables/FocusableElements.js'

const { closeOnBlur, refocus, label, name } = defineProps({
  closeOnBlur: { type: Boolean, default: true },
  refocus: { type: Boolean, default: true },
  label: { type: String, default: "" },
  name: { type: String, default: "global" },
})
const emit = defineEmits(['open', 'close'])
const slots = useSlots()
const button = useTemplateRef('button')
const openable = useTemplateRef('openable')
const open = ref(false)

const targetOutside = evt => {
  if (openable.value && !openable.value.contains(evt.target)) {
    toggle()
  }
}

const pressEscape = evt => {
  if (evt.key === 'Escape') {
    evt.stopPropagation()
    toggle()
  }
}

let escapeHandler = null

const updateGroup = (open) => {
  if (!name) {
    return
  }

  if (!(name in openableGroups)) {
    openableGroups[name] = new Set()
  }

  if (open) {
    openableGroups[name].forEach(t => t())
    openableGroups[name].add(toggle)
  } else {
    openableGroups[name].delete(toggle)
  }
}

const toggle = evt => {
  evt?.stopPropagation()
  emit(open.value ? 'close' : 'open')
  open.value = !open.value
  updateGroup(open.value)
  nextTick(() => {
    if (open.value) {
      if (refocus) {
        focusableElements(openable)?.[0].focus()
      }

      document.documentElement.addEventListener('click', targetOutside)
      openable.value.addEventListener('keydown', pressEscape)

      if (closeOnBlur) {
        document.documentElement.addEventListener('focusin', targetOutside)
      }
    } else {
      document.documentElement.removeEventListener('click', targetOutside)
      openable.value.removeEventListener('keydown', pressEscape)

      if (closeOnBlur) {
        document.documentElement.removeEventListener('focusin', targetOutside)
      }

      focusableElements(button)?.[0].focus()
    }
  })
}
</script>

<template>
  <button v-bind="$attrs" ref="button" @click="toggle">
    <slot name="toggle" v-bind="{ toggle }">{{ label }}</slot>
  </button>
  <div ref="openable">
    <slot v-if="open" v-bind="{ toggle }" />
  </div>
</template>
