import path from 'path'
import fs from 'fs'
import { findRouteFiles } from './utils/findRouteFiles'
import { generateTagsFromRoutes } from './utils/generateTags'
import { analyzeRoutesFromFiles } from './utils/analyzeRoutes'

const outputFile = path.resolve(process.cwd(), 'swagger-output.json')

async function generateSwaggerDocs() {
  try {
    const routeFiles = await findRouteFiles()
    const tags = generateTagsFromRoutes(routeFiles)

    const routePathsMap = await analyzeRoutesFromFiles([
      path.resolve(process.cwd(), 'src/app/server.ts'),
      ...routeFiles
    ])

    const swaggerDoc = {
      openapi: '3.0.0',
      info: {
        title: 'REST API - TypeScript + Express',
        description: 'API generada automáticamente',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost:5000',
          description: 'Servidor de desarrollo'
        }
      ],
      tags,
      paths: {} as Record<string, any>,
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    }

    Object.entries(routePathsMap).forEach(([path, methodsObj]) => {
      swaggerDoc.paths[path] = {}

      const routeBase = path.split('/').filter(Boolean)[0] || 'default'
      const matchingTag = tags.find(tag => tag.name === routeBase)

      Object.entries(methodsObj).forEach(([method, operation]) => {
        if (matchingTag) {
          ;(operation as { tags: string[] }).tags = [matchingTag.name]
        }

        swaggerDoc.paths[path][method.toLowerCase()] = operation
      })
    })

    fs.writeFileSync(outputFile, JSON.stringify(swaggerDoc, null, 2))
    console.log(`✅ Documentación de Swagger generada en: ${outputFile}`)
  } catch (error) {
    console.error('❌ Error al generar la documentación de Swagger:', error)
  }
}

generateSwaggerDocs()
