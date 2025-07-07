# INK Chat

<div style="width: 100%; display: flex; justify-content: center; margin-block: 1rem;">
  <img src="./assets/favicon.svg" width="100" height="100" />
</div>

**Ink Chat** es una aplicación de chat en tiempo real, donde los usuarios pueden mandar mensajes a otras personas, ver sus mensajes, mantener un historial de mensajes, y ver los usuarios que están en línea. Esta aplicación fue realizada utilizando tecnologías como React, TypeScript, Shadcn, NodeJS, Express, PostgreSQL y Socket.IO

<!-- 🔗 **Visítalo aquí:** [Interstellar Code](https://ink-chat.netlify.app) -->

## 🚀 Características

- ✅ Aplicación con comunicación por Websockets.
- ✅ Sistema Full-Stack realizado con el Stack PERN.
- ✅ Shadcn como framework de UI para crear diseños minimalistas, modernos y atractivos.
- ✅ Estilos modernos y responsive.
- ✅ Base de datos relacional utilizando PostgreSQL.
- ✅ Deploy en la nube de AWS.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Descripción |
|------------|-------------|
| [React](https://react.dev/) | Framework moderno para aplicaciones web |
| [Express](https://expressjs.com/) | Framework para crear servicios API RESTful. |
| [Socket.IO](https://socket.io/) | Librería para manejar websockets tanto en el servidor como en el cliente. |
| [PostgreSQL](https://www.postgresql.org/) | Base de datos relacional altamente escalable. |

---

## 📦 Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/chicho69-cesar/ink-chat.git
cd ink-chat

# Frontend
cd frontend
# Instalar dependencias
npm install
# Ejecutar en modo desarrollo
npm run dev

# Backend
cd backend
# Instalar dependencias
npm install
# Levantar base de datos
docker compose up -d
# Ejecutar en modo desarrollo
npm run start

# (Opcional) Usar docker
docker build -t ink-chat .

# Levantar contenedor
docker container run -dp 8080:8080 `
> --name ink-chat `
> --network backend_ink_network `
> --env-file .env `
> ink-chat:1.0.0
```

La aplicación estará disponible en <http://localhost:5173>

## 📂 Estructura del proyecto

```txt
ink-chat/frontend
│
├── public/             # Archivos públicos como imágenes
├── src/
│   ├── auth/           # Modulo de autenticación
│   ├── chat/           # Modulo de chat
│   ├── components/     # Componentes de shadcn
│   ├── lib/            # Herramientas para la aplicación
│   ├── router/         # Páginas y rutas de la aplicación
└── package.json        # Dependencias y scripts
```

```txt
ink-chat/backend
│
├── public/             # Archivos públicos como imágenes
├── src/
│   ├── controllers/    # Controladores de la aplicación
│   ├── database/       # Configuración de la base de datos
│   ├── helpers/        # Funciones helpers para la aplicación
│   ├── middlewares/    # Middlewares personalizados
│   ├── models/         # Modelos de la base de datos
│   ├── public/         # Archivos estáticos
│   ├── routes/         # Rutas de la API
└── package.json        # Dependencias y scripts
```

## 🤝 Contribuciones

¿Quieres contribuir con ideas o mejoras? ¡Bienvenido! Puedes:

- Hacer un fork del proyecto.
- Crear una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
- Hacer tus cambios.
- Crear un pull request.
