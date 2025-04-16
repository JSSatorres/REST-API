import path from 'path'
import fs from 'fs'

export async function analyzeRoutesFromFiles(files: string[]): Promise<Record<string, any>> {
  const tempFile = path.resolve(process.cwd(), 'temp-swagger.json')

  const swaggerAutogen = (await import('swagger-autogen')).default

  const tempDoc = { openapi: '3.0.0' }

  await swaggerAutogen({ openapi: '3.0.0' })(tempFile, files, tempDoc)

  const tempSwagger = JSON.parse(fs.readFileSync(tempFile, 'utf8'))

  fs.unlinkSync(tempFile)

  return tempSwagger.paths || {}
}
