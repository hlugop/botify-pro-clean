# Function Calling y Tools

## Function Calling Básico

```python
from google import genai

client = genai.Client()

# 1. Definir la tool
def get_weather(location: str):
    """Gets the weather for a given location."""
    return f"The weather in {location} is sunny."

weather_tool = {
    "type": "function",
    "name": "get_weather",
    "description": "Gets the weather for a given location.",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "The city and state, e.g. San Francisco, CA"
            }
        },
        "required": ["location"]
    }
}

# 2. Enviar request con tools
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input="What is the weather in Paris?",
    tools=[weather_tool]
)

# 3. Manejar tool call
for output in interaction.outputs:
    if output.type == "function_call":
        print(f"Tool Call: {output.name}({output.arguments})")
        
        # Ejecutar tool
        result = get_weather(**output.arguments)

        # Enviar resultado de vuelta
        interaction = client.interactions.create(
            model="gemini-3-flash-preview",
            previous_interaction_id=interaction.id,
            input=[{
                "type": "function_result",
                "name": output.name,
                "call_id": output.id,
                "result": result
            }]
        )
        print(f"Response: {interaction.outputs[-1].text}")
```

## Function Calling Stateless

Manejando todo el estado en el cliente:

```python
functions = [
    {
        "type": "function",
        "name": "schedule_meeting",
        "description": "Schedules a meeting with attendees at a given time.",
        "parameters": {
            "type": "object",
            "properties": {
                "attendees": {"type": "array", "items": {"type": "string"}},
                "date": {"type": "string", "description": "Date (e.g., 2024-07-29)"},
                "time": {"type": "string", "description": "Time (e.g., 15:00)"},
                "topic": {"type": "string", "description": "Subject of the meeting"},
            },
            "required": ["attendees", "date", "time", "topic"],
        },
    }
]

history = [{
    "role": "user",
    "content": [{"type": "text", "text": "Schedule a meeting for tomorrow at 10am with Peter about AI."}]
}]

# 1. Modelo decide llamar la función
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input=history,
    tools=functions
)

history.append({"role": "model", "content": interaction.outputs})

for output in interaction.outputs:
    if output.type == "function_call":
        # 2. Ejecutar función
        call_result = "Meeting scheduled successfully."

        # 3. Enviar resultado
        history.append({
            "role": "user",
            "content": [{
                "type": "function_result",
                "name": output.name,
                "call_id": output.id,
                "result": call_result
            }]
        })

        interaction2 = client.interactions.create(
            model="gemini-3-flash-preview",
            input=history,
        )
        print(f"Final: {interaction2.outputs[-1].text}")
```

---

## Built-in Tools

### Google Search (Grounding)

```python
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input="Who won the last Super Bowl?",
    tools=[{"type": "google_search"}]
)

text_output = next((o for o in interaction.outputs if o.type == "text"), None)
if text_output:
    print(text_output.text)
```

### Code Execution

```python
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input="Calculate the 50th Fibonacci number.",
    tools=[{"type": "code_execution"}]
)
print(interaction.outputs[-1].text)
```

### URL Context

```python
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input="Summarize the content of https://www.wikipedia.org/",
    tools=[{"type": "url_context"}]
)

text_output = next((o for o in interaction.outputs if o.type == "text"), None)
if text_output:
    print(text_output.text)
```

### Computer Use (Browser Control)

```python
interaction = client.interactions.create(
    model="gemini-2.5-computer-use-preview-10-2025",
    input="Search for highly rated smart fridges under $4000 on Google Shopping.",
    tools=[{
        "type": "computer_use",
        "environment": "browser",
        "excludedPredefinedFunctions": ["drag_and_drop"]
    }]
)

for output in interaction.outputs:
    print(output)
```

---

## Remote MCP (Model Context Protocol)

Conectar a servers MCP remotos:

```python
import datetime

mcp_server = {
    "type": "mcp_server",
    "name": "weather_service",  # snake_case, sin guiones
    "url": "https://example.com/mcp"
}

today = datetime.date.today().strftime("%d %B %Y")

interaction = client.interactions.create(
    model="gemini-2.5-flash",  # ⚠️ Gemini 3 no soporta MCP aún
    input="What is the weather in New York?",
    tools=[mcp_server],
    system_instruction=f"Today is {today}."
)

print(interaction.outputs[-1].text)
```

**Limitaciones MCP**:
- Solo Streamable HTTP servers (no SSE)
- No funciona con Gemini 3 (coming soon)
- Nombres de server en snake_case (no usar `-`)

---

## Combinar Tools con Structured Output

```python
from pydantic import BaseModel, Field
from typing import Literal, Union

class SpamDetails(BaseModel):
    reason: str
    spam_type: Literal["phishing", "scam", "unsolicited", "other"]

class NotSpamDetails(BaseModel):
    summary: str
    is_safe: bool

class ModerationResult(BaseModel):
    decision: Union[SpamDetails, NotSpamDetails]

interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input="Moderate: 'Click here to claim your prize: www.scam.com'",
    response_format=ModerationResult.model_json_schema(),
    tools=[{"type": "url_context"}]  # Analiza la URL
)

parsed = ModerationResult.model_validate_json(interaction.outputs[-1].text)
print(parsed)
```

---

## Definición de Tools - Esquema

```python
tool_definition = {
    "type": "function",
    "name": "function_name",           # Nombre único
    "description": "What it does",      # Descripción clara
    "parameters": {
        "type": "object",
        "properties": {
            "param1": {
                "type": "string",       # string, number, boolean, array, object
                "description": "What this param is for"
            },
            "param2": {
                "type": "array",
                "items": {"type": "string"},
                "description": "List of items"
            },
            "param3": {
                "type": "number",
                "enum": [1, 2, 3],      # Valores permitidos
                "description": "Must be 1, 2, or 3"
            }
        },
        "required": ["param1"]          # Parámetros obligatorios
    }
}
```

---

## Best Practices

1. **Descripciones claras** - El modelo usa la descripción para decidir cuándo llamar la tool
2. **Parámetros tipados** - Usar types específicos (`string`, `number`, etc.)
3. **Validar resultados** - Verificar que la tool retorna datos válidos
4. **Error handling** - Manejar casos donde la tool falla
5. **Limitar tools** - Solo incluir tools relevantes para la tarea
