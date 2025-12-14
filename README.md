# Botify Pro

Plataforma de gestión de bots construida con Next.js 14 y FastAPI, integrada con Google Gemini para automatización de ventas y captura de leads.

## Stack Tecnológico

- **Frontend**: Next.js 14 (App Router, TypeScript, Tailwind CSS)
- **Backend**: Python FastAPI con Google Gemini AI
- **Base de Datos**: SQLite (historial de chat)
- **Almacenamiento**: Excel (leads capturados)
- **IA**: Google Gemini (modelo gemini-flash-latest)

## Estructura del Proyecto

```
Botify_pro/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Página principal
│   ├── layout.tsx          # Layout principal (incluye ChatWidget)
│   ├── globals.css         # Estilos globales
│   └── quienes-somos/      # Página "Quiénes Somos"
├── components/             # Componentes React reutilizables
│   ├── layout/             # Componentes de layout
│   │   ├── Navbar.tsx      # Barra de navegación
│   │   └── Footer.tsx      # Pie de página
│   └── chat/               # Componentes de chat
│       └── ChatWidget.tsx  # Widget de chat flotante con IA
├── api/                    # FastAPI backend
│   └── index.py            # Endpoints de la API y lógica de Gemini
├── public/                 # Archivos estáticos
├── vercel.json             # Configuración de Vercel
├── requirements.txt        # Dependencias de Python (Backend)
├── package.json            # Dependencias de Node.js (Frontend)
├── chat_history.db         # Base de datos SQLite (generada automáticamente)
└── leads_locales.xlsx      # Archivo Excel de leads (generado automáticamente)
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

### 5. Usar el ChatWidget

Una vez que el frontend y el backend estén corriendo, verás un **botón flotante de chat** en la esquina inferior derecha de todas las páginas. Haz clic en él para iniciar una conversación con el asistente de IA.

**Características del ChatWidget:**
- Botón flotante circular con icono de chat
- Ventana de chat desplegable con diseño moderno
- Diferenciación visual entre mensajes del usuario (derecha, azul) y del bot (izquierda, gris)
- Scroll automático al recibir nuevos mensajes
- Indicador de carga mientras el bot procesa
- Guardado automático de leads cuando se capturan los datos

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

## Desarrollo del Backend

El backend de FastAPI está integrado con Google Gemini para proporcionar un asistente de IA que captura leads automáticamente.

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

Este comando instalará todas las dependencias necesarias:
- **FastAPI**: Framework web moderno y rápido
- **Uvicorn**: Servidor ASGI para ejecutar FastAPI
- **google-generativeai**: SDK de Google para Gemini
- **pandas**: Manejo de datos y archivos Excel
- **openpyxl**: Lectura/escritura de archivos Excel
- **Mangum**: Adaptador para Vercel (producción)

### 3. Ejecutar FastAPI localmente

```bash
# Desde la carpeta raíz del proyecto
uvicorn api.index:app --reload --host 0.0.0.0 --port 8000
```

**Parámetros del comando:**
- `--reload`: Recarga automática cuando detecta cambios en el código
- `--host 0.0.0.0`: Permite conexiones desde cualquier IP (necesario para que el frontend se conecte)
- `--port 8000`: Puerto donde correrá el servidor

El backend estará disponible en:
- **Local**: http://localhost:8000
- **Red local**: http://0.0.0.0:8000

### 4. Verificar que el backend está funcionando

Puedes probar los endpoints básicos:

```bash
# Health check
curl http://localhost:8000/api/health

# Endpoint de prueba
curl http://localhost:8000/api
```

### Funcionalidades del Backend

#### Integración con Google Gemini

El backend utiliza **Google Gemini** como motor de IA conversacional. El modelo está configurado con las siguientes características:

- **Modelo**: `gemini-flash-latest`
- **System Instruction**: El bot está programado para ser un experto en automatización de ventas, con el objetivo de capturar información del usuario (Nombre, Email, Empresa) de manera amable y profesional.
- **Detección Automática de Leads**: Cuando Gemini detecta que ha capturado los 3 datos requeridos, automáticamente genera un JSON con la información y la guarda en la base de datos.

#### Persistencia de Datos

El backend gestiona dos tipos de almacenamiento:

1. **SQLite (`chat_history.db`)**: Almacena todo el historial de conversaciones
2. **Excel (`leads_locales.xlsx`)**: Almacena los leads capturados con timestamp

Ambos archivos se crean automáticamente la primera vez que se ejecuta el backend.

## API Endpoints

### Endpoints Disponibles

#### `GET /api`
Endpoint de prueba básico.

**Respuesta:**
```json
{
  "message": "Hello World from FastAPI!"
}
```

#### `GET /api/health`
Health check del servidor.

**Respuesta:**
```json
{
  "status": "healthy",
  "service": "Botify Pro API"
}
```

#### `POST /api/chat`
Endpoint principal para la conversación con el asistente de IA.

**Request Body:**
```json
{
  "message": "Hola, me interesa tu servicio",
  "history": [
    {
      "role": "user",
      "content": "Hola"
    },
    {
      "role": "bot",
      "content": "¡Hola! Soy Botify, tu asistente..."
    }
  ]
}
```

**Respuesta Exitosa:**
```json
{
  "response": "¡Excelente! Ya tengo tus datos registrados...",
  "lead_captured": {
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "empresa": "TechCorp"
  }
}
```

**Respuesta Normal (sin lead):**
```json
{
  "response": "Claro, puedo ayudarte con eso...",
  "lead_captured": null
}
```

**Funcionalidad:**
- Recibe el mensaje del usuario y el historial de conversación
- Envía la conversación a Google Gemini Pro
- Gemini genera una respuesta contextual
- Si Gemini detecta que ha capturado los 3 datos (nombre, email, empresa), los extrae automáticamente
- Guarda todos los mensajes en `chat_history.db`
- Si hay un lead capturado, lo retorna en la respuesta para que el frontend lo guarde automáticamente

#### `POST /api/lead`
Endpoint para guardar leads manualmente o automáticamente.

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "empresa": "TechCorp"
}
```

**Respuesta:**
```json
{
  "status": "success",
  "message": "Lead guardado correctamente"
}
```

**Funcionalidad:**
- Recibe los datos del lead (nombre, email, empresa)
- Agrega un timestamp automático
- Guarda en `leads_locales.xlsx`
- Si el archivo no existe, lo crea automáticamente

## Base de Datos y Almacenamiento

### Base de Datos SQLite: `chat_history.db`

La base de datos SQLite almacena todo el historial de conversaciones entre usuarios y el bot.

**Estructura de la tabla `chat_history`:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | ID único autoincremental |
| `timestamp` | TEXT | Fecha y hora del mensaje (formato: YYYY-MM-DD HH:MM:SS) |
| `role` | TEXT | Rol del mensaje: `user` o `bot` |
| `message` | TEXT | Contenido del mensaje |

**Ubicación:** Se crea automáticamente en la raíz del proyecto (`/Botify_pro/chat_history.db`)

**Uso:**
- Se crea automáticamente al iniciar el servidor por primera vez
- Cada mensaje (tanto del usuario como del bot) se guarda automáticamente
- Útil para análisis de conversaciones, debugging y mejora del sistema

**Ejemplo de consulta SQL:**
```sql
-- Ver todos los mensajes
SELECT * FROM chat_history ORDER BY timestamp DESC;

-- Contar mensajes por rol
SELECT role, COUNT(*) as total FROM chat_history GROUP BY role;
```

### Archivo Excel: `leads_locales.xlsx`

El archivo Excel almacena todos los leads capturados por el sistema.

**Estructura de columnas:**

| Columna | Descripción |
|---------|-------------|
| `timestamp` | Fecha y hora de captura del lead (formato: YYYY-MM-DD HH:MM:SS) |
| `nombre` | Nombre completo del lead |
| `email` | Correo electrónico del lead |
| `empresa` | Nombre de la empresa del lead |

**Ubicación:** Se crea automáticamente en la raíz del proyecto (`/Botify_pro/leads_locales.xlsx`)

**Uso:**
- Se crea automáticamente cuando se guarda el primer lead
- Cada vez que Gemini detecta que ha capturado los 3 datos, el frontend llama automáticamente a `/api/lead` para guardarlo
- Puede abrirse con Excel, Google Sheets o cualquier herramienta de hojas de cálculo
- Útil para análisis de leads, seguimiento y exportación a otros sistemas

**Nota:** El archivo se actualiza en tiempo real. Si lo tienes abierto en Excel mientras el sistema está corriendo, cierra y vuelve a abrir el archivo para ver los nuevos leads.

## Variables de Entorno

El proyecto no requiere variables de entorno para ejecutarse localmente. La API key de Google Gemini está configurada directamente en el código para el PoC local.

**Para producción**, se recomienda usar variables de entorno:

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Añade las variables necesarias:
```
GEMINI_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Flujo de Trabajo Completo

### 1. Iniciar el Backend

En una terminal, ejecuta:

```bash
# Activar entorno virtual (si lo usas)
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate     # Windows

# Iniciar el servidor
uvicorn api.index:app --reload --host 0.0.0.0 --port 8000
```

El backend estará disponible en `http://localhost:8000`

### 2. Iniciar el Frontend

En otra terminal, ejecuta:

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

### 3. Probar el Sistema

1. Abre `http://localhost:3000` en tu navegador
2. Haz clic en el botón flotante de chat (esquina inferior derecha)
3. Inicia una conversación con el asistente
4. Proporciona tu nombre, email y empresa cuando te lo pida
5. El sistema detectará automáticamente cuando tenga los 3 datos y guardará el lead

### 4. Verificar los Datos

**Historial de Chat:**
```bash
# Usar sqlite3 para ver el historial
sqlite3 chat_history.db "SELECT * FROM chat_history ORDER BY timestamp DESC LIMIT 10;"
```

**Leads Capturados:**
- Abre `leads_locales.xlsx` con Excel o cualquier herramienta de hojas de cálculo
- Verás todos los leads con timestamp, nombre, email y empresa

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

### Notas para Producción

1. **API Key de Gemini**: En producción, mueve la API key a variables de entorno
2. **Base de Datos**: SQLite no es ideal para producción. Considera migrar a PostgreSQL o MySQL
3. **Almacenamiento de Leads**: Considera usar una base de datos en lugar de Excel para producción
4. **CORS**: Ajusta los orígenes permitidos en `api/index.py` para tu dominio de producción

## Funcionalidades Principales

### Frontend: ChatWidget

El **ChatWidget** es un componente React que proporciona una interfaz de chat flotante integrada en todas las páginas de la aplicación.

#### Características:

1. **Botón Flotante:**
   - Posicionado en la esquina inferior derecha
   - Diseño circular con icono de chat
   - Animaciones suaves al hacer hover
   - Cambia a icono de cerrar cuando el chat está abierto

2. **Ventana de Chat:**
   - Diseño moderno con header, body y footer
   - Header con título "Asistente Botify" y botón de cerrar
   - Body con área de mensajes con scroll automático
   - Footer con input de texto y botón de enviar

3. **Diferenciación Visual:**
   - **Mensajes del usuario**: Alineados a la derecha, fondo azul (`primary-600`), texto blanco
   - **Mensajes del bot**: Alineados a la izquierda, fondo blanco, borde gris, texto oscuro

4. **Funcionalidades Avanzadas:**
   - Scroll automático al fondo cuando hay nuevos mensajes
   - Envío de mensajes con Enter (sin Shift)
   - Indicador de carga mientras el bot procesa
   - Manejo de errores con mensajes informativos
   - Guardado automático de leads cuando se detectan

5. **Integración con Backend:**
   - Conecta con `http://127.0.0.1:8000/api/chat`
   - Envía historial de conversación para contexto
   - Detecta automáticamente cuando se captura un lead
   - Guarda leads automáticamente llamando a `/api/lead`

### Backend: FastAPI con Google Gemini

El backend proporciona una API RESTful integrada con Google Gemini para conversaciones inteligentes.

#### Características:

1. **Integración con Google Gemini:**
   - Utiliza el modelo `gemini-pro` para generar respuestas contextuales
   - System instruction personalizada para captura de leads
   - Manejo de historial de conversación para contexto continuo

2. **Detección Automática de Leads:**
   - Gemini detecta cuando ha capturado los 3 datos requeridos (nombre, email, empresa)
   - Extrae la información automáticamente usando expresiones regulares
   - Retorna el lead en la respuesta para que el frontend lo guarde

3. **Persistencia de Datos:**
   - Guarda todo el historial de chat en SQLite
   - Permite guardar leads en Excel para análisis posterior
   - Timestamps automáticos en todos los registros

4. **Manejo de Errores:**
   - Try/except en todos los endpoints críticos
   - Mensajes de error informativos
   - El servidor no se cae si falla la API de Google

## Tecnologías Utilizadas

### Frontend
- **Next.js 14**: Framework de React con App Router
- **React 18**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Superset de JavaScript con tipado estático
- **Tailwind CSS**: Framework de CSS utility-first

### Backend
- **FastAPI**: Framework de Python para APIs modernas y rápidas
- **Google Gemini**: Modelo de lenguaje de IA para conversaciones (gemini-flash-latest)
- **SQLite**: Base de datos ligera para historial de chat
- **Pandas**: Librería para manipulación de datos y Excel
- **Uvicorn**: Servidor ASGI de alto rendimiento
- **Mangum**: Adaptador para ejecutar FastAPI en Vercel (producción)

### Herramientas
- **openpyxl**: Para lectura/escritura de archivos Excel
- **google-generativeai**: SDK oficial de Google para Gemini

## Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es privado y propietario.