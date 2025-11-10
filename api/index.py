"""
API Backend para Botify Pro
============================

Este módulo implementa la API REST principal de Botify Pro utilizando FastAPI.
Proporciona endpoints para health checks y operaciones básicas del servicio.

La API está configurada para ejecutarse como serverless function en Vercel
utilizando Mangum como adaptador ASGI.

Autor: Equipo Botify Pro
Versión: 1.0.0
Python: 3.8+

Dependencias principales:
    - fastapi: Framework web moderno y de alto rendimiento
    - mangum: Adaptador ASGI para AWS Lambda y Vercel
    
Ejemplo de uso:
    Para desarrollo local:
        $ uvicorn api.index:app --reload
    
    Para producción (Vercel):
        Las funciones se despliegan automáticamente como serverless functions
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from typing import Dict, Any


# ==============================================================================
# CONFIGURACIÓN DE LA APLICACIÓN
# ==============================================================================

app = FastAPI(
    title="Botify Pro API",
    description="API REST para la plataforma de gestión de bots con IA",
    version="1.0.0",
    docs_url="/api/docs",  # Swagger UI
    redoc_url="/api/redoc",  # ReDoc
)


# ==============================================================================
# CONFIGURACIÓN DE MIDDLEWARES
# ==============================================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: En producción, restringir a dominios específicos
    allow_credentials=True,
    allow_methods=["*"],  # Permitimos GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Permitimos todos los headers personalizados
)

"""
NOTA DE SEGURIDAD:
==================
La configuración actual de CORS permite requests desde cualquier origen (*).
En un entorno de producción, debemos reemplazar esto con una lista específica
de orígenes permitidos:

    allow_origins=[
        "https://botify-pro.vercel.app",
        "https://www.botify-pro.com",
    ],
"""


# ==============================================================================
# ENDPOINTS DE LA API
# ==============================================================================

@app.get("/api", tags=["General"])
def read_root() -> Dict[str, str]:
    """
    Endpoint raíz de la API - Hello World.
    
    Este endpoint sirve como prueba básica de conectividad y disponibilidad
    del servicio. Útil para verificar que la API está respondiendo correctamente.
    
    Returns:
        Dict[str, str]: Mensaje de bienvenida de la API
        
    Ejemplo de respuesta:
        {
            "message": "Hello World from FastAPI!"
        }
    
    Status Codes:
        200: Operación exitosa
    """
    return {"message": "Hello World from FastAPI!"}


@app.get("/api/health", tags=["Health Check"])
def health_check() -> Dict[str, str]:
    """
    Health Check endpoint para monitoreo del servicio.
    
    Este endpoint es crítico para:
    - Monitoreo de disponibilidad del servicio
    - Load balancers y orchestrators (Kubernetes, etc.)
    - Sistemas de alertas y observabilidad
    
    Returns:
        Dict[str, str]: Estado del servicio y nombre del servicio
        
    Ejemplo de respuesta:
        {
            "status": "healthy",
            "service": "Botify Pro API"
        }
    
    Status Codes:
        200: Servicio operando normalmente
        
    Mejoras futuras:
        - Agregar verificación de conexión a base de datos
        - Incluir métricas de memoria y CPU
        - Reportar versión de la API
        - Timestamp de inicio del servicio
    """
    return {
        "status": "healthy",
        "service": "Botify Pro API"
    }


# ==============================================================================
# HANDLER PARA DESPLIEGUE SERVERLESS
# ==============================================================================

# Mangum adapta la aplicación FastAPI/ASGI para ejecutarse en entornos serverless
# como AWS Lambda y Vercel Serverless Functions
handler = Mangum(app)

"""
ARQUITECTURA SERVERLESS:
========================
Mangum actúa como un adaptador entre el protocolo ASGI (usado por FastAPI)
y el formato de eventos esperado por las plataformas serverless.

Flujo de ejecución:
    1. Request HTTP → Vercel Serverless Function
    2. Evento serverless → Mangum handler
    3. Mangum → FastAPI app (formato ASGI)
    4. FastAPI procesa el request
    5. Response ASGI → Mangum → Formato serverless → Cliente

Ventajas:
    - Escalabilidad automática
    - Pay-per-use (solo pagamos por ejecuciones reales)
    - Sin gestión de servidores
    - Despliegue simplificado

Limitaciones a considerar:
    - Cold starts (latencia en primera invocación)
    - Timeout máximo de ejecución
    - Sin estado persistente entre invocaciones
"""