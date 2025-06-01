FROM node:20.11.0-alpine

# Crear el directorio de trabajo
RUN mkdir -p /var/www/ol_prueba_back
WORKDIR /var/www/ol_prueba_back

# Copiar archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --omit=dev
RUN npm install -g @nestjs/cli

# Copiar el resto del código fuente
COPY . .

# Generar los tipos de Prisma
RUN npx prisma generate
# Compilar el proyecto
RUN npm run build

# Crear usuario sin contraseña y asignar permisos
RUN adduser --disabled-password oluser
RUN chown -R oluser:oluser /var/www/ol_prueba_back
USER oluser

EXPOSE 3000

# Ejecutar app con el código compilado
CMD ["npm", "run", "start:prod"]
