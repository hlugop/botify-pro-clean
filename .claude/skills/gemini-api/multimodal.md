# Multimodal - Imágenes, Audio, Video, PDF

## Entrada Multimodal

Tres formas de proporcionar archivos:
1. **URL pública** - `uri` field
2. **Base64 inline** - `data` field
3. **Files API** - Para archivos grandes

### Imágenes

```python
from google import genai

client = genai.Client()

# Opción 1: URL pública
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input=[
        {"type": "text", "text": "Describe the image."},
        {
            "type": "image",
            "uri": "https://example.com/image.png",
            "mime_type": "image/png"
        }
    ]
)
print(interaction.outputs[-1].text)

# Opción 2: Base64
import base64

with open("image.png", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()

interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input=[
        {"type": "text", "text": "Describe this image."},
        {
            "type": "image",
            "data": image_data,
            "mime_type": "image/png"
        }
    ]
)
```

### Audio

```python
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input=[
        {"type": "text", "text": "What does this audio say?"},
        {
            "type": "audio",
            "uri": "https://example.com/audio.wav",
            "mime_type": "audio/wav"
        }
    ]
)
```

### Video

```python
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input=[
        {"type": "text", "text": "What is happening? Provide a timestamped summary."},
        {
            "type": "video",
            "uri": "https://example.com/video.mp4",
            "mime_type": "video/mp4"
        }
    ]
)
```

### PDF / Documentos

```python
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input=[
        {"type": "text", "text": "What is this document about?"},
        {
            "type": "document",
            "uri": "https://example.com/document.pdf",
            "mime_type": "application/pdf"
        }
    ]
)
```

**Límite**: Hasta 1000 páginas de PDF.

---

## Files API (Archivos Grandes)

Para archivos que exceden límites inline:

```python
import time

# 1. Subir archivo
file = client.files.upload(file="large_video.mp4")

# 2. Esperar procesamiento
while client.files.get(name=file.name).state != "ACTIVE":
    time.sleep(2)

# 3. Usar en interacción
interaction = client.interactions.create(
    model="gemini-3-flash-preview",
    input=[
        {"type": "video", "uri": file.uri},
        {"type": "text", "text": "Summarize this video."}
    ]
)
```

---

## Generación Multimodal

### Generación de Imágenes

```python
import base64

interaction = client.interactions.create(
    model="gemini-3-pro-image-preview",
    input="Generate an image of a futuristic city.",
    response_modalities=["IMAGE"]
)

for output in interaction.outputs:
    if output.type == "image":
        print(f"Generated image: {output.mime_type}")
        with open("generated.png", "wb") as f:
            f.write(base64.b64decode(output.data))
```

### Configurar Imagen de Salida

```python
interaction = client.interactions.create(
    model="gemini-3-pro-image-preview",
    input="Generate an image of a futuristic city.",
    generation_config={
        "image_config": {
            "aspect_ratio": "9:16",  # 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9
            "image_size": "2k"       # 1k, 2k, 4k
        }
    }
)
```

### Text-to-Speech (TTS)

```python
import base64
import wave

def save_wave(filename, pcm, channels=1, rate=24000, sample_width=2):
    with wave.open(filename, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(rate)
        wf.writeframes(pcm)

interaction = client.interactions.create(
    model="gemini-2.5-flash-preview-tts",
    input="Say: WOOHOO This is so much fun!",
    response_modalities=["AUDIO"],
    generation_config={
        "speech_config": {
            "language": "en-us",
            "voice": "kore"
        }
    }
)

for output in interaction.outputs:
    if output.type == "audio":
        save_wave("output.wav", base64.b64decode(output.data))
```

### Multi-Speaker TTS

```python
interaction = client.interactions.create(
    model="gemini-2.5-flash-preview-tts",
    input="""TTS the following conversation between Alice and Bob:
Alice: Hi Bob, how are you doing today?
Bob: I'm doing great, thanks for asking!""",
    response_modalities=["AUDIO"],
    generation_config={
        "speech_config": [
            {"voice": "Zephyr", "speaker": "Alice", "language": "en-US"},
            {"voice": "Puck", "speaker": "Bob", "language": "en-US"}
        ]
    }
)
```

---

## MIME Types Soportados

### Imágenes
- `image/png`
- `image/jpeg`
- `image/gif`
- `image/webp`

### Audio
- `audio/wav`
- `audio/mp3`
- `audio/aiff`
- `audio/aac`
- `audio/ogg`
- `audio/flac`

### Video
- `video/mp4`
- `video/mpeg`
- `video/mov`
- `video/avi`
- `video/x-flv`
- `video/mpg`
- `video/webm`
- `video/wmv`
- `video/3gpp`

### Documentos
- `application/pdf`
- `text/plain`
- `text/html`
- `text/css`
- `text/javascript`
- `application/json`
- `text/markdown`
- `text/csv`
- `text/xml`

---

## Long Context

Todos los modelos Gemini 2.5+ soportan hasta **1 millón de tokens** de entrada.

Casos de uso:
- Analizar videos largos
- Procesar documentos extensos
- Codebases completos
- Múltiples archivos en una sola llamada

```python
# Múltiples archivos en una llamada
interaction = client.interactions.create(
    model="gemini-2.5-flash",
    input=[
        {"type": "document", "uri": file1.uri},
        {"type": "document", "uri": file2.uri},
        {"type": "document", "uri": file3.uri},
        {"type": "text", "text": "Compare these three documents."}
    ]
)
```
