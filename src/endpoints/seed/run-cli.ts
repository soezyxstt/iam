/**
 * Runs destructive seed from the terminal (loads .env via Bun/Node).
 * Usage: `bun run src/endpoints/seed/run-cli.ts`
 */
import { createLocalReq, getPayload } from 'payload'

import config from '@payload-config'
import { seed } from './index'

const main = async (): Promise<void> => {
  const payload = await getPayload({ config })
  const payloadReq = await createLocalReq({}, payload)
  await seed({ payload, req: payloadReq })
  payload.logger.info('CLI seed finished.')
}

void main()
  .then(() => process.exit(0))
  .catch((e: unknown) => {
    console.error(e)
    process.exit(1)
  })
