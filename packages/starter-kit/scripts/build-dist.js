import fs from 'fs-extra'
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'

// create dist directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.join(__dirname, '..', 'dist')
fs.mkdirSync(distDir, { recursive: true })

// copy main-*.css from web/dist to dist and rename main-*.css to main.css
// copy main-*.js from web/dist to dist and rename main-*.js to main.js
const webDistDir = path.join(__dirname, '..', 'web', 'dist')

const mainCss = fs.readdirSync(webDistDir).find((file) => file.startsWith('main-') && file.endsWith('.css'))
const mainJs = fs.readdirSync(webDistDir).find((file) => file.startsWith('main-') && file.endsWith('.js'))

if (!mainCss || !mainJs) {
    console.log(chalk.red('main-*.css or main-*.js not found in web/dist'))
    process.exit(1)
}

fs.copyFileSync(path.join(webDistDir, mainCss), path.join(distDir, 'main.css'))
fs.copyFileSync(path.join(webDistDir, mainJs), path.join(distDir, 'main.js'))

console.log(chalk.green('Copied main-*.css and main-*.js to dist'))

// copy everything in assets/styles except demo.scss and move to dist/scss
const stylesDir = path.join(__dirname, '..', 'assets', 'styles')
const distStylesDir = path.join(distDir, 'scss')
fs.copySync(stylesDir, distStylesDir, {
    filter: (src) => {
        const basename = path.basename(src)
        return basename !== 'demo.scss'
    },
})

console.log(chalk.green('Copied assets/styles to dist/scss'))
