import { Router } from 'express'
import { glob } from 'glob'
import { pathToFileURL } from 'url'

export async function registerRoutes(router: Router) {
  const routes = await glob('src/app/routes/**/*.route.*', { absolute: true })

  await Promise.all(routes.map(route => register(route, router)))
}

async function register(routePath: string, router: Router) {
  const moduleUrl = pathToFileURL(routePath).href
  const route = await import(moduleUrl)
  route.register(router)
}
