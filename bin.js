#!/usr/bin/env node
import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'

import { isCancel, cancel, text, confirm, intro, outro } from '@clack/prompts'

const checkCancel = value => {
  if (isCancel(value)) {
    cancel('Okay, nevermind.')
    process.exit(1)
  }
}

const copyFolderSync = (from, to) => {
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    if (fromPath.includes('resources/styles/imported')) return
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isFile()) {
      fs.copyFileSync(fromPath, toPath);
    } else {
      copyFolderSync(fromPath, toPath);
    }
  });
}

intro('@imarc/pronto')

const shouldCopy = await confirm({
  message: 'Should I copy components from Pronto into your project?'
})

checkCancel(shouldCopy)


const copyPath = shouldCopy ? await text({
    message: 'Where to?',
    initialValue: './resources/styles',
  }) : false

checkCancel(copyPath)

if (shouldCopy && copyPath) {
  const sourcePath = path.join(import.meta.dirname, 'resources', 'styles');
  const destinationPath = path.join(copyPath);

  try {
    copyFolderSync(sourcePath, destinationPath)
  } catch (error) {
    console.error(`Failed to copy files: ${error.message}`)
    process.exit(1)
  }
}

const addDeps = await confirm({
  message: 'Should I add @imarc/pronto as a dependency for you?'
})

checkCancel(addDeps)

if (addDeps) {
  const packageJson = path.join(process.cwd(), 'package.json')

  if (!fs.existsSync(packageJson)) {
    console.error("No package.json found in the current directory.")
    process.exit(1)
  }

  exec('npm install @imarc/pronto', (error, _, stderr) => {
    if (error) {
      console.error(`Error adding dependency: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`npm stderr: ${stderr}`)
    }
  })
}

outro(`You're all set!`)
