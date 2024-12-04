# Usa una imagen base de Node.js, en este caso la versión 14 en un sistema base Alpine
FROM node:14-alpine

# Añade metadatos de la imagen
LABEL version="1.0" description="Aplicación Node.js en producción" maintainer="tu_email@dominio.com"

# Define un argumento para la versión de la aplicación
ARG APP_VERSION=1.0

# Establece variables de entorno
ENV NODE_ENV=production
ENV APP_VERSION=$APP_VERSION

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias y las instala
COPY package*.json ./
RUN npm install --only=production

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 3003

# Define el punto de entrada y comando principal
ENTRYPOINT ["node"]
CMD ["index.js"]

# Verificación de salud para asegurar que la aplicación esté activa
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD curl -f http://89.116.50.229:3003 || exit 1