# Botify Pro

Plataforma de gestión de bots construida con Next.js 14 y FastAPI.

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

Antes de comenzar, asegúrate de tener instalado en tu sistema:

- **Node.js**: versión 18.x o superior ([Descargar Node.js](https://nodejs.org/))
- **npm**: versión 9.x o superior (se instala automáticamente con Node.js)
- **Python**: versión 3.8 o superior (solo si necesitas ejecutar el backend localmente)

Para verificar las versiones instaladas:

```bash
node --version
npm --version
python --version  # o python3 --version
```

## Instalación y Configuración Local del Frontend

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Botify_pro
```

### 2. Instalar las dependencias de Node.js

```bash
npm install
```

Este comando instalará todas las dependencias necesarias definidas en `package.json`:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Y todas las dependencias de desarrollo

### 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible en [http://localhost:3000](http://localhost:3000)

Verás un mensaje similar a:
```
✓ Ready in 2.5s
○ Local:        http://localhost:3000
```

### 4. Abrir en el navegador

Abre tu navegador y visita:
- **Página principal**: http://localhost:3000
- **Página "Quiénes Somos"**: http://localhost:3000/quienes-somos

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo en http://localhost:3000
- `npm run build` - Crea una versión optimizada para producción
- `npm run start` - Ejecuta la versión de producción (requiere ejecutar `build` primero)
- `npm run lint` - Ejecuta el linter para verificar el código

## Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 is already in use"
```bash
# Opción 1: Detén el proceso que usa el puerto 3000
# Opción 2: Usa un puerto diferente
npm run dev -- -p 3001
```

### Error: "EACCES: permission denied"
```bash
# En Linux/Mac, intenta con:
sudo npm install
# O corrige los permisos de npm:
sudo chown -R $USER:$USER ~/.npm
```

### Problemas con caché de Next.js
```bash
# Limpia el caché de Next.js
rm -rf .next
npm run dev
```

## Desarrollo del Backend (Opcional)

Si necesitas trabajar con el backend de FastAPI localmente:

### 1. Crear un entorno virtual de Python

```bash
python -m venv venv

# Activar el entorno virtual:
# En Linux/Mac:
source venv/bin/activate
# En Windows:
venv\Scripts\activate
```

### 2. Instalar las dependencias de Python

```bash
pip install -r requirements.txt
```

### 3. Ejecutar FastAPI localmente

```bash
# Desde la carpeta raíz del proyecto
uvicorn api.index:app --reload
```

El backend estará disponible en http://localhost:8000

## API Endpoints

- `GET /api` - Hello World
- `GET /api/health` - Health check

## Variables de Entorno

El proyecto no requiere variables de entorno para ejecutarse localmente. Si en el futuro necesitas configurar variables de entorno:

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Añade las variables necesarias:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Despliegue en Producción

El proyecto está configurado para desplegarse en Vercel con soporte para:
- Next.js static y server-side rendering
- Python serverless functions para la API

### Desplegar en Vercel

```bash
# Instalar Vercel CLI globalmente (solo la primera vez)
npm install -g vercel

# Desplegar
vercel deploy

# Desplegar a producción
vercel --prod
```

## Tecnologías Utilizadas

- **Next.js 14**: Framework de React con App Router
- **React 18**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Superset de JavaScript con tipado estático
- **Tailwind CSS**: Framework de CSS utility-first
- **FastAPI**: Framework de Python para APIs
- **Mangum**: Adaptador para ejecutar FastAPI en Vercel

## Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es privado y propietario.