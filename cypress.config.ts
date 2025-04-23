import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implementa eventos de nodo aquí si es necesario
    },
    specPattern: 'cypress/integration/**/*.spec.ts',
    supportFile: 'cypress/support/index.ts',
    baseUrl: 'http://localhost:5000' // URL base de tu aplicación
  }
})
