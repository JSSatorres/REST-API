import { glob } from 'glob'

export async function findRouteFiles(): Promise<string[]> {
  const routesPattern = 'src/app/routes/**/*.route.ts'
  const routeFiles = await glob(routesPattern, { absolute: true })
  return routeFiles
}
