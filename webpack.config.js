const path = require('path')

module.exports = {
  entry: './src/app/start.ts', // Punto de entrada de tu aplicación
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'] // Resuelve las extensiones
  },
  output: {
    filename: 'bundle.js', // Nombre del archivo de salida
    path: path.resolve(__dirname, 'dist') // Carpeta de salida
  },
  target: 'node', // Indica que el destino es Node.js
  mode: 'production' // Establece el modo a producción para optimizaciones
}
