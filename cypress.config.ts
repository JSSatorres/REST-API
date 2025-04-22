import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implementa eventos de Node si es necesario
    },
    baseUrl: 'http://localhost:5000', // Cambia esto según tu configuración
    specPattern: 'cypress/integration/**/*.spec.ts', // Asegúrate de usar `.ts` para TypeScript
    supportFile: 'cypress/support/index.ts'
  }
})
