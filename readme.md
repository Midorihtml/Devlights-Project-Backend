# Devlights Project Backend

Este proyecto es un backend en Node.js con TypeScript y MongoDB, usando Express y Mongoose.

## Requisitos

- Node.js >= 18
- npm >= 9
- MongoDB (local o remoto)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Midorihtml/Devlights-Project-Backend.git
   cd Devlights-Project-Backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz con el siguiente contenido:
     ```env
    NODE_ENV=develop
    
    PORT=3000
    HOST=localhost
    
    MONGO_INITDB_ROOT_USERNAME=example
    MONGO_INITDB_ROOT_PASSWORD=exmaple
    MONGO_INITDB_ROOT_DATABASE=example
    MONGO_INITDB_PORT=27017
    MONGO_CONNECTION_URI="mongodb://user:password@host:port/database?authSource=admin"
     ```
   - Ajusta los valores según tu entorno.

4. Inicia el servidor:
   ```bash
   npm run dev
   ```
   O para producción:
   ```bash
   npm start
   ```

## Scripts útiles

- `npm run dev`: Inicia el servidor en modo desarrollo con hot reload.
- `npm start`: Inicia el servidor en modo producción.

## Estructura del proyecto

```
src/
  controllers/
  database/
  models/
  repositories/
  routes/
  services/
  app.ts
  index.ts
compose.yml
package.json
tsconfig.json
```

## Endpoints principales

- `/auth/register` — Registro de usuario
- `/auth/login` — Login de usuario
- `/auth/forgot` — Recuperar contraseña
- `/auth/change-password` — Cambiar contraseña

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama para tu feature o fix.
3. Haz tus cambios y abre un Pull Request.

## Licencia

MIT
