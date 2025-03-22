import request from 'supertest'
import { Server } from '../../src/app/server'

let server: Server
let app: any

beforeAll(async () => {
  server = new Server('3001')
  await server.start()
  app = server.getHTTPServer()
})

afterAll(async () => {
  await server.stop()
})

describe('Server', () => {
  it('should return a 302 status for the root endpoint', async () => {
    const httpServer = server.getHTTPServer()
    if (!httpServer) throw new Error('HTTP server not initialized')
    const response = await request(httpServer).get('/')
    expect(response.status).toBe(302)
    expect(response.header.location).toBe('/docs')
  })

  it('should handle errors correctly', async () => {
    const httpServer = server.getHTTPServer()
    if (!httpServer) throw new Error('HTTP server not initialized')
    const response = await request(httpServer).get('/nonexistent')
    expect(response.status).toBe(404)
  })

  it('should return a 404 status for an unknown endpoint', async () => {
    const httpServer = server.getHTTPServer()
    if (!httpServer) throw new Error('HTTP server not initialized')
    const response = await request(httpServer).get('/unknown')
    expect(response.status).toBe(404)
  })

  it('should have security headers set by helmet', async () => {
    const httpServer = server.getHTTPServer()
    if (!httpServer) throw new Error('HTTP server not initialized')
    const response = await request(httpServer).get('/')
    expect(response.headers['x-dns-prefetch-control']).toBe('off')
    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN')
  })
})
