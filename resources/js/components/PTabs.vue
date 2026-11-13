<script setup>
import { computed, onUnmounted, ref, useId, useTemplateRef, watchEffect } from 'vue'
import focusWithArrows from '/resources/js/composables/focusWithArrows'

const props = defineProps({
  titles: { type: Array, required: true },
  label: { type: String, default: 'Sections' },

  /**
   * Show a <select> instead of tabs. Pass `select` to always use one, or a
   * media query such as `select="(width < 744px)"` to use one only while it matches.
   */
  select: { type: [Boolean, String], default: false },
})

const id = useId()
const tablist = useTemplateRef('tablist')
const visibleTab = ref(0)

const useSelect = ref(props.select === true)

if (typeof props.select === 'string') {
  const query = window.matchMedia(props.select)
  const update = () => (useSelect.value = query.matches)

  update()
  query.addEventListener('change', update)
  onUnmounted(() => query.removeEventListener('change', update))
}

const focusedElement = focusWithArrows(tablist)

watchEffect(() => {
  if (focusedElement.value) {
    visibleTab.value = tablist.value.indexOf(focusedElement.value)
  }
})

const tabs = computed(() =>
  props.titles.map((title, i) => ({
    title,
    selected: i === visibleTab.value,
    tabindex: i === visibleTab.value ? 0 : -1,

    buttonId: `${id}-tab-${i + 1}`,
    panelId: `${id}-tabpanel-${i + 1}`,
    slotName: `tabpanel-${i + 1}`,
  })),
)

const prev = () => {
  const selected = tabs.value.findIndex(e => e.selected)
  if (selected) {
    focusedElement.value = tablist.value[selected - 1]
  }
}

const next = () => {
  const selected = tabs.value.findIndex(e => e.selected)
  if (selected < tabs.value.length) {
    focusedElement.value = tablist.value[selected + 1]
  }
}
</script>

<template>
  <div class="tabs">
    <!-- v-show (not v-if) keeps the tab buttons that focusWithArrows tracks -->
    <div v-show="useSelect" class="tabs__select field">
      <label :for="`${id}-select`" v-text="label" />
      <span class="select">
        <select :id="`${id}-select`" v-model.number="visibleTab" class="select__input" :aria-controls="tabs[visibleTab].panelId">
          <option v-for="(tab, i) in tabs" :key="tab.panelId" :value="i" v-text="tab.title" />
        </select>
      </span>
    </div>

    <div v-show="!useSelect" class="tabs__tablist" role="tablist" :aria-label="label">
      <button class="tabs__prev button -circle webOnly" @click="prev">
        <span class="srOnly">previous</span>
        <svg class="button__icon"><use href="/main-icons-sprite.svg#chevron-left" /></svg>
      </button>
      <button v-for="tab in tabs" :id="tab.buttonId" :key="tab.buttonId" ref="tablist" class="tabs__button" :class="{ '-selected': tab.selected }" role="tab" :aria-selected="tab.selected" :aria-controls="tab.panelId" :tabindex="tab.tabindex" v-text="tab.title" />
      <button class="tabs__next button -circle webOnly" @click="next">
        <span class="srOnly">next</span>
        <svg class="button__icon"><use href="/main-icons-sprite.svg#chevron-right" /></svg>
      </button>
    </div>

    <!-- Without visible tabs, panels drop the tabpanel role so they aren't announced as part of a tab list. -->
    <div v-for="tab in tabs" :id="tab.panelId" :key="tab.panelId" class="tabs__panel" :role="useSelect ? null : 'tabpanel'" :tabindex="useSelect ? null : tab.tabindex" :aria-labelledby="useSelect ? null : tab.buttonId" :hidden="!tab.selected">
      <slot :name="tab.slotName" />
    </div>
  </div>
</template>
