<script>
  const openableGroups = {}
</script>
<script setup>
import { ref, nextTick, useSlots, useTemplateRef } from 'vue'

import focusableElements from '../composables/FocusableElements.js'

const FOCUSABLE_SELECTOR = `:not([tabindex^="-"]):not([disabled]):is(a[href],audio[controls],button,details summary,input,map area[href],select,svg a[xlink\:href],[tabindex],textarea,video[controls])`

const findFocusableElement = elements => {
  console.log('findFocusableElement', elements, openable.value)
  debugger
  for (const vnode of elements) {
    let el = vnode.el || vnode.value
    if (!el) continue
    if (el.matches(FOCUSABLE_SELECTOR)) {
      return el
    }
    if (el = el.querySelector(FOCUSABLE_SELECTOR)) {
      return el
    }
  }
}

const { refocus, label, name } = defineProps({
  refocus: { type: Boolean, default: true },
  label: { type: String, default: "" },
  name: { type: String, default: "global" },
})
const emit = defineEmits(['open', 'close'])
const slots = useSlots()
const button = useTemplateRef('button')
const openable = useTemplateRef('openable')
const open = ref(false)

const clickOutside = evt => {
  if (slots.default().map(vnode => vnode.el).every(el => !el.contains(evt.target))) {
    evt.stopPropagation()
    toggle()
  }
}

const pressEscape = evt => {
  if (evt.key === 'Escape') {
    evt.stopPropagation()
    toggle()
  }
}

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

      document.documentElement.addEventListener('click', clickOutside)
      document.documentElement.addEventListener('keydown', pressEscape)
    } else {
      document.documentElement.removeEventListener('click', clickOutside)
      document.documentElement.removeEventListener('keydown', pressEscape)
      focusableElements(button)?.[0].focus()
    }
  })
}
</script>

<template>
  <slot name="toggle" v-bind="{ toggle }">
    <button v-bind="$attrs" ref="button" @click="toggle">{{ label }}</button>
  </slot>
  <div ref="openable">
    <slot v-if="open" />
  </div>
</template>
