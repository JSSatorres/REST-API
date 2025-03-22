import { Server } from './server'

const port = process.env.PORT || '5000'
const server = new Server(port)

server.start().catch(err => {
  console.error('❌ Error al iniciar el servidor:', err)
  process.exit(1)
})

process.on('uncaughtException', err => {
  console.error('🔥 Uncaught Exception:', err)
  shutdown()
})

process.on('SIGINT', () => {
  console.log('🔴 SIGINT recibido. Apagando servidor...')
  shutdown()
})

process.on('SIGTERM', () => {
  console.log('🔴 SIGTERM recibido. Apagando servidor...')
  shutdown()
})

async function shutdown() {
  await server.stop()
  process.exit(0)
}
