import { createApp, defineAsyncComponent } from 'vue'

createApp({
    components: {
        BpAccordion: defineAsyncComponent(() => import('./components/BpAccordion.vue')),
        BpTabs: defineAsyncComponent(() => import('./components/BpTabs.vue')),
    },
}).mount('#app')
