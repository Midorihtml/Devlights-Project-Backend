# Documentación de la API de Autenticación

## Endpoints disponibles

### 1. Registro de usuario

- **URL:** `/auth/register`
- **Método:** `POST`
- **Body requerido (JSON):**
  - `name` (string, requerido)
  - `lastname` (string, requerido)
  - `email` (string, requerido)
  - `password` (string, requerido)
- **Respuesta exitosa:**
  - Código: `201`
  - Ejemplo:
    ```json
    {
      "code": 201,
      "msg": "Usuario registrado correctamente.",
      "data": null
    }
    ```
- **Ejemplo cURL:**
  ```bash
  curl -X POST http://localhost:3000/auth/register \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Juan",
      "lastname": "Pérez",
      "email": "juan@example.com",
      "password": "123456"
    }'
  ```

---

### 2. Login de usuario

- **URL:** `/auth/login`
- **Método:** `POST`
- **Body requerido (JSON):**
  - `email` (string, requerido)
  - `password` (string, requerido)
- **Respuesta exitosa:**
  - Código: `200`
  - Ejemplo:
    ```json
    {
      "code": 200,
      "msg": "Login exitoso.",
      "data": {
        "token": "<jwt_token>"
      }
    }
    ```
- **Ejemplo cURL:**
  ```bash
  curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "juan@example.com",
      "password": "123456"
    }'
  ```

---

### 3. Recuperar contraseña (falta implementación)

- **URL:** `/auth/forgot`
- **Método:** `POST`
- **Body requerido (JSON):**
  - `email` (string, requerido)
- **Respuesta exitosa:**
  - Código: `200`
  - Ejemplo:
    ```json
    {
      "code": 200,
      "msg": "Correo de recuperación enviado.",
      "data": null
    }
    ```
- **Ejemplo cURL:**
  ```bash
  curl -X POST http://localhost:3000/auth/forgot \
    -H "Content-Type: application/json" \
    -d '{
      "email": "juan@example.com"
    }'
  ```

---

### 4. Cambiar contraseña

- **URL:** `/auth/change-password`
- **Método:** `PATCH`
- **Body requerido (JSON):**
  - `email` (string, requerido)
  - `oldPassword` (string, requerido)
  - `newPassword` (string, requerido)
- **Respuesta exitosa:**
  - Código: `200`
  - Ejemplo:
    ```json
    {
      "code": 200,
      "msg": "Contraseña actualizada correctamente.",
      "data": null
    }
    ```
- **Ejemplo cURL:**
  ```bash
  curl -X PATCH http://localhost:3000/auth/change-password \
    -H "Content-Type: application/json" \
    -d '{
      "email": "juan@example.com",
      "oldPassword": "123456",
      "newPassword": "654321"
    }'
  ```

---

### 5. Eliminar usuario

- **URL:** `/auth`
- **Método:** `DELETE`
- **Headers requeridos:**
  - `Authorization: Bearer <jwt_token>`
- **Respuesta exitosa:**
  - Código: `200`
  - Ejemplo:
    ```json
    {
      "code": 200,
      "msg": "Usuario eliminado correctamente.",
      "data": null
    }
    ```
- **Ejemplo cURL:**
  ```bash
  curl -X DELETE http://localhost:3000/auth \
    -H "Authorization: Bearer <jwt_token>"
  ```

---

## Notas

- Todos los endpoints retornan errores con un objeto JSON que incluye `code`, `msg` y `data`.
- Reemplaza `<jwt_token>` por el token real obtenido en el login.
- Cambia `localhost:3000` por la URL y puerto de tu servidor si es diferente.
