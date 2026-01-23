# Precios Gemini API - Enero 2026

Precios en USD por 1 millón de tokens.

## Gemini 3 Pro Preview

| Concepto | Free Tier | Paid Tier |
|----------|-----------|-----------|
| Input (≤200k) | N/A | $2.00 |
| Input (>200k) | N/A | $4.00 |
| Output + thinking | N/A | $12.00 (≤200k) / $18.00 (>200k) |
| Context caching | N/A | $0.20 (≤200k) / $0.40 (>200k) |
| Cache storage | N/A | $4.50/hr |
| Google Search | N/A | 5,000 free, then $14/1k queries |

---

## Gemini 3 Flash Preview

| Concepto | Free Tier | Paid Tier |
|----------|-----------|-----------|
| Input (text/image/video) | Gratis | $0.50 |
| Input (audio) | Gratis | $1.00 |
| Output + thinking | Gratis | $3.00 |
| Context caching (text/image/video) | Gratis | $0.05 |
| Context caching (audio) | Gratis | $0.10 |
| Cache storage | Gratis | $1.00/hr |
| Google Search | N/A | 5,000 free, then $14/1k queries |

---

## Gemini 2.5 Pro

| Concepto | Free Tier | Paid Tier |
|----------|-----------|-----------|
| Input (≤200k) | Gratis | $1.25 |
| Input (>200k) | Gratis | $2.50 |
| Output + thinking | Gratis | $10.00 (≤200k) / $15.00 (>200k) |
| Context caching | N/A | $0.125 (≤200k) / $0.25 (>200k) |
| Cache storage | N/A | $4.50/hr |
| Google Search | N/A | 1,500 RPD free, then $35/1k |
| Google Maps | N/A | 10,000 RPD free, then $25/1k |

---

## Gemini 2.5 Flash

| Concepto | Free Tier | Paid Tier |
|----------|-----------|-----------|
| Input (text/image/video) | Gratis | $0.30 |
| Input (audio) | Gratis | $1.00 |
| Output + thinking | Gratis | $2.50 |
| Context caching (text/image/video) | N/A | $0.03 |
| Context caching (audio) | N/A | $0.10 |
| Cache storage | N/A | $1.00/hr |
| Google Search | 500 RPD | 1,500 RPD free, then $35/1k |
| Google Maps | 500 RPD | 1,500 RPD free, then $25/1k |

---

## Gemini 2.5 Flash-Lite

| Concepto | Free Tier | Paid Tier |
|----------|-----------|-----------|
| Input (text/image/video) | Gratis | $0.10 |
| Input (audio) | Gratis | $0.30 |
| Output + thinking | Gratis | $0.40 |
| Context caching (text/image/video) | N/A | $0.01 |
| Context caching (audio) | N/A | $0.03 |
| Cache storage | N/A | $1.00/hr |
| Google Search | 500 RPD | 1,500 RPD free, then $35/1k |
| Google Maps | 500 RPD | 1,500 RPD free, then $25/1k |

---

## Generación de Imágenes

### Gemini 3 Pro Image Preview
| Concepto | Precio |
|----------|--------|
| Input (text/image) | $2.00/1M tokens (~$0.0011/imagen) |
| Output (text + thinking) | $12.00/1M tokens |
| Output (images 1K-2K) | $0.134/imagen |
| Output (images 4K) | $0.24/imagen |

### Gemini 2.5 Flash Image
| Concepto | Precio |
|----------|--------|
| Input | $0.30/1M tokens |
| Output | $0.039/imagen |

### Imagen 4
| Variante | Precio/imagen |
|----------|--------------|
| Fast | $0.02 |
| Standard | $0.04 |
| Ultra | $0.06 |

---

## Video (Veo)

### Veo 3.1
| Calidad | Standard | Fast |
|---------|----------|------|
| 720p/1080p | $0.40/seg | $0.15/seg |
| 4K | $0.60/seg | $0.35/seg |

### Veo 3
| Calidad | Standard | Fast |
|---------|----------|------|
| Default | $0.40/seg | $0.15/seg |

### Veo 2
- $0.35/segundo

---

## Text-to-Speech

### Gemini 2.5 Flash TTS
| Concepto | Precio |
|----------|--------|
| Input (text) | $0.50/1M tokens |
| Output (audio) | $10.00/1M tokens |

### Gemini 2.5 Pro TTS
| Concepto | Precio |
|----------|--------|
| Input (text) | $1.00/1M tokens |
| Output (audio) | $20.00/1M tokens |

---

## Embeddings

**Model**: `gemini-embedding-001`

| Tier | Precio |
|------|--------|
| Free | Gratis |
| Paid | $0.15/1M tokens |

Batch API: **50% descuento**

---

## Computer Use

**Model**: `gemini-2.5-computer-use-preview`

| Concepto | Precio |
|----------|--------|
| Input (≤200k) | $1.25/1M tokens |
| Input (>200k) | $2.50/1M tokens |
| Output (≤200k) | $10.00/1M tokens |
| Output (>200k) | $15.00/1M tokens |

---

## Tools

| Tool | Free Tier | Paid Tier |
|------|-----------|-----------|
| Google Search | 500 RPD (compartido Flash/Flash-Lite) | 1,500 RPD free, then $35/1k |
| Google Maps | 500 RPD | 1,500 RPD free (Pro: 10k), then $25/1k |
| Code execution | Gratis | Gratis |
| URL context | Gratis | Tokens como input normal |
| File search | Gratis | Embeddings $0.15/1M + tokens |

---

## Batch API

**50% descuento** en todos los modelos.

Ideal para:
- Procesamiento de alto volumen
- Latencia no crítica
- Embeddings masivos

---

## Notas

- **RPD** = Requests Per Day
- **Free Tier**: Datos usados para mejorar productos
- **Paid Tier**: Datos NO usados para entrenar
- Precios sujetos a cambios - verificar en [ai.google.dev/pricing](https://ai.google.dev/pricing)
