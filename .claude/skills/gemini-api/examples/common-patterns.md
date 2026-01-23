# Patrones Comunes - Gemini API

## Setup Básico

```python
from google import genai
from google.genai import types

# Client con API key desde env
client = genai.Client()

# O explícito
# client = genai.Client(api_key="YOUR_KEY")
```

---

## Generación Simple

```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explica machine learning en 3 oraciones."
)
print(response.text)
```

---

## Chat Multi-turn

### Con Interactions API (Stateful)

```python
# Turn 1
interaction1 = client.interactions.create(
    model="gemini-2.5-flash",
    input="Mi nombre es Carlos."
)

# Turn 2 (con contexto)
interaction2 = client.interactions.create(
    model="gemini-2.5-flash",
    input="¿Cuál es mi nombre?",
    previous_interaction_id=interaction1.id
)

print(interaction2.outputs[-1].text)  # "Carlos"
```

### Stateless (Manual)

```python
history = []

def chat(user_message):
    history.append({"role": "user", "content": user_message})
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=history
    )
    
    history.append({"role": "model", "content": response.text})
    return response.text

chat("Hola, soy Maria")
chat("¿Cómo me llamo?")
```

---

## Streaming

```python
stream = client.interactions.create(
    model="gemini-2.5-flash",
    input="Escribe un poema corto",
    stream=True
)

for chunk in stream:
    if chunk.event_type == "content.delta" and chunk.delta.type == "text":
        print(chunk.delta.text, end="", flush=True)
```

---

## System Instructions

```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="¿Qué es Python?",
    config=types.GenerateContentConfig(
        system_instruction="Eres un profesor amigable. Responde de forma simple y con ejemplos."
    )
)
```

---

## Configuración de Generación

```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Escribe una historia creativa",
    config=types.GenerateContentConfig(
        temperature=0.9,          # 0.0 - 2.0 (más alto = más creativo)
        max_output_tokens=1000,   # Límite de tokens
        top_p=0.95,               # Nucleus sampling
        top_k=40,                 # Top-k sampling
    )
)
```

---

## Análisis de Imagen

```python
import base64

# Desde archivo
with open("image.jpg", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[
        {"type": "text", "text": "Describe esta imagen en detalle"},
        {"type": "image", "data": image_data, "mime_type": "image/jpeg"}
    ]
)
```

---

## Análisis de PDF

```python
# Subir PDF grande
file = client.files.upload(file="documento.pdf")

# Esperar procesamiento
import time
while client.files.get(name=file.name).state != "ACTIVE":
    time.sleep(2)

# Analizar
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[
        {"type": "document", "uri": file.uri},
        {"type": "text", "text": "Resume los puntos principales de este documento"}
    ]
)
```

---

## JSON Output (Structured)

```python
from pydantic import BaseModel
from typing import List

class Recipe(BaseModel):
    name: str
    ingredients: List[str]
    steps: List[str]
    prep_time_minutes: int

interaction = client.interactions.create(
    model="gemini-2.5-flash",
    input="Dame una receta de tacos",
    response_format=Recipe.model_json_schema()
)

recipe = Recipe.model_validate_json(interaction.outputs[-1].text)
print(f"Receta: {recipe.name}")
print(f"Ingredientes: {recipe.ingredients}")
```

---

## Function Calling

```python
# Definir tool
calculator_tool = {
    "type": "function",
    "name": "calculate",
    "description": "Realiza operaciones matemáticas",
    "parameters": {
        "type": "object",
        "properties": {
            "expression": {"type": "string", "description": "Expresión matemática"}
        },
        "required": ["expression"]
    }
}

# Usar
interaction = client.interactions.create(
    model="gemini-2.5-flash",
    input="¿Cuánto es 15 * 23 + 7?",
    tools=[calculator_tool]
)

# Procesar tool call
for output in interaction.outputs:
    if output.type == "function_call":
        result = eval(output.arguments["expression"])  # ⚠️ Solo demo
        
        # Devolver resultado
        final = client.interactions.create(
            model="gemini-2.5-flash",
            previous_interaction_id=interaction.id,
            input=[{
                "type": "function_result",
                "name": output.name,
                "call_id": output.id,
                "result": str(result)
            }]
        )
        print(final.outputs[-1].text)
```

---

## Grounding con Google Search

```python
interaction = client.interactions.create(
    model="gemini-2.5-flash",
    input="¿Qué noticias hay hoy sobre inteligencia artificial?",
    tools=[{"type": "google_search"}]
)

# Filtrar solo texto (no metadata de búsqueda)
text = next((o.text for o in interaction.outputs if o.type == "text"), "")
print(text)
```

---

## Code Execution

```python
interaction = client.interactions.create(
    model="gemini-2.5-flash",
    input="Calcula los primeros 20 números de Fibonacci y muéstralos",
    tools=[{"type": "code_execution"}]
)

print(interaction.outputs[-1].text)
```

---

## Embeddings para Búsqueda

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Documentos
docs = [
    "Python es un lenguaje de programación",
    "Machine learning usa algoritmos",
    "La torre Eiffel está en París"
]

# Embeddings de documentos
doc_result = client.models.embed_content(
    model="gemini-embedding-001",
    contents=docs,
    config=types.EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT")
)
doc_vectors = np.array([e.values for e in doc_result.embeddings])

# Buscar
query = "¿Qué es Python?"
query_result = client.models.embed_content(
    model="gemini-embedding-001",
    contents=query,
    config=types.EmbedContentConfig(task_type="RETRIEVAL_QUERY")
)
query_vector = np.array(query_result.embeddings[0].values)

# Encontrar más similar
similarities = cosine_similarity([query_vector], doc_vectors)[0]
best_idx = np.argmax(similarities)
print(f"Resultado: {docs[best_idx]}")
```

---

## Thinking Mode

```python
interaction = client.interactions.create(
    model="gemini-2.5-flash",
    input="Resuelve paso a paso: Si tengo 3 manzanas y compro el doble, ¿cuántas tengo?",
    generation_config={
        "thinking_level": "high",
        "thinking_summaries": "auto"
    }
)

for output in interaction.outputs:
    if output.type == "thought":
        print(f"[Pensando]: {output.summary}")
    elif output.type == "text":
        print(f"[Respuesta]: {output.text}")
```

---

## Error Handling

```python
from google.genai.errors import ClientError, ServerError

try:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="..."
    )
except ClientError as e:
    print(f"Error de cliente (4xx): {e}")
except ServerError as e:
    print(f"Error de servidor (5xx): {e}")
except Exception as e:
    print(f"Error inesperado: {e}")
```

---

## Context Caching (Reducir Costos)

```python
# Para prompts largos que se reusan
# Ideal para: system prompts largos, documentos de referencia

# 1. Crear cache (ejemplo conceptual)
# cache = client.caches.create(
#     model="gemini-2.5-flash",
#     contents=[large_document],
#     ttl="3600s"  # 1 hora
# )

# 2. Usar cache en requests
# response = client.models.generate_content(
#     model="gemini-2.5-flash",
#     contents="Pregunta sobre el documento",
#     cached_content=cache.name
# )
```

---

## Rate Limiting / Retry

```python
import time
from google.genai.errors import ClientError

def generate_with_retry(prompt, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )
        except ClientError as e:
            if "429" in str(e):  # Rate limit
                wait = 2 ** attempt
                print(f"Rate limited, waiting {wait}s...")
                time.sleep(wait)
            else:
                raise
    raise Exception("Max retries exceeded")
```
