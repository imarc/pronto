import { createApp, defineAsyncComponent } from 'vue'

createApp({
    components: {
        BpAccordion: defineAsyncComponent(() => import('./components/BpAccordion.vue'))
    },
}).mount('#app')
