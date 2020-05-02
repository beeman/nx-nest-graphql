import { existsSync } from 'fs'
import { exec, log } from 'nxplus'
import { join } from 'path'

async function main() {
  if (!existsSync(join(process.cwd(), '.env'))) {
    log('Copying .env file')
    exec('cp -v .env.example .env')
  }
  exec(`yarn migrate:reset`)
  exec(`yarn migrate:save`)
  exec('nxplus scope:set')
}

main()
