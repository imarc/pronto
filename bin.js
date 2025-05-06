#!/usr/bin/env node
import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'
import { exec } from 'node:child_process'

import { isCancel, cancel, text, confirm, intro, outro, log } from '@clack/prompts'

const yes = value => ['yes', 'y', 1, true].includes(value.toLowerCase())

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

const copyComponents = copyPath => {
  log.info(`Copying components into ${copyPath}...`)

  try {
    copyFolderSync(
      path.join(import.meta.dirname, 'resources', 'styles'),
      path.join(copyPath, 'styles')
    )
    copyFolderSync(
      path.join(import.meta.dirname, 'resources', 'js'),
      path.join(copyPath, 'js')
    )

    fs.copyFileSync(
      path.join(import.meta.dirname, 'resources', 'index.md'),
      path.join(copyPath, 'index.md')
    )
  } catch (error) {
    console.error(`Failed to copy files: ${error.message}`)
    process.exit(1)
  }
}

const addDependency = () => {
  log.info(`Adding dependency to package.json...`)

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

const createViteConfig = () => {
  log.info(`Creating a vite.config.js...`)

  const configPath = path.join(import.meta.dirname, 'vite.config.template.js')
  fs.copyFileSync(configPath, './vite.config.js')
}


if (process.argv.includes('--non-interactive')) {
  const args = process.argv.slice(process.argv.indexOf('--non-interactive') + 1)

  console.log(args)

  if (yes(args[0])) copyComponents(args[1])
  if (yes(args[2])) addDependency()
  if (yes(args[3])) createViteConfig()

  process.exit()
}

/******************************************************************************
 * Interactive prompts
 ******************************************************************************/

intro('@imarc/pronto')

const askCopy = await confirm({
  message: 'Should I copy components from Pronto into your project?'
})

checkCancel(askCopy)

const askCopyPath = askCopy ? await text({
    message: 'Where to?',
    initialValue: './resources',
  }) : false

checkCancel(askCopyPath)

if (askCopy && askCopyPath) {
  copyComponents(askCopyPath)
}

const askAddDependency = await confirm({
  message: 'Should I add @imarc/pronto as a dependency for you?'
})

checkCancel(askAddDependency)

if (askAddDependency) {
  addDependency()
}

const viteConfig = path.join(process.cwd(), 'vite.config.js')

if (!fs.existsSync(viteConfig)) {
  const askCreateViteConfig = await confirm({
    message: 'Should I create a vite.config.js for you?'
  })

  if (askCreateViteConfig) {
    createViteConfig()
  }
} else {
  log.info(`You already have a vite.config.js, skipping creating one for you...`)
}

outro(`You're all set!`)
