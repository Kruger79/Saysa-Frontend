# 🌿 Soluciones SaYsa

Sistema web para la gestión de cotizaciones, pedidos y seguimiento de productos importados para la industria bananera y piñera.

---

## 🧾 Descripción

**Soluciones SaYsa** es una aplicación moderna diseñada para facilitar la comunicación entre una gestora de pedidos y sus clientes. Permite:

- Visualizar productos tipo catálogo.
- Realizar cotizaciones y pedidos personalizados.
- Gestionar el estado de los pedidos.
- Automatizar el flujo de solicitudes vía WhatsApp.
- Ofrecer a la administradora una vista centralizada para control y análisis.

---

## 🧑‍💼 Usuarios

- **Cliente**
  - Se registra con cédula, correo y contraseña.
  - Puede consultar productos, cotizar y ver estado de sus pedidos.
  - Edita su número telefónico desde su perfil.

- **Administrador**
  - Visualiza dashboard con métricas claves.
  - Gestiona pedidos y cotizaciones recientes.
  - Tiene acceso a vista de estadísticas y configuración.

---

## ⚙️ Tecnologías

### 🖥️ Frontend

- **React** + Vite
- `react-icons`, `react-router-dom`
- Estilos personalizados con CSS puro
- Diseño responsivo y moderno

### 🔗 Backend

- **Node.js + Express**
- Base de datos: **SQL Server**
- Lógica de negocio separada por servicios
- Autenticación por rol (`admin`, `cliente`)

---

## 📦 Instalación

### Backend

1. Clonar el backend:
   ```bash
   git clone https://github.com/tu_usuario/Saysa-Backend.git
   ```
2. Instalar dependencias:
   ```bash
   cd Saysa-Backend
   npm install
   ```
3. Configurar `.env`:
   ```
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_SERVER=localhost
   DB_DATABASE=nombre_base_datos
   ```

4. Iniciar servidor:
   ```bash
   npm run dev
   ```

---

### Frontend

1. Clonar el frontend:
   ```bash
   git clone https://github.com/tu_usuario/Saysa-Frontend.git
   ```
2. Instalar dependencias:
   ```bash
   cd Saysa-Frontend
   npm install
   ```
3. Iniciar proyecto:
   ```bash
   npm run dev
   ```

---

## 📂 Estructura del frontend

```
📦 src
├── api/                # Lógica de conexión con backend
├── components/         # Componentes reutilizables (Navbar, ProductoCard, etc)
├── views/              # Vistas principales (Home, Login, Perfil, AdminDashboard)
├── routes/             # Rutas del sistema
├── public/css/         # Archivos de estilo CSS
```

---

## 🚀 Funcionalidades destacadas

- 🔐 Inicio de sesión con validación por cédula o correo.
- 🛍️ Catálogo tipo tienda con productos y precio base.
- 📦 Pedido directo con redirección automática a WhatsApp.
- 📊 Dashboard de administrador con métricas visuales.
- 📁 Vista de perfil con edición del teléfono.
- 🎨 Interfaz atractiva con logo, diseño limpio y responsivo.

---

## 📸 Vista previa

![Vista de Administrador](./public/img/screenshot-admin.png)
![Perfil Cliente](./public/img/screenshot-perfil.png)

---

## ✨ Créditos

Proyecto desarrollado como parte del curso de **Ingeniería de Software** - Universidad de Costa Rica  
💡 Por: Justin Gonzalez, Kendall Leon, Kevin Gonzalez y Mario Saborio

---