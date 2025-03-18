import { createApp, defineAsyncComponent } from 'vue'

createApp({
  components: {
    BpAccordion: defineAsyncComponent(() => import('./components/BpAccordion.vue')),
    BpDismissable: defineAsyncComponent(() => import('./components/BpDismissable.vue')),
    BpTabs: defineAsyncComponent(() => import('./components/BpTabs.vue')),
    BpLazy: defineAsyncComponent(() => import('./components/BpLazy.vue')),
    BpSelect: defineAsyncComponent(() => import('@vueform/multiselect/themes/default.css') && import('@vueform/multiselect')),
  },
}).mount('#app')
