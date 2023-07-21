// import scss.
import '../styles/main.scss'

// import global libraries.
import 'lazysizes'

// import polyfill for css :has() selector (applies to Firefox only).
import { cssHasInputCheckedPolyfill } from './polyfill/css-has'
cssHasInputCheckedPolyfill()
