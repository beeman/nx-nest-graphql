import { execSync } from 'child_process'

async function setup() {
  execSync('nxplus scope:set', { stdio: [0,1,2]})
}

setup()
