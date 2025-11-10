# Botify Pro

Plataforma de gestión de bots que hemos construido con Next.js 14 y FastAPI.

## Stack Tecnológico

- **Frontend**: Next.js 14 (App Router, TypeScript, Tailwind CSS)
- **Backend**: Python FastAPI (Vercel Serverless Functions)

## Estructura del Proyecto

```
Botify_pro/
├── app/              # Next.js App Router
│   ├── page.tsx      # Página principal
│   ├── layout.tsx    # Layout principal
│   ├── globals.css   # Estilos globales
│   └── quienes-somos/# Página "Quiénes Somos"
├── components/       # Componentes React reutilizables
│   └── layout/       # Componentes de layout
├── api/              # FastAPI backend
│   └── index.py      # Endpoints de la API
├── public/           # Archivos estáticos
├── vercel.json       # Configuración de Vercel
├── requirements.txt  # Dependencias de Python (Backend)
└── package.json      # Dependencias de Node.js (Frontend)
```

## Requisitos Previos

Antes de comenzar, necesitamos tener instalado:

- **Node.js**: versión 18.x o superior ([Descargar Node.js](https://nodejs.org/))
- **npm**: versión 9.x o superior (se instala automáticamente con Node.js)
- **Python**: versión 3.8 o superior (solo si necesitamos ejecutar el backend localmente)

Para verificar las versiones instaladas:

```bash
node --version
npm --version
python --version  # o python3 --version
```

## Configuración e Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Botify_pro
```

### 2. Instalar dependencias del frontend

```bash
npm install
```

Este comando instalará las dependencias definidas en `package.json`:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Dependencias de desarrollo

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible en [http://localhost:3000](http://localhost:3000)

Veremos un mensaje similar a:
```
✓ Ready in 2.5s
○ Local:        http://localhost:3000
```

### 4. Verificar en el navegador

Podemos acceder a:
- **Página principal**: http://localhost:3000
- **Página "Quiénes Somos"**: http://localhost:3000/quienes-somos

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo en http://localhost:3000
- `npm run build` - Genera el build optimizado para producción
- `npm run start` - Ejecuta el build de producción (requiere ejecutar `build` primero)
- `npm run lint` - Verifica la calidad del código

## Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
# Limpiamos node_modules e instalamos de nuevo
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 is already in use"
```bash
# Opción 1: Detenemos el proceso que usa el puerto 3000
# Opción 2: Usamos un puerto diferente
npm run dev -- -p 3001
```

### Error: "EACCES: permission denied"
```bash
# En Linux/Mac:
sudo npm install
# O corregimos los permisos de npm:
sudo chown -R $USER:$USER ~/.npm
```

### Problemas con caché de Next.js
```bash
# Limpiamos el caché
rm -rf .next
npm run dev
```

## Desarrollo del Backend (Opcional)

Si necesitamos trabajar con el backend de FastAPI localmente:

### 1. Crear entorno virtual de Python

```bash
python -m venv venv

# Activar el entorno virtual:
# En Linux/Mac:
source venv/bin/activate
# En Windows:
venv\Scripts\activate
```

### 2. Instalar dependencias de Python

```bash
pip install -r requirements.txt
```

### 3. Ejecutar FastAPI localmente

```bash
# Desde la raíz del proyecto
uvicorn api.index:app --reload
```

El backend estará disponible en http://localhost:8000

## API Endpoints

- `GET /api` - Endpoint de prueba (Hello World)
- `GET /api/health` - Health check del servicio

## Variables de Entorno

El proyecto no requiere variables de entorno para desarrollo local. Para configuraciones futuras:

1. Creamos un archivo `.env.local` en la raíz del proyecto
2. Añadimos las variables necesarias:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Despliegue en Producción

Hemos configurado el proyecto para desplegarse en Vercel con soporte para:
- Next.js (static y server-side rendering)
- Python serverless functions para la API

### Desplegar en Vercel

```bash
# Instalamos Vercel CLI globalmente (solo la primera vez)
npm install -g vercel

# Desplegamos a preview
vercel deploy

# Desplegamos a producción
vercel --prod
```

## Stack Tecnológico Detallado

- **Next.js 14**: Framework de React con App Router para renderizado híbrido
- **React 18**: Biblioteca para construcción de interfaces de usuario
- **TypeScript**: Tipado estático para JavaScript, mejorando la mantenibilidad
- **Tailwind CSS**: Framework utility-first para estilos rápidos y consistentes
- **FastAPI**: Framework moderno de Python para APIs de alto rendimiento
- **Mangum**: Adaptador ASGI para ejecutar FastAPI en entornos serverless

## Mejores Prácticas Implementadas

### Frontend
- Componentes funcionales con TypeScript para type safety
- Organización modular de componentes reutilizables
- App Router de Next.js 14 para optimización automática
- Tailwind CSS para estilos consistentes y mantenibles

### Backend
- Arquitectura serverless con FastAPI
- Endpoints RESTful siguiendo convenciones estándar
- Separación de concerns entre lógica de negocio y rutas

## Contribuir al Proyecto

1. Hacemos fork del repositorio
2. Creamos una rama para nuestra feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commiteamos los cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Pusheamos a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abrimos un Pull Request con descripción detallada

### Convenciones de Commits

Utilizamos commits semánticos:
- `feat:` para nuevas funcionalidades
- `fix:` para corrección de bugs
- `docs:` para cambios en documentación
- `style:` para cambios de formato
- `refactor:` para refactorizaciones de código
- `test:` para agregar o modificar tests

## Roadmap

- [ ] Implementar sistema de autenticación
- [ ] Agregar tests unitarios y de integración
- [ ] Configurar CI/CD pipeline
- [ ] Implementar gestión de estados global
- [ ] Agregar documentación de API con Swagger

## Licencia

Este proyecto es privado y propietario.

---

**Mantenido por el equipo de Botify Pro**