import { config } from 'dotenv'
import { log } from 'nxplus'
import { Client } from 'pg'

config()

async function main() {
  const url = process.env.DATABASE_URL
  const schema = url.split('=')[1]
  const client = new Client(url)
  client.connect()
  log(' Removing migrations table', url)
  await client.query(`truncate table "${schema}"."_Migration"`)
  client.end()
}

main()
