---
name: gemini-api
description: "Documentación actualizada de Gemini API (Enero 2026). Usar cuando se trabaje con modelos Gemini, Google GenAI SDK, Interactions API, function calling, embeddings, o cualquier integración con APIs de Google AI. IMPORTANTE: El conocimiento del modelo puede estar desactualizado - usar esta skill como fuente de verdad."
---

# Gemini API - Documentación Actualizada (Enero 2026)

## ⚠️ ADVERTENCIAS CRÍTICAS

### SDK Correcto
```python
# ✅ CORRECTO - SDK actual (google-genai)
from google import genai
client = genai.Client()

# ❌ INCORRECTO - SDK legacy (deprecated)
# import google.generativeai as genai  # NO USAR
```

### Modelos Actuales
| Modelo | Model ID | Estado |
|--------|----------|--------|
| Gemini 3 Pro | `gemini-3-pro-preview` | Preview - Más inteligente |
| Gemini 3 Flash | `gemini-3-flash-preview` | Preview - Balanceado |
| Gemini 2.5 Pro | `gemini-2.5-pro` | Stable - Reasoning avanzado |
| Gemini 2.5 Flash | `gemini-2.5-flash` | Stable - Mejor precio/rendimiento |
| Gemini 2.5 Flash-Lite | `gemini-2.5-flash-lite` | Stable - Ultra rápido |

### Modelos Deprecados (NO USAR)
- `gemini-2.0-flash` → Shutdown: March 31, 2026
- `gemini-2.0-flash-lite` → Shutdown: March 31, 2026
- `gemini-1.5-*` → Usar 2.5 o 3.x

## Quick Reference

| Tarea | Archivo de Referencia |
|-------|----------------------|
| Setup inicial y API keys | [client-setup.md](client-setup.md) |
| Modelos y capacidades | [models.md](models.md) |
| Interactions API (nuevo) | [interactions-api.md](interactions-api.md) |
| Imágenes, audio, video, PDF | [multimodal.md](multimodal.md) |
| Function calling y tools | [function-calling.md](function-calling.md) |
| Embeddings y RAG | [embeddings.md](embeddings.md) |
| Precios actualizados | [pricing.md](pricing.md) |
| Ejemplos comunes | [examples/common-patterns.md](examples/common-patterns.md) |

## Ejemplo Mínimo

```python
from google import genai

# API key desde env var GEMINI_API_KEY (recomendado)
client = genai.Client()

# O explícitamente
# client = genai.Client(api_key="YOUR_API_KEY")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explica cómo funciona la IA en pocas palabras"
)
print(response.text)
```

## Nuevas APIs (2025-2026)

### Interactions API (Beta)
Nueva interfaz unificada con state management:
```python
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input="Tell me a joke"
)
print(interaction.outputs[-1].text)
```

### Built-in Tools
- `google_search` - Grounding con búsqueda
- `code_execution` - Ejecutar código
- `url_context` - Analizar URLs
- `computer_use` - Control de navegador

### Thinking Levels
Control de profundidad de razonamiento:
- `minimal` - Sin thinking (solo Flash)
- `low` - Ligero
- `medium` - Balanceado (solo Flash)
- `high` - Máximo razonamiento (default)

## Instalación

```bash
pip install -U google-genai
```

Versión mínima recomendada: `1.55.0+`
