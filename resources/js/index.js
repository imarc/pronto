import { createApp, defineAsyncComponent } from 'vue'

createApp({
  components: {
    BpAccordion: defineAsyncComponent(() => import('./components/BpAccordion.vue')),
    BpDismissable: defineAsyncComponent(() => import('./components/BpDismissable.vue')),
    BpLazy: defineAsyncComponent(() => import('./components/BpLazy.vue')),
    BpOpenable: defineAsyncComponent(() => import('./components/BpOpenable.vue')),
    BpTabs: defineAsyncComponent(() => import('./components/BpTabs.vue')),

    BpSelect: defineAsyncComponent(() => import('@vueform/multiselect/themes/default.css') && import('@vueform/multiselect')),
  },
}).mount('#app')
