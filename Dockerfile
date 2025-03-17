# 1️⃣ Usa una imagen base ligera de Node.js
FROM node:18-alpine

# 2️⃣ Establece el directorio de trabajo
WORKDIR /app

# 3️⃣ Copia los archivos de dependencias primero para aprovechar la caché
COPY package*.json ./

# 4️⃣ Instala las dependencias
RUN npm install

# 5️⃣ Copia el código fuente
COPY . .

# 6️⃣ Compila TypeScript
RUN npm run build

# 7️⃣ Expone el puerto 5000 (según tu código en `start.ts`)
EXPOSE 5000

# 8️⃣ Comando de inicio del servidor
CMD ["node", "dist/app/start.js"]
