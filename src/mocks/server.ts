import { setupServer } from 'msw/node'
import { handlers } from './handlers.ts'

export const worker = setupServer(...handlers)
