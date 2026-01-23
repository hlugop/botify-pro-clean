---
description: Verificar que el deployment de Botify Pro está funcionando correctamente. Testea conectividad, endpoints y comunicación front-back.
---

# Test de Deployment - Botify Pro

Ejecutar una verificación completa del deployment.

## 1. Identificar URL de Deployment

Primero, buscar la URL de producción:
- Revisar `vercel.json` para configuración
- Buscar variables de entorno con URLs
- Si no hay URL, preguntar al usuario

## 2. Tests a Ejecutar

### 2.1 Health Check del Backend
```bash
curl -s https://[URL]/api/health
```
**Esperado**: `{"status": "healthy", "service": "Botify Pro API"}`

### 2.2 Root Endpoint
```bash
curl -s https://[URL]/api
```
**Esperado**: `{"message": "Hello World from FastAPI!"}`

### 2.3 CORS Headers
```bash
curl -s -I -X OPTIONS https://[URL]/api/chat \
  -H "Origin: https://[FRONTEND_URL]" \
  -H "Access-Control-Request-Method: POST"
```
**Verificar**: Headers `Access-Control-Allow-Origin` presentes

### 2.4 Chat Endpoint (POST)
```bash
curl -s -X POST https://[URL]/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola", "history": []}'
```
**Esperado**: Respuesta JSON con campo `response`

### 2.5 Frontend Accesible
```bash
curl -s -o /dev/null -w "%{http_code}" https://[URL]
```
**Esperado**: 200

## 3. Checklist de Problemas Comunes

- [ ] **CORS**: Si el front no puede llamar al back, revisar `allow_origins` en FastAPI
- [ ] **Environment Variables**: Verificar que `GEMINI_API_KEY` está configurada en Vercel
- [ ] **Rutas**: Verificar que `/api/*` rutea correctamente al backend Python
- [ ] **Timeout**: Las serverless functions tienen límite de 10s en Vercel (free tier)

## 4. Verificación de vercel.json

Revisar que la configuración de rewrites es correcta:
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/index.py" }
  ]
}
```

## 5. Output Esperado

Generar reporte con:
- ✅ / ❌ para cada test
- Tiempo de respuesta de cada endpoint
- Errores específicos encontrados
- Recomendaciones de fix si algo falla

$ARGUMENTS
