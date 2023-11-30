// Styles
import '@styles/main.scss'

// Global
import 'lazysizes'

// import polyfill for css :has() selector (applies to Firefox only).
import { cssHasInputCheckedPolyfill, cssHasPolyfill } from './polyfill/css-has'

// Accept HMR as per: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('HMR')
  })
}

// Init ==========================//
cssHasInputCheckedPolyfill()
cssHasPolyfill()

// Videos ==========================//
const videos = [...document.querySelectorAll('.lazyload--video, [data-lazy-video]')]

if (videos.length) {
  const { lazyLoadVideo } = await import('@styles/atoms/media/_index')
  videos.forEach(video => lazyLoadVideo(video))
}
