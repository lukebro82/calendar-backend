# Calendar Backend API

## Descripción
Esta es la API backend para una aplicación de calendario que permite a los usuarios autenticarse y gestionar sus eventos.

## Características

- Sistema de autenticación JWT
- Registro de usuarios
- Login de usuarios
- Renovación de tokens
- Validación de campos
- Conexión a MongoDB

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- TypeScript
- bcryptjs (para encriptación de contraseñas)
- dotenv (para variables de entorno)

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
Crear un archivo `.env` en la raíz del proyecto.

## Uso

1. Iniciar el servidor:
```bash
npm run dev
# o
yarn dev
```

2. Endpoints disponibles:

- `POST /api/auth/new` - Crear nuevo usuario
- `POST /api/auth/` - Login de usuario
- `GET /api/auth/renew` - Renovar token (requiere token válido)

## Estructura del proyecto

```
src/
├── controllers/
│   └── auth.ts
├── routes/
│   └── auth.ts
├── middlewares/
│   ├── validateToken.ts
│   ├── validateFields.ts
│   └── validations/
│       └── auth.ts
├── models/
│   └── User.ts
├── lib/
│   └── mongodb.ts
└── helpers/
    └── jwt.ts
```

## Seguridad

- Todas las contraseñas son encriptadas usando bcrypt
- Uso de JWT para autenticación
- Validación de campos en todos los endpoints
- Protección contra inyección de SQL

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


