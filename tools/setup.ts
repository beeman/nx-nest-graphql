import * as chalk from 'chalk'
import * as minimist from 'minimist'
import * as inquirer from 'inquirer'
import { readFileSync } from 'fs'
import { join } from 'path'
import { replaceInFile } from 'replace-in-file'

const { magentaBright, gray } = chalk
const log = (msg, ...params) => console.log(` ${gray('->')} ${magentaBright(msg)}`, ...params)

const args = minimist(process.argv, {
  string: ['scope'],
  boolean: ['dry-run'],
  default: {
    'dry-run': false,
    scope: null,
  },
})

const nxJson = JSON.parse(readFileSync(join(process.cwd(), 'nx.json'), 'utf8'))

const validateScope = async (scope) => {
  const re = new RegExp(/^[a-z0-9-]+$/i)

  if (re.test(scope)) {
    return true
  }
  return `Invalid scope, only use ${re} please ;-) `
}

async function setup() {
  const options = await inquirer.prompt([
    {
      type: 'input',
      name: 'scope',
      message: `Enter NPM Scope`,
      default: () => args.scope || nxJson.npmScope,
      validate: validateScope,
    },
  ])

  if (nxJson.npmScope === options.scope) {
    log('Done', `NPM Scope is already set to ${options.scope}`)
  } else {
    const res = await replaceInFile({
      dry: args['dry-run'],
      files: '**/*.*',
      ignore: ['.git/**', 'node_modules/**', 'dist/**', 'tmp/**'],
      from: nxJson.npmScope,
      to: options.scope,
    })
    const changed = res.filter((item) => item.hasChanged)
    log('Updated', `${changed.length} files`)
  }
}

setup()
