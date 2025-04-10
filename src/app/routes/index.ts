import { Router } from 'express'
import { glob } from 'glob'
import { pathToFileURL } from 'url'

export async function registerRoutes(router: Router) {
  const isDevelopment = process.env.NODE_ENV === 'dev'
  const routesPattern = isDevelopment ? 'src/app/routes/**/*.route.ts' : 'dist/app/routes/**/*.route.js'

  const routes = await glob(routesPattern, { absolute: true })

  await Promise.all(routes.map(route => register(route, router)))
}

async function register(routePath: string, router: Router) {
  const moduleUrl = pathToFileURL(routePath).href

  const routeModule = await import(moduleUrl)
  routeModule.register(router)
}
