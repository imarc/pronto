<script setup>
import { ref, nextTick, useSlots, useTemplateRef } from 'vue'

const FOCUSABLE_SELECTOR = `:not([tabindex^="-"]):not([disabled]):is(a[href],audio[controls],button,details summary,input,map area[href],select,svg a[xlink\:href],[tabindex],textarea,video[controls])`

const findFocusableElement = elements => {
  for (const vnode of elements) {
    let el = vnode.el || vnode.value
    if (el.matches(FOCUSABLE_SELECTOR)) {
      return el
    }
    if (el = el.querySelector(FOCUSABLE_SELECTOR)) {
      return el
    }
  }
}

const { refocus } = defineProps({
  refocus: { type: Boolean, default: true },
})
const emit = defineEmits(['open', 'close'])
const slots = useSlots()
const button = useTemplateRef('button')
const open = ref(false)

const clickOutside = evt => {
  if (slots.default().map(vnode => vnode.el).every(el => !el.contains(evt.target))) {
    evt.stopPropagation()
    toggle()
  }
}
const pressEscape = evt => {
  console.log('here', evt)
  if (evt.key === 'Escape') {
    evt.stopPropagation()
    toggle()
  }
}

const toggle = evt => {
  evt?.stopPropagation()
  emit(open.value ? 'close' : 'open')
  open.value = !open.value
  nextTick(() => {
    if (open.value) {
      if (refocus) {
        const el = findFocusableElement(slots.default())
        el.focus()
      }

      document.documentElement.addEventListener('click', clickOutside)
      document.documentElement.addEventListener('keydown', pressEscape)
    } else {
      document.documentElement.removeEventListener('click', clickOutside)
      document.documentElement.removeEventListener('keydown', pressEscape)
      const el = findFocusableElement(slots.toggle?.() || [ button ])
      el.focus()
    }
  })
}


</script>

<template>
  <slot name="toggle" v-bind="{ toggle }">
    <button v-bind="$attrs" ref="button" @click="toggle">toggle</button>
  </slot>
  <slot v-if="open" />
</template>
