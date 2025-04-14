import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import fs from 'fs'
import path from 'path'

export function setupSwagger(app: Express) {
  const swaggerFilePath = path.resolve(process.cwd(), 'swagger-output.json')

  if (fs.existsSync(swaggerFilePath)) {
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'))
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    return
  }
  console.error('Archivo swagger-output.json no encontrado. Ejecute npm run swagger para generarlo.')

  app.use('/docs', (req, res) => {
    res.status(500).send('La documentación de Swagger no está disponible. Ejecute npm run swagger.')
  })
}
