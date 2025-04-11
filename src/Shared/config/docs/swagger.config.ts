import swaggerAutogen from 'swagger-autogen'
import path from 'path'
import { glob } from 'glob'

const outputFile = path.resolve(process.cwd(), 'swagger-output.json')

async function findRouteFiles() {
  const routesPattern = 'src/app/routes/**/*.route.ts'
  const routeFiles = await glob(routesPattern, { absolute: true })

  return routeFiles
}

const doc = {
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
    const endpointsFiles = [path.resolve(process.cwd(), 'src/app/server.ts'), ...routeFiles]

    await swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
    console.log(`Documentación de Swagger generada en: ${outputFile}`)
  } catch (error) {
    console.error('Error al generar la documentación de Swagger:', error)
  }
})()
