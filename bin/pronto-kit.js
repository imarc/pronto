#!/usr/bin/env node
import fs from 'fs-extra'
import path from 'path'

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