import request from 'supertest'
import { Server } from '../../src/app/server.js'

let server: Server

beforeAll(async () => {
  server = new Server('5000')
  await server.start()
})

afterAll(async () => {
  await server.stop()
})

describe('Server', () => {
  it('should return a 200 status for the root endpoint', async () => {
    const httpServer = server.getHTTPServer()
    if (!httpServer) throw new Error('HTTP server not initialized')
    const response = await request(httpServer).get('/')
    expect(response.status).toBe(200)
  })

  it('should handle errors correctly', async () => {
    const httpServer = server.getHTTPServer()
    if (!httpServer) throw new Error('HTTP server not initialized')
    const response = await request(httpServer).get('/nonexistent')
    expect(response.status).toBe(500)
  })

  it('should return a 404 status for an unknown endpoint', async () => {
    const httpServer = server.getHTTPServer()
    if (!httpServer) throw new Error('HTTP server not initialized')
    const response = await request(httpServer).get('/unknown')
    expect(response.status).toBe(404)
  })

  it('should return a 200 status for the /docs endpoint', async () => {
    const httpServer = server.getHTTPServer()
    if (!httpServer) throw new Error('HTTP server not initialized')
    const response = await request(httpServer).get('/docs')
    expect(response.status).toBe(200)
  })

  it('should have security headers set by helmet', async () => {
    const httpServer = server.getHTTPServer()
    if (!httpServer) throw new Error('HTTP server not initialized')
    const response = await request(httpServer).get('/')
    expect(response.headers['x-dns-prefetch-control']).toBe('off')
    expect(response.headers['x-frame-options']).toBe('DENY')
  })
})
