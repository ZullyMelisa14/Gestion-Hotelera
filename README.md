# 🏨 Gestión Hotelera

Sistema web para la gestión integral de un hotel, desarrollado con **React/Next.js** y **Firebase**.

---
<<<<<<< HEAD

## 🚀 Funcionalidades principales

- **Gestión de empleados:**  
  Alta, edición, listado y control de empleados del hotel.

- **Gestión de habitaciones:**  
  Registro, edición y visualización de habitaciones disponibles y ocupadas.

- **Reservas:**  
  Creación y seguimiento de reservas de habitaciones.

- **Cocina:**  
  Gestión de pedidos de cocina, cambio de estado, detalle y filtrado de pedidos.

- **Autenticación:**  
  Login y registro de usuarios con Firebase Auth.

---

## 🗂️ Estructura de carpetas relevante

```bash
app
├── api
│   ├── auth
│   │   ├── [...nextauth]
│   │   └── route.js
│   ├── empleados
│   │   ├── route.js
│   │   └── [...slug]
│   ├── habitaciones
│   │   ├── route.js
│   │   └── [...slug]
│   └── reservas
│       ├── route.js
│       └── [...slug]
├── components
│   ├── Auth
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── Dashboard
│   │   ├── Empleados.jsx
│   │   ├── Habitaciones.jsx
│   │   └── Reservas.jsx
│   ├── Layout
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   └── UI
│       ├── Button.jsx
│       ├── Modal.jsx
│       └── Table.jsx
├── context
│   ├── AuthContext.js
│   ├── EmpleadoContext.js
│   ├── HabitacionContext.js
│   └── ReservaContext.js
├── hooks
│   ├── useAuth.js
│   ├── useEmpleados.js
│   ├── useHabitaciones.js
│   └── useReservas.js
├── middleware
│   └── authMiddleware.js
├── pages
│   ├── api
│   │   ├── auth
│   │   │   ├── [...nextauth].js
│   │   │   └── route.js
│   │   ├── empleados
│   │   │   ├── route.js
│   │   │   └── [...slug].js
│   │   ├── habitaciones
│   │   │   ├── route.js
│   │   │   └── [...slug].js
│   │   └── reservas
│   │       ├── route.js
│   │       └── [...slug].js
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   ├── login.js
│   ├── register.js
│   ├── dashboard
│   │   ├── empleados.js
│   │   ├── habitaciones.js
│   │   └── reservas.js
│   └──404.js
├── postcss.config.js
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.js
├── public
│   ├── images
│   └── favicon.ico
├── styles
│   ├── globals.css
│   └── Home.module.css
├── tailwind.config.js
└── utils
    ├── api.js
    ├── auth.js
    ├── empleados.js
    ├── habitaciones.js
    └── reservas.js
```

---

## 📚 Recursos adicionales

- **Documentación de Next.js:**  
  Aprende sobre las características y la API de Next.js.

- **Tutorial interactivo de Next.js:**  
  Un curso práctico para aprender Next.js.

- **Repositorio de Next.js en GitHub:**  
  Tu retroalimentación y contribuciones son bienvenidas.

---

## 🚀 Despliegue en Vercel

La forma más sencilla de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

=======

## 🚀 Funcionalidades principales

- **Gestión de empleados:**  
  Alta, edición, listado y control de empleados del hotel.

- **Gestión de habitaciones:**  
  Registro, edición y visualización de habitaciones disponibles y ocupadas.

- **Reservas:**  
  Creación y seguimiento de reservas de habitaciones.

- **Cocina:**  
  Gestión de pedidos de cocina, cambio de estado, detalle y filtrado de pedidos.

- **Autenticación:**  
  Login y registro de usuarios con Firebase Auth.

---


## 📚 Recursos adicionales

- **Documentación de Next.js:**  
  Aprende sobre las características y la API de Next.js.

- **Tutorial interactivo de Next.js:**  
  Un curso práctico para aprender Next.js.

- **Repositorio de Next.js en GitHub:**  
  Tu retroalimentación y contribuciones son bienvenidas.

---

## 🚀 Despliegue en Vercel

La forma más sencilla de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

>>>>>>> b3dca9cc40147a69ef1d0e409089cd53f9ccd7e6
Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
