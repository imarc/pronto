import { createApp, defineAsyncComponent } from 'vue'
import directionals from './directives/vDirectionals.js'
import scrolllock from './directives/vScrolllock.js'

createApp({
  components: {
    BpAccordion: defineAsyncComponent(() => import('./components/BpAccordion.vue')),
    BpDismissable: defineAsyncComponent(() => import('./components/BpDismissable.vue')),
    BpLazy: defineAsyncComponent(() => import('./components/BpLazy.vue')),
    BpOpenable: defineAsyncComponent(() => import('./components/BpOpenable.vue')),
    BpTabs: defineAsyncComponent(() => import('./components/BpTabs.vue')),
    BpDirectionalKeys: defineAsyncComponent(() => import('./components/BpDirectionalKeys.vue')),

    BpSelect: defineAsyncComponent(() => import('@vueform/multiselect/themes/default.css') && import('@vueform/multiselect')),
    BpSlider: defineAsyncComponent(() => import('./components/BpSlider.vue')),
  },
  directives: {
    directionals,
    scrolllock,
  },
}).mount('#app')
