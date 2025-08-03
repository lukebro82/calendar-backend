# Calendar Backend API

## URL

https://calendar-backend-wsxn.onrender.com

## Descripción

Esta es la API backend para una aplicación de calendario que permite a los usuarios autenticarse y gestionar sus eventos. La API está construida con TypeScript y utiliza MongoDB como base de datos.

## Características

- Sistema de autenticación JWT
- Registro y login de usuarios
- Renovación de tokens
- Gestión completa de eventos (CRUD)
- Validación de campos
- Conexión a MongoDB
- Middleware de autenticación
- Validaciones de fechas
- Manejo de permisos por usuario

## Tecnologías utilizadas

- Node.js
- Express.js (v5.1.0)
- MongoDB (v8.17.0)
- JWT (JSON Web Tokens)
- TypeScript
- bcryptjs (para encriptación de contraseñas)
- dotenv (para variables de entorno)
- cors (para manejo de CORS)
- express-validator (para validaciones)
- moment.js (para manejo de fechas)

## Requisitos previos

- Node.js (versión 14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone [url-del-repositorio]
```

2. Instalar dependencias:

```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
DB_CNN=tu_conexion_mongodb
SECRET_JWT_SEED=tu_secreto_jwt
PORT=4000
```

## Uso

1. Iniciar el servidor:

```bash
npm run dev
# o
yarn dev
```

2. Endpoints disponibles:

### Autenticación

- `POST /api/auth/new` - Crear nuevo usuario
- `POST /api/auth/` - Login de usuario
- `GET /api/auth/renew` - Renovar token (requiere token válido)

### Eventos (requieren token JWT)

- `GET /api/events/` - Obtener todos los eventos
- `POST /api/events/` - Crear nuevo evento
- `PUT /api/events/:id` - Actualizar evento existente
- `DELETE /api/events/:id` - Eliminar evento

## Estructura del proyecto

```
src/
├── controllers/
│   ├── auth.ts
│   └── events.ts
├── routes/
│   ├── auth.ts
│   └── events.ts
├── middlewares/
│   ├── validateToken.ts
│   ├── validateFields.ts
│   └── validations/
│       ├── auth.ts
│       └── events.ts
├── models/
│   ├── User.ts
│   └── Event.ts
├── lib/
│   └── mongodb.ts
└── helpers/
    ├── jwt.ts
    └── isDate.ts
```

## Seguridad

- Todas las contraseñas son encriptadas usando bcrypt
- Uso de JWT para autenticación
- Validación de campos en todos los endpoints
- Protección contra inyección de SQL
- Validación de fechas usando moment.js
- Middleware de autenticación para endpoints protegidos
- Control de permisos por usuario para eventos

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
