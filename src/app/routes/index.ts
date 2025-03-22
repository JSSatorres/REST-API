import { Router } from 'express'
import { glob } from 'glob'
import { pathToFileURL } from 'url'
import path from 'path'

export async function registerRoutes(router: Router) {
  const isDevelopment = process.env.NODE_ENV === 'development'
  // Buscamos los archivos sin extensión
  const routesPattern = isDevelopment ? 'src/app/routes/**/*.route' : 'dist/app/routes/**/*.route'
  // Definimos la extensión a agregar según el entorno
  const extension = isDevelopment ? '.ts' : '.js'

  const routes = await glob(routesPattern, { absolute: true })

  await Promise.all(routes.map(route => register(route + extension, router)))
}

async function register(routePath: string, router: Router) {
  const moduleUrl = pathToFileURL(routePath).href
  const routeModule = await import(moduleUrl)
  // Suponiendo que cada módulo exporta una función register
  routeModule.register(router)
}
