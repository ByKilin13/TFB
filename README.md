# ReservaEspacios

Aplicación web para la gestión centralizada de reservas de espacios compartidos, desarrollada como Trabajo Final de Bàtxelor en Informática.

El sistema permite registrar usuarios, iniciar sesión, consultar espacios disponibles, crear reservas, consultar las reservas propias y cancelarlas. También dispone de un panel administrativo para gestionar los espacios y supervisar las reservas registradas.

## Funcionalidades principales

- Registro de usuarios.
- Inicio y cierre de sesión.
- Autenticación mediante token.
- Consulta de espacios activos.
- Creación de reservas.
- Consulta y filtrado de reservas propias.
- Cancelación de reservas sin eliminar el historial.
- Prevención de reservas solapadas.
- Validación de franjas horarias.
- Restricción de reservas sobre espacios inactivos.
- Protección frente al acceso o cancelación de reservas ajenas.
- Gestión administrativa de espacios y reservas.
- Interfaz adaptable a diferentes tamaños de pantalla.

## Arquitectura

La aplicación sigue una arquitectura cliente-servidor dividida en tres componentes:

1. **Frontend:** desarrollado con React y JavaScript. Muestra la interfaz, recoge los datos y realiza peticiones a la API.
2. **Backend:** desarrollado con Python, Django y Django REST Framework. Gestiona la autenticación, los permisos, las reglas de negocio y los endpoints.
3. **Base de datos:** SQLite almacena los usuarios, espacios, reservas y tokens.

Flujo general:


React -> API REST -> Django -> SQLite

React <- Respuesta JSON
```

Direcciones utilizadas durante el desarrollo local:

```text
Frontend: http://localhost:5173/
Backend:  http://127.0.0.1:8000/
Admin:    http://127.0.0.1:8000/admin/
```

## Tecnologías utilizadas

### Frontend

- React.
- JavaScript.
- HTML5.
- CSS3.
- React Router.
- Vite.

### Backend

- Python.
- Django.
- Django REST Framework.
- Token Authentication.
- django-cors-headers.

### Persistencia y herramientas

- SQLite.
- Git y GitHub.
- Visual Studio Code.

## Requisitos previos

Antes de instalar el proyecto es necesario disponer de:

- Python 3.10 o posterior.
- Node.js y npm.
- Git.
- Un navegador web actualizado.


## Descarga del proyecto

Clonar el repositorio:

```powershell
git clone https://github.com/ByKilin13/TFB.git
cd reservas_espacios
```



## Instalación del backend

Acceder a la carpeta del backend:

```powershell
cd backend
```

Crear un entorno virtual:

```powershell
python -m venv .venv
```

Activarlo en Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Instalar las dependencias:

```powershell
python -m pip install -r requirements.txt
```

## Migraciones de la base de datos

Aplicar las migraciones:

```powershell
python manage.py migrate
```

Comprobar la configuración del proyecto:

```powershell
python manage.py check
```

## Creación de un administrador

Crear una cuenta con acceso a Django Admin:

```powershell
python manage.py createsuperuser
```

Después de iniciar el backend, el panel administrativo estará disponible en:

```text
http://127.0.0.1:8000/admin/
```

Desde este panel se pueden crear, modificar, activar o desactivar espacios y consultar las reservas almacenadas.

## Ejecución del backend

Desde la carpeta `backend`, con el entorno virtual activo:

```powershell
python manage.py runserver
```

El backend quedará disponible en:

```text
http://127.0.0.1:8000/
```

## Instalación del frontend

Abrir otra terminal y acceder a la carpeta del frontend:

```powershell
cd frontend
```

Instalar las dependencias:

```powershell
npm install
```

## Ejecución del frontend

Desde la carpeta `frontend`:

```powershell
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173/
```

El backend y el frontend deben permanecer ejecutándose simultáneamente.

## Ejecución completa

### Terminal 1: backend

```powershell
cd backend
.venv\Scripts\Activate.ps1
python manage.py runserver
```

### Terminal 2: frontend

```powershell
cd frontend
npm run dev
```

Después, abrir en el navegador:

```text
http://localhost:5173/
```

## Creación de usuarios de prueba

### Desde React

1. Iniciar el backend y el frontend.
2. Acceder a `http://localhost:5173/registro`.
3. Introducir un nombre de usuario, un correo electrónico y una contraseña.
4. Al finalizar el registro, la aplicación generará un token y considerará autenticado al usuario.

El sistema no permite registrar nombres de usuario ni correos electrónicos repetidos.

### Desde Django Admin

1. Acceder a `http://127.0.0.1:8000/admin/`.
2. Iniciar sesión con el superusuario.
3. Abrir la sección de usuarios.
4. Crear una cuenta de prueba.

Los usuarios finales no deben tener activadas las opciones de personal ni de superusuario.

## Datos iniciales recomendados

Para probar la aplicación se recomienda crear varios espacios desde Django Admin.

Ejemplo:

```text
Nombre: Sala 1
Descripción: Sala destinada a reuniones de grupo
Capacidad: 10
Localización: Planta 1
Activo: Sí
```

Otro ejemplo:

```text
Nombre: Sala 2
Descripción: Espacio compartido para trabajo individual
Capacidad: 20
Localización: Planta 2
Activo: Sí
```

## Endpoints principales

### Registro

```http
POST /api/registro/
```

Ejemplo:

```json
{
  "username": "usuario_prueba",
  "email": "usuario@ejemplo.com",
  "password": "contrasena123"
}
```

### Inicio de sesión

```http
POST /api/login/
```

Ejemplo:

```json
{
  "username": "usuario_prueba",
  "password": "contrasena123"
}
```

La respuesta contiene el token del usuario.

### Consulta de espacios activos

```http
GET /api/espacios/
```

No requiere autenticación.

### Consulta de reservas propias

```http
GET /api/reservas/
```

Requiere esta cabecera:

```text
Authorization: Token VALOR_DEL_TOKEN
```

### Creación de una reserva

```http
POST /api/reservas/
```

Ejemplo:

```json
{
  "espacio": 1,
  "fecha": "2026-09-15",
  "hora_inicio": "10:00",
  "hora_fin": "11:00"
}
```

La API asigna automáticamente el usuario autenticado y el estado inicial.

### Cancelación de una reserva

```http
POST /api/reservas/{id}/cancelar/
```

La reserva debe pertenecer al usuario autenticado. La operación cambia su estado a `cancelada`, pero no elimina el registro.

## Reglas de negocio

- La hora final debe ser posterior a la hora de inicio.
- El espacio debe estar activo.
- No pueden existir reservas activas solapadas para el mismo espacio y fecha.
- Las reservas consecutivas están permitidas.
- Una reserva cancelada deja libre su franja horaria.
- Cada usuario solo puede consultar y cancelar sus propias reservas.
- El usuario de una reserva se asigna automáticamente mediante el token.

## Estructura de carpetas

```text
reservas_espacios/
|-- backend/
|   |-- config/
|   |   |-- settings.py
|   |   |-- urls.py
|   |   |-- asgi.py
|   |   `-- wsgi.py
|   |-- reservas/
|   |   |-- migrations/
|   |   |-- admin.py
|   |   |-- models.py
|   |   |-- serializers.py
|   |   |-- urls.py
|   |   `-- views.py
|   |-- manage.py
|   `-- requirements.txt
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- App.jsx
|   |   |-- App.css
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- package.json
|   `-- vite.config.js
|-- .gitignore
`-- README.md
```


## Limitaciones

- La aplicación se ejecuta y se ha validado en un entorno local.
- Se utiliza SQLite como base de datos.
- No se han realizado pruebas de carga o concurrencia.
- El token se almacena localmente en el navegador.
- No existe un calendario visual de disponibilidad.
- Las funciones administrativas se realizan mediante Django Admin.
- No se incluyen notificaciones, pagos, integración con calendarios, aplicación móvil ni analítica avanzada.
- No se ha preparado un despliegue de producción.


## Autor

**Nicolás Kilin Guindo**

Trabajo Final de Bàtxelor en Informática, curso académico 2025-2026.


