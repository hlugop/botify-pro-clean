# Modelos Gemini - Enero 2026

## Modelos Actuales

### Gemini 3 Pro Preview
**Model ID**: `gemini-3-pro-preview`

El modelo más inteligente para comprensión multimodal y tareas agénticas.

| Propiedad | Valor |
|-----------|-------|
| Input tokens | 1,048,576 |
| Output tokens | 65,536 |
| Knowledge cutoff | January 2025 |
| Thinking | ✅ Soportado |

**Capacidades**:
- ✅ Text, Image, Video, Audio, PDF
- ✅ Code execution
- ✅ Function calling
- ✅ Search grounding
- ✅ Structured outputs
- ✅ URL context
- ✅ Caching
- ❌ Image generation (usar `gemini-3-pro-image-preview`)
- ❌ Live API
- ❌ Google Maps grounding

---

### Gemini 3 Flash Preview
**Model ID**: `gemini-3-flash-preview`

Modelo balanceado para velocidad y escala con inteligencia frontier.

| Propiedad | Valor |
|-----------|-------|
| Input tokens | 1,048,576 |
| Output tokens | 65,536 |
| Knowledge cutoff | December 2025 |
| Thinking | ✅ Soportado |

**Capacidades**: Igual que 3 Pro Preview

---

### Gemini 2.5 Pro (Stable)
**Model ID**: `gemini-2.5-pro`

Modelo de reasoning avanzado para código, matemáticas y STEM.

| Propiedad | Valor |
|-----------|-------|
| Input tokens | 1,048,576 |
| Output tokens | 65,536 |
| Knowledge cutoff | January 2025 |
| Thinking | ✅ Soportado |

**Capacidades**:
- ✅ Todo lo de Gemini 3
- ✅ Google Maps grounding

---

### Gemini 2.5 Flash (Stable)
**Model ID**: `gemini-2.5-flash`

Mejor relación precio/rendimiento. Ideal para procesamiento a escala.

| Propiedad | Valor |
|-----------|-------|
| Input tokens | 1,048,576 |
| Output tokens | 65,536 |
| Knowledge cutoff | January 2025 |
| Thinking | ✅ Soportado |

**Capacidades**: Igual que 2.5 Pro

---

### Gemini 2.5 Flash-Lite (Stable)
**Model ID**: `gemini-2.5-flash-lite`

El más rápido y económico para tareas de alto volumen.

| Propiedad | Valor |
|-----------|-------|
| Input tokens | 1,048,576 |
| Output tokens | 65,536 |
| Knowledge cutoff | January 2025 |
| Thinking | ✅ Soportado |

---

## Modelos Especializados

### Generación de Imágenes
- `gemini-3-pro-image-preview` - Generación nativa de imágenes
- `gemini-2.5-flash-image` - Imágenes con Flash

### Text-to-Speech
- `gemini-2.5-flash-preview-tts` - TTS rápido
- `gemini-2.5-pro-preview-tts` - TTS de alta calidad

### Video (Veo)
- `veo-3.1-generate-preview` - Video con audio
- `veo-3.0-generate-001` - Video estable

### Embeddings
- `gemini-embedding-001` - Embeddings de texto

### Computer Use
- `gemini-2.5-computer-use-preview-10-2025` - Control de navegador

### Robótica
- `gemini-robotics-er-1.5-preview` - Embodied Reasoning

---

## Modelos Deprecados

⚠️ **NO USAR - Shutdown March 31, 2026**:
- `gemini-2.0-flash`
- `gemini-2.0-flash-lite`

---

## Convenciones de Nombres

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Stable | `gemini-X.Y-variant` | `gemini-2.5-flash` |
| Preview | `gemini-X.Y-variant-preview` | `gemini-3-flash-preview` |
| Latest | `gemini-variant-latest` | `gemini-flash-latest` |
| Experimental | `*-exp` | `gemini-2.0-flash-exp` |

**Para producción**: Usar versiones stable específicas.

---

## Thinking Levels

Control de profundidad de razonamiento:

| Level | Descripción | Modelos |
|-------|-------------|---------|
| `minimal` | Sin/mínimo thinking | Solo Flash |
| `low` | Ligero, prioriza latencia | Todos |
| `medium` | Balanceado | Solo Flash |
| `high` | Máximo razonamiento (default) | Todos |

```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Solve this step by step: What is 15% of 240?",
    generation_config={
        "thinking_level": "high",
        "thinking_summaries": "auto"
    }
)
```

---

## Selección de Modelo

| Caso de Uso | Modelo Recomendado |
|-------------|-------------------|
| Máxima inteligencia | `gemini-3-pro-preview` |
| Balance velocidad/calidad | `gemini-2.5-flash` |
| Alto volumen/bajo costo | `gemini-2.5-flash-lite` |
| Código y matemáticas | `gemini-2.5-pro` |
| Generación de imágenes | `gemini-3-pro-image-preview` |
| Embeddings/RAG | `gemini-embedding-001` |
| Agentes con tools | `gemini-3-flash-preview` |
