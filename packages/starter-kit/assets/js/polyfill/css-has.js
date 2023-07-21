/**
 * @module has-polyfill
 * @author timspears
 * @description polyfill for css :has selector
 * @function cssHasPolyfill
 * @param {[string, HTMLElement]} root - provide selector string or HTMLElement to scope querySelectorAll
 * @property {string} [data-css-has] - selector name for child element
 *
 * @example .parent:has(.child) { ... }
 * <div class="parent" data-css-has="child">
 * which creates `.has--child` class on .parent
 *
 */

const cssHasPolyfill = (root = document, prefix = 'has--') => {
    if (!CSS.supports('selector(:has(*))')) {
        const rootEl = typeof root === 'string' ? document.querySelector(root) : root
        rootEl.querySelectorAll('[data-css-has]').forEach((el) => {
            const selector = el.dataset.cssHas
            if (selector) {
                const hasChild = el.querySelector(`.${selector}`)
                hasChild && !el.classList.contains(prefix + selector) && el.classList.add(prefix + selector)
            }
        })
    }
}

// check if parent has checked input using mutation observer
// https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

const cssHasInputCheckedPolyfill = (root = document, prefix = 'has--') => {
    if (!CSS.supports('selector(:has(*))')) {
        const rootEl = typeof root === 'string' ? document.querySelector(root) : root
        rootEl.querySelectorAll('[data-css-has-input-checked]').forEach((el) => {
            const inputSelector = el.dataset.cssHasInputChecked

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'checked') {
                        const hasChild = el.querySelector(inputSelector || 'input')
                        hasChild && !el.classList.contains(prefix + inputSelector) && el.classList.add(prefix + inputSelector)
                    }
                })
            }
        })
    }
}
export { cssHasPolyfill, cssHasInputCheckedPolyfill }
