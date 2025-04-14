import swaggerAutogen from 'swagger-autogen'
import path from 'path'
import { glob } from 'glob'
import fs from 'fs'

const outputFile = path.resolve(process.cwd(), 'swagger-output.json')

async function findRouteFiles() {
  const routesPattern = 'src/app/routes/**/*.route.ts'
  const routeFiles = await glob(routesPattern, { absolute: true })
  return routeFiles
}

function generateTagsFromRoutes(routeFiles: string[]) {
  const tags = routeFiles.map(file => {
    const baseName = path.basename(file, '.route.ts')
    return {
      name: baseName
    }
  })
  return tags
}

const doc: Record<string, any> = {
  openapi: '3.0.0',
  info: {
    title: 'REST API - TypeScript + Express',
    description: 'API generada automáticamente con swagger-autogen',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Servidor de desarrollo'
    }
  ],
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

;(async () => {
  try {
    const routeFiles = await findRouteFiles()
    const tags = generateTagsFromRoutes(routeFiles)
    doc.tags = tags
    const endpointsFiles = [path.resolve(process.cwd(), 'src/app/server.ts'), ...routeFiles]

    await swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)

    setTimeout(async () => {
      try {
        const swaggerDoc = JSON.parse(fs.readFileSync(outputFile, 'utf8'))

        Object.entries(swaggerDoc.paths).forEach(([path, methods]) => {
          const routeBase = path.split('/').filter(Boolean)[0] || 'default'
          const matchingTag = tags.find(tag => tag.name === routeBase)

          if (matchingTag) {
            Object.values(methods as object).forEach(operation => {
              ;(operation as any).tags = [matchingTag.name]
            })
          }
        })

        fs.writeFileSync(outputFile, JSON.stringify(swaggerDoc, null, 2))
        console.log(`✅ Documentación actualizada con tags asignados en: ${outputFile}`)
      } catch (err) {
        console.error('❌ Error al modificar la documentación:', err)
      }
    }, 1000)
  } catch (error) {
    console.error('❌ Error al generar la documentación de Swagger:', error)
  }
})()
