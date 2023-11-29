// Styles
import '../styles/main.scss'

// Global
import 'lazysizes'

// import polyfill for css :has() selector (applies to Firefox only).
import { cssHasInputCheckedPolyfill } from './polyfill/css-has'

// Accept HMR as per: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('HMR')
  })
}

// Init ==========================//
cssHasInputCheckedPolyfill()

// Accordions ==========================//
const accordions = [...document.querySelectorAll('[data-accordion]')]

if (accordions.length) {
  const { Accordion } = await import('../styles/molecules/accordion/_index')
  accordions.forEach(accordion => new Accordion(accordion))
}

// Tabs ==========================//
const tabs = [...document.querySelectorAll('[data-tabs]')]

if (tabs.length) {
  const { Tabs } = await import('../styles/molecules/tabs/_index')
  tabs.forEach(tab => new Tabs(tab))
}

// Toasts ==========================//
const toasts = [...document.querySelectorAll('[toast-trigger]')]

if (toasts.length) {
  const { createToastTrigger } = await import('../styles/organisms/toasts/_index')
  toasts.forEach(toast => createToastTrigger(toast))
}

// Videos ==========================//
const videos = [...document.querySelectorAll('.lazyload--video, [data-lazy-video]')]

if (videos.length) {
  const { lazyLoadVideo } = await import('../styles/atoms/media/_index')
  videos.forEach(video => lazyLoadVideo(video))
}
