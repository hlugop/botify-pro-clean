# Client Setup y API Keys

## Instalación

```bash
pip install -U google-genai
```

**Versión requerida**: `1.55.0+` para Interactions API

## Obtener API Key

1. Ir a [Google AI Studio](https://aistudio.google.com/)
2. Dashboard → API Keys → Create API Key
3. Seleccionar o crear proyecto de Google Cloud

## Configuración del Cliente

### Opción 1: Variable de Entorno (Recomendado)

```bash
# Linux/macOS
export GEMINI_API_KEY="your-api-key"

# Windows
set GEMINI_API_KEY=your-api-key
```

```python
from google import genai

# Se detecta automáticamente
client = genai.Client()
```

**Variables soportadas** (en orden de prioridad):
1. `GOOGLE_API_KEY`
2. `GEMINI_API_KEY`

### Opción 2: API Key Explícita

```python
from google import genai

client = genai.Client(api_key="YOUR_API_KEY")
```

⚠️ **Nunca hardcodear API keys en código de producción**

## Seguridad de API Keys

### Reglas Críticas

- ❌ Nunca commitear API keys a git
- ❌ Nunca exponer keys en código client-side (web/mobile)
- ✅ Usar variables de entorno
- ✅ Llamadas desde servidor únicamente
- ✅ Restringir keys por IP/dominio en Google Cloud Console

### Restricciones de API Key

En Google Cloud Console puedes:
- Limitar a IPs específicas
- Limitar a HTTP referrers
- Restringir a APIs específicas (Generative Language API)

## Proyectos de Google Cloud

Cada API key está asociada a un proyecto. Límites por proyecto:
- Máximo 10 proyectos creados desde AI Studio
- Máximo 100 keys visibles
- Máximo 50 proyectos visibles

Para más gestión, usar [Google Cloud Console](https://console.cloud.google.com/).

## Verificar Conexión

```python
from google import genai

client = genai.Client()

# Test simple
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Responde solo 'OK' si funciona"
)
print(response.text)
```

## SDK Legacy vs Nuevo

```python
# ❌ LEGACY - NO USAR (deprecated Nov 2025)
# import google.generativeai as genai
# genai.configure(api_key="...")
# model = genai.GenerativeModel('gemini-1.5-flash')

# ✅ NUEVO - google-genai
from google import genai
client = genai.Client()
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="..."
)
```

### Diferencias Clave

| Aspecto | Legacy (`google-generativeai`) | Nuevo (`google-genai`) |
|---------|-------------------------------|------------------------|
| Import | `import google.generativeai` | `from google import genai` |
| Config | `genai.configure(api_key=...)` | `genai.Client(api_key=...)` |
| Modelo | `GenerativeModel('model')` | `client.models.generate_content(model=...)` |
| Live API | No soportado | Soportado |
| Interactions | No soportado | Soportado |
| Veo (video) | No soportado | Soportado |
