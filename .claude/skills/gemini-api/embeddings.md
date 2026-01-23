# Embeddings

## Modelo de Embeddings

**Model ID**: `gemini-embedding-001`

| Propiedad | Valor |
|-----------|-------|
| Input tokens | 2,048 |
| Output dimensions | 128 - 3,072 (flexible) |
| Dimensiones recomendadas | 768, 1536, 3072 |

## Generar Embeddings

### Texto Simple

```python
from google import genai

client = genai.Client()

result = client.models.embed_content(
    model="gemini-embedding-001",
    contents="What is the meaning of life?"
)

print(result.embeddings)
```

### Múltiples Textos (Batch)

```python
result = client.models.embed_content(
    model="gemini-embedding-001",
    contents=[
        "What is the meaning of life?",
        "What is the purpose of existence?",
        "How do I bake a cake?"
    ]
)

for embedding in result.embeddings:
    print(embedding)
```

---

## Task Types

Especificar el tipo de tarea optimiza los embeddings:

```python
from google.genai import types

result = client.models.embed_content(
    model="gemini-embedding-001",
    contents=["text1", "text2"],
    config=types.EmbedContentConfig(task_type="SEMANTIC_SIMILARITY")
)
```

| Task Type | Descripción | Uso |
|-----------|-------------|-----|
| `SEMANTIC_SIMILARITY` | Similitud entre textos | Recomendaciones, detección de duplicados |
| `CLASSIFICATION` | Clasificar por etiquetas | Análisis de sentimiento, spam |
| `CLUSTERING` | Agrupar por similitud | Organización de docs, anomalías |
| `RETRIEVAL_DOCUMENT` | Indexar documentos | Para búsqueda (documentos) |
| `RETRIEVAL_QUERY` | Buscar documentos | Para búsqueda (queries) |
| `CODE_RETRIEVAL_QUERY` | Buscar código | Sugerencias de código |
| `QUESTION_ANSWERING` | Preguntas Q&A | Chatbots |
| `FACT_VERIFICATION` | Verificar hechos | Fact-checking |

### Ejemplo: Similitud Semántica

```python
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

texts = [
    "What is the meaning of life?",
    "What is the purpose of existence?",
    "How do I bake a cake?",
]

result = client.models.embed_content(
    model="gemini-embedding-001",
    contents=texts,
    config=types.EmbedContentConfig(task_type="SEMANTIC_SIMILARITY")
)

# Matriz de similitud
df = pd.DataFrame(
    cosine_similarity([e.values for e in result.embeddings]),
    index=texts,
    columns=texts,
)
print(df)
```

---

## Controlar Dimensiones

Usar **Matryoshka Representation Learning (MRL)** para reducir dimensiones sin perder mucha calidad:

```python
result = client.models.embed_content(
    model="gemini-embedding-001",
    contents="What is the meaning of life?",
    config=types.EmbedContentConfig(output_dimensionality=768)
)

embedding = result.embeddings[0]
print(f"Length: {len(embedding.values)}")  # 768
```

**Dimensiones recomendadas**: 768, 1536, 3072

### Normalización

⚠️ **Solo el embedding de 3072 viene normalizado**. Para otras dimensiones, normalizar manualmente:

```python
import numpy as np

embedding_values = np.array(embedding.values)
normed = embedding_values / np.linalg.norm(embedding_values)

print(f"Norm: {np.linalg.norm(normed):.6f}")  # 1.000000
```

### Scores MTEB por Dimensión

| Dimensión | MTEB Score |
|-----------|------------|
| 3072 | 68.17 |
| 2048 | 68.16 |
| 1536 | 68.17 |
| 768 | 67.99 |
| 512 | 67.55 |
| 256 | 66.19 |
| 128 | 63.31 |

---

## RAG Pattern

### Indexar Documentos

```python
# 1. Crear embeddings de documentos
documents = [
    "Python is a programming language.",
    "Machine learning uses algorithms.",
    "The Eiffel Tower is in Paris."
]

doc_embeddings = client.models.embed_content(
    model="gemini-embedding-001",
    contents=documents,
    config=types.EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT")
)

# 2. Guardar en vector store (ejemplo con numpy)
import numpy as np
doc_vectors = np.array([e.values for e in doc_embeddings.embeddings])
```

### Buscar Documentos

```python
# 3. Crear embedding de query
query = "What is Python?"

query_embedding = client.models.embed_content(
    model="gemini-embedding-001",
    contents=query,
    config=types.EmbedContentConfig(task_type="RETRIEVAL_QUERY")
)

query_vector = np.array(query_embedding.embeddings[0].values)

# 4. Calcular similitud
from sklearn.metrics.pairwise import cosine_similarity

similarities = cosine_similarity([query_vector], doc_vectors)[0]
top_idx = np.argmax(similarities)

print(f"Most relevant: {documents[top_idx]}")
```

### RAG con Generación

```python
# 5. Usar documento relevante como contexto
context = documents[top_idx]

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=f"""Context: {context}

Question: {query}

Answer based on the context:"""
)

print(response.text)
```

---

## File Search Tool (RAG Gestionado)

Para RAG más simple, usar el tool `file_search`:

```python
# El modelo busca automáticamente en los archivos subidos
interaction = client.interactions.create(
    model="gemini-2.5-flash",
    input="What does the document say about pricing?",
    tools=[{"type": "file_search"}]
)
```

---

## Vector Databases

Servicios compatibles para producción:

**Google Cloud**:
- BigQuery
- AlloyDB
- Cloud SQL

**Third-party**:
- ChromaDB
- Pinecone
- QDrant
- Weaviate

---

## Precios

| Tier | Precio |
|------|--------|
| Free | Gratis |
| Paid | $0.15 / 1M tokens |

### Batch API

50% de descuento usando Batch API para embeddings de alto volumen.

---

## Best Practices

1. **Usar task_type correcto** - Mejora significativamente la calidad
2. **Normalizar si < 3072** - Para comparaciones de coseno precisas
3. **Batch processing** - Procesar múltiples textos en una llamada
4. **Dimensiones menores para escala** - 768 es suficiente para mayoría de casos
5. **Cache embeddings** - No regenerar para el mismo contenido
