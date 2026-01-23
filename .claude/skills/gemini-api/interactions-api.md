# Interactions API (Beta)

Interfaz unificada para interactuar con modelos Gemini y agentes. Simplifica state management, orquestación de tools y tareas de larga duración.

⚠️ **Beta**: Features y schemas pueden tener breaking changes.

## Uso Básico

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input="Tell me a short joke about programming."
)

print(interaction.outputs[-1].text)
```

## Conversaciones

### Stateful (Server-side)
El servidor mantiene el historial usando `previous_interaction_id`:

```python
# Primera interacción
interaction1 = client.interactions.create(
    model="gemini-3-flash-preview",
    input="Hi, my name is Phil."
)
print(f"Model: {interaction1.outputs[-1].text}")

# Segunda interacción (con contexto)
interaction2 = client.interactions.create(
    model="gemini-3-flash-preview",
    input="What is my name?",
    previous_interaction_id=interaction1.id
)
print(f"Model: {interaction2.outputs[-1].text}")
```

### Stateless (Client-side)
Manejar historial manualmente:

```python
conversation_history = [
    {"role": "user", "content": "What are the three largest cities in Spain?"}
]

interaction1 = client.interactions.create(
    model="gemini-3-flash-preview",
    input=conversation_history
)

# Agregar respuesta al historial
conversation_history.append({"role": "model", "content": interaction1.outputs})
conversation_history.append({
    "role": "user",
    "content": "What is the most famous landmark in the second one?"
})

interaction2 = client.interactions.create(
    model="gemini-3-flash-preview",
    input=conversation_history
)
```

### Recuperar Interacciones Pasadas

```python
previous_interaction = client.interactions.get("<YOUR_INTERACTION_ID>")
print(previous_interaction)
```

## Streaming

```python
stream = client.interactions.create(
    model="gemini-3-flash-preview",
    input="Explain quantum entanglement in simple terms.",
    stream=True
)

for chunk in stream:
    if chunk.event_type == "content.delta":
        if chunk.delta.type == "text":
            print(chunk.delta.text, end="", flush=True)
        elif chunk.delta.type == "thought":
            print(chunk.delta.thought, end="", flush=True)
    elif chunk.event_type == "interaction.complete":
        print(f"\n\n--- Stream Finished ---")
        print(f"Total Tokens: {chunk.interaction.usage.total_tokens}")
```

## Configuración

```python
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input="Tell me a story about a brave knight.",
    generation_config={
        "temperature": 0.7,
        "max_output_tokens": 500,
        "thinking_level": "low",
    }
)
```

## Agentes Especializados

### Deep Research Agent

```python
import time

# Iniciar Deep Research (background)
initial_interaction = client.interactions.create(
    input="Research the history of Google TPUs with a focus on 2025 and 2026.",
    agent="deep-research-pro-preview-12-2025",
    background=True
)

print(f"Research started. Interaction ID: {initial_interaction.id}")

# Poll para resultados
while True:
    interaction = client.interactions.get(initial_interaction.id)
    print(f"Status: {interaction.status}")

    if interaction.status == "completed":
        print("\nFinal Report:\n", interaction.outputs[-1].text)
        break
    elif interaction.status in ["failed", "cancelled"]:
        print(f"Failed with status: {interaction.status}")
        break

    time.sleep(10)
```

⚠️ `background=True` solo soportado para agents.

## Data Storage

Por defecto, las interacciones se guardan (`store=true`):

| Tier | Retención |
|------|-----------|
| Paid | 55 días |
| Free | 1 día |

Para opt-out:
```python
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input="...",
    store=False  # No guardar
)
```

⚠️ `store=false` es incompatible con `background=true` y `previous_interaction_id`.

### Eliminar Interacciones

```python
client.interactions.delete("<INTERACTION_ID>")
```

## Structured Output

```python
from pydantic import BaseModel, Field
from typing import Literal, Union

class SpamDetails(BaseModel):
    reason: str = Field(description="Why it's spam")
    spam_type: Literal["phishing", "scam", "unsolicited promotion", "other"]

class NotSpamDetails(BaseModel):
    summary: str = Field(description="Brief summary")
    is_safe: bool

class ModerationResult(BaseModel):
    decision: Union[SpamDetails, NotSpamDetails]

interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input="Moderate: 'Congratulations! You've won a free cruise...'",
    response_format=ModerationResult.model_json_schema(),
)

parsed = ModerationResult.model_validate_json(interaction.outputs[-1].text)
print(parsed)
```

## Modelo de Datos

### Interaction Object

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `id` | string | ID único |
| `model` / `agent` | string | Modelo o agente usado |
| `input` | Content[] | Inputs proporcionados |
| `outputs` | Content[] | Respuestas del modelo |
| `tools` | Tool[] | Tools usados |
| `previous_interaction_id` | string | ID de interacción previa |
| `stream` | boolean | Si es streaming |
| `status` | string | `completed`, `in_progress`, `requires_action`, `failed` |
| `background` | boolean | Si corre en background |
| `store` | boolean | Si se guarda (default: true) |
| `usage` | Usage | Tokens usados |

## Limitaciones Actuales

- Remote MCP no funciona con Gemini 3 (coming soon)
- Grounding with Google Maps no soportado
- Combinar MCP + Function Call + Built-in tools no soportado aún
- Orden de contenido para built-in tools puede ser incorrecto a veces
