# Imagen base con Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto en el que corre Vite por defecto
EXPOSE 5173

# Comando por defecto
CMD ["npm", "run", "build", "--", "--host"]
