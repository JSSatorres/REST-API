import path from 'path'

export function generateTagsFromRoutes(routeFiles: string[]): Array<{ name: string }> {
  const tags = routeFiles.map(file => {
    const baseName = path.basename(file, '.route.ts')
    return { name: baseName }
  })
  return tags
}
