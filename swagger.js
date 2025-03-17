import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'REST API - TypeScript + Express',
        version: '1.0.0',
        description: 'Documentación generada con Swagger'
    },
    servers: [
        {
            url: 'http://localhost:5000'
        }
    ]
};
const options = {
    swaggerDefinition,
    apis: ['src/routes/**/*.ts']
};
const swaggerSpec = swaggerJSDoc(options);
export function setupSwagger(app) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
