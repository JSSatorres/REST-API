import swaggerAutogen from 'swagger-autogen'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const outputFile = path.resolve(process.cwd(), 'swagger-output.json')

// Encuentra todos los archivos de rutas directamente
async function findRouteFiles() {
  const routesPattern = 'src/app/routes/**/*.route.ts'
  const routeFiles = await glob(routesPattern, { absolute: true })
  console.log('Archivos de rutas encontrados:', routeFiles)
  return routeFiles
}

// Configura la documentación
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

// Ejecuta el proceso
;(async () => {
  const routeFiles = await findRouteFiles()
  // Siempre incluye server.ts para configuración general
  const endpointsFiles = [path.resolve(process.cwd(), 'src/app/server.ts'), ...routeFiles]

  try {
    await swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
    console.log(`Documentación de Swagger generada en: ${outputFile}`)
  } catch (error) {
    console.error('Error al generar la documentación de Swagger:', error)
  }
})()
