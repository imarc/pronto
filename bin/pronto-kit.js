import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const src = path.join(__dirname, '..')
const dest = path.resolve('./')

// Add the files
console.log(`Copying files to ${dest}...`)

const files = [
    'assets',
    'vite.config.js',
    'package.json',
]

files.forEach(file => {
    fs.copySync(path.join(src, file), path.join(dest, file), { overwrite: false })
})

console.log('Done! 🚀')
console.log('Run `npm install` to get started.')