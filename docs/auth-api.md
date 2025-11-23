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
  `bash
	curl -X POST http://localhost:3000/auth/register \
		-H "Content-Type: application/json" \
		-d '{
			"name": "Juan",
			"lastname": "Pérez",
			"email": "juan@example.com",
			"password": "123456"
		}'
	`

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
      "msg": "success",
      "data": {
        "accessToken": "<jwt_token>",
        "refreshToken": "<refresh_token>"
      }
    }
    ```
- **Ejemplo cURL:**
  `bash
	curl -X POST http://localhost:3000/auth/login \
		-H "Content-Type: application/json" \
		-d '{
			"email": "juan@example.com",
			"password": "123456"
		}'
	`

---

### 3. Recuperar contraseña

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
      "msg": "Email de recuperación enviado correctamente.",
      "data": null
    }
    ```
- **Ejemplo cURL:**
  `bash
	curl -X POST http://localhost:3000/auth/forgot \
		-H "Content-Type: application/json" \
		-d '{
			"email": "juan@example.com"
		}'
	`

---

### 4. Refrescar token de acceso

- **URL:** `/auth/refresh`
- **Método:** `POST`
- **Headers requeridos:**
  - `Authorization: Bearer <refresh_token>`
- **Respuesta exitosa:**
  - Código: `200`
  - Ejemplo:
    ```json
    {
      "code": 200,
      "msg": "Token de acceso generado correctamente",
      "data": {
        "accessToken": "<nuevo_access_token>"
      }
    }
    ```
- **Ejemplo cURL:**
  `bash
	curl -X POST http://localhost:3000/auth/refresh \
		-H "Authorization: Bearer <refresh_token>"
	`

---

### 5. Resetear contraseña (requiere token de recuperación)

- **URL:** `/auth/reset-password`
- **Método:** `PATCH`
- **Headers requeridos:**
  - `Authorization: Bearer <forgot_token>`
- **Body requerido (JSON):**
  - `newPassword` (string, requerido)
  - `confirmPassword` (string, requerido)
- **Respuesta exitosa:**
  - Código: `200`
  - Ejemplo:
    ```json
    {
      "code": 200,
      "msg": "Contraseña actualizada correctamente",
      "data": true
    }
    ```
- **Ejemplo cURL:**
  `bash
	curl -X PATCH http://localhost:3000/auth/reset-password \
		-H "Authorization: Bearer <forgot_token>" \
		-H "Content-Type: application/json" \
		-d '{
			"newPassword": "nueva123",
			"confirmPassword": "nueva123"
		}'
	`

---

### 6. Obtener todos los usuarios (protegido)

- **URL:** `/auth/`
- **Método:** `GET`
- **Headers requeridos:**
  - `Authorization: Bearer <access_token>`
- **Respuesta exitosa:**
  - Código: `200`
  - Ejemplo:
    ```json
    {
      "code": 200,
      "msg": "success",
      "data": [
        {
          "_id": "...",
          "name": "...",
          "lastname": "...",
          "email": "..."
        }
      ]
    }
    ```
- **Ejemplo cURL:**
  `bash
	curl -X GET http://localhost:3000/auth/ \
		-H "Authorization: Bearer <access_token>"
	`

---

### 7. Actualizar usuario (protegido)

- **URL:** `/auth/`
- **Método:** `PATCH`
- **Headers requeridos:**
  - `Authorization: Bearer <access_token>`
- **Body requerido (JSON):**
  - `name` (string, requerido)
  - `lastname` (string, requerido)
- **Respuesta exitosa:**
  - Código: `200`
  - Ejemplo:
    ```json
    {
      "code": 200,
      "msg": "Usuario actualizado correctamente.",
      "data": {
        "_id": "...",
        "name": "...",
        "lastname": "...",
        "email": "..."
      }
    }
    ```
- **Ejemplo cURL:**
  `bash
	curl -X PATCH http://localhost:3000/auth/ \
		-H "Authorization: Bearer <access_token>" \
		-H "Content-Type: application/json" \
		-d '{
			"name": "NuevoNombre",
			"lastname": "NuevoApellido"
		}'
	`

---

### 8. Cambiar contraseña (protegido)

- **URL:** `/auth/change-password`
- **Método:** `PATCH`
- **Headers requeridos:**
  - `Authorization: Bearer <access_token>`
- **Body requerido (JSON):**
  - `password` (string, requerido)
  - `newPassword` (string, requerido)
  - `confirmPassword` (string, requerido)
- **Respuesta exitosa:**
  - Código: `200`
  - Ejemplo:
    ```json
    {
      "code": 200,
      "msg": "Contraseña actualizada correctamente",
      "data": true
    }
    ```
- **Ejemplo cURL:**
  `bash
	curl -X PATCH http://localhost:3000/auth/change-password \
		-H "Authorization: Bearer <access_token>" \
		-H "Content-Type: application/json" \
		-d '{
			"password": "actual123",
			"newPassword": "nueva123",
			"confirmPassword": "nueva123"
		}'
	`

---

### 9. Eliminar usuario (protegido)

- **URL:** `/auth/`
- **Método:** `DELETE`
- **Headers requeridos:**
  - `Authorization: Bearer <access_token>`
- **Respuesta exitosa:**
  - Código: `200`
  - Ejemplo:
    ```json
    {
      "code": 200,
      "msg": "Usuario eliminado correctamente.",
      "data": true
    }
    ```
- **Ejemplo cURL:**
  `bash
	curl -X DELETE http://localhost:3000/auth/ \
		-H "Authorization: Bearer <access_token>"
	`

---

## Notas

- Todos los endpoints retornan errores con un objeto JSON que incluye `code`, `msg` y `data`.
- Reemplaza `<access_token>`, `<refresh_token>`, `<forgot_token>` por los tokens reales obtenidos en el login o recuperación.
- Cambia `localhost:3000` por la URL y puerto de tu servidor si es diferente.
