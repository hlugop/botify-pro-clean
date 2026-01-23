---
description: Testear el flujo completo de captura de leads con el agente Gemini. Simula una conversación y verifica que el patrón LEAD_CAPTURED funciona correctamente.
---

# Test de Captura de Leads - Botify Pro

Ejecutar tests del sistema de captura de leads con Gemini.

## 1. Contexto del Sistema

El agente de chat tiene estas instrucciones:
- Capturar: **Nombre**, **Email**, **Empresa**
- Cuando tenga los 3 datos, incluir: `LEAD_CAPTURED:{"nombre":"...","email":"...","empresa":"..."}`
- La respuesta limpia (sin el JSON) se envía al usuario

## 2. Tests a Ejecutar

### 2.1 Test de Conversación Completa (Happy Path)

Simular conversación multi-turn:

```python
# Turn 1
POST /api/chat
{"message": "Hola, me interesa su servicio", "history": []}

# Turn 2 (con historial)
POST /api/chat
{"message": "Me llamo Carlos Mendez", "history": [...]}

# Turn 3
POST /api/chat
{"message": "Mi email es carlos@empresa.com", "history": [...]}

# Turn 4 - Debe capturar lead
POST /api/chat
{"message": "Trabajo en TechSolutions", "history": [...]}
```

**Verificar**: 
- Respuesta incluye `"lead_captured": {"nombre": "Carlos Mendez", "email": "carlos@empresa.com", "empresa": "TechSolutions"}`

### 2.2 Test de Detección de Patrón

Verificar que el regex funciona:
```python
import re
test_response = 'Gracias Carlos! LEAD_CAPTURED:{"nombre":"Carlos","email":"c@t.com","empresa":"Tech"}'
pattern = r'LEAD_CAPTURED:(\{.*?\})'
match = re.search(pattern, test_response)
# Debe encontrar el JSON
```

### 2.3 Test de Limpieza de Respuesta

Verificar que el JSON se elimina de la respuesta al usuario:
- Input del bot: `"¡Perfecto! LEAD_CAPTURED:{...}"`
- Output al frontend: `"¡Perfecto!"`

### 2.4 Test de Persistencia (si aplica)

Verificar endpoint `/api/lead`:
```bash
curl -X POST https://[URL]/api/lead \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Test User", "email": "test@test.com", "empresa": "Test Corp"}'
```

### 2.5 Test de Edge Cases

- [ ] Usuario da email inválido → El agente debe pedir corrección
- [ ] Usuario solo da 2 de 3 datos → No debe triggear LEAD_CAPTURED
- [ ] Datos con caracteres especiales (ñ, acentos) → Debe manejar UTF-8
- [ ] Conversación muy larga → Verificar que el historial se mantiene

## 3. Script de Test Automatizado

Generar script Python que:
1. Haga las llamadas secuenciales
2. Mantenga el historial entre llamadas
3. Verifique que `lead_captured` aparece en la respuesta final
4. Reporte tiempo total de la conversación

## 4. Checklist de Debugging

Si el lead no se captura:
- [ ] Verificar que `GEMINI_API_KEY` está configurada
- [ ] Revisar logs del backend para errores de Gemini
- [ ] Verificar que el system instruction está correcto
- [ ] Probar el modelo directamente en Google AI Studio

Si el JSON no se parsea:
- [ ] Verificar que Gemini está generando JSON válido
- [ ] Revisar el regex pattern
- [ ] Verificar encoding de caracteres especiales

## 5. Output Esperado

Generar reporte con:
- ✅ / ❌ Estado de cada test
- Conversación completa simulada
- Lead capturado (si exitoso)
- Tiempo de respuesta promedio por turn
- Errores y recomendaciones

$ARGUMENTS
