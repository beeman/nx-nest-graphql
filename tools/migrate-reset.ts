import { config } from 'dotenv'
import { log } from 'nxplus'
import { Client } from 'pg'

config()

async function main() {
  const client = new Client(process.env.DATABASE_URL)
  client.connect()
  log(' Removing migrations table', process.env.DATABASE_URL)
  await client.query(`truncate table "nx-nest-graphql"."_Migration"`)
  client.end()
}

main()
