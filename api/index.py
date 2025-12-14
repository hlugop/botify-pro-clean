from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pydantic import BaseModel
from typing import List, Optional, Any, Dict, Union
import google.generativeai as genai
import sqlite3
import pandas as pd
from datetime import datetime
import os
import json
import re

app = FastAPI()

# Configurar CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurar Google Gemini
GEMINI_API_KEY = "AIzaSyDvX0uc4lGP6FMUNN4K8MJQrEJRwtjYzTc"
genai.configure(api_key=GEMINI_API_KEY)

# Instanciar el modelo con system instruction MEJORADO
SYSTEM_INSTRUCTION = """Eres Botify, un experto en automatización de ventas. Tu objetivo es conversar amablemente con el usuario para obtener su Nombre, Email y Empresa.

IMPORTANTE: Cuando hayas capturado los 3 datos (nombre, email, empresa), debes incluir EXACTAMENTE este texto al final de tu respuesta:

LEAD_CAPTURED:{"nombre":"[nombre]","email":"[email]","empresa":"[empresa]"}

Ejemplo:
"¡Excelente, Juan! Ya tengo tus datos registrados. ¿En qué podemos ayudarte?
LEAD_CAPTURED:{"nombre":"Juan Pérez","email":"juan@email.com","empresa":"TechCorp"}"

Sé conciso y profesional."""

model = genai.GenerativeModel(
    model_name="gemini-flash-latest",
    system_instruction=SYSTEM_INSTRUCTION
)

# Inicializar base de datos SQLite
DB_PATH = "chat_history.db"

def init_db():
    """Crea la tabla de historial de chat si no existe"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            role TEXT NOT NULL,
            message TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

# Inicializar la base de datos al iniciar
init_db()

# Modelos Pydantic para validación
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Union[List[ChatMessage], List[Dict[str, Any]], None] = []

class LeadRequest(BaseModel):
    nombre: str
    email: str
    empresa: str

# Endpoints
@app.get("/api")
def read_root():
    return {"message": "Hello World from FastAPI!"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "Botify Pro API"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """
    Endpoint para el chat con Gemini.
    Recibe mensaje e historial, genera respuesta y guarda en SQLite.
    Detecta automáticamente si se capturó un lead.
    """
    try:
        # Convertir historial al formato de Gemini
        chat_history = []
        for msg in request.history or []:
            if isinstance(msg, ChatMessage):
                role = msg.role
                content = msg.content
            elif isinstance(msg, dict):
                role = msg.get("role")
                content = msg.get("content")
            else:
                continue

            if role == "user":
                chat_history.append({"role": "user", "parts": [content]})
            elif role == "bot":
                chat_history.append({"role": "model", "parts": [content]})
        
        # Iniciar conversación con historial
        chat = model.start_chat(history=chat_history)
        
        # Generar respuesta
        response = chat.send_message(request.message)
        bot_response = response.text
        
        # PASO 1: Detectar si hay un lead capturado
        lead_data = None
        clean_response = bot_response
        
        # Buscar el patrón LEAD_CAPTURED:{...}
        lead_match = re.search(r'LEAD_CAPTURED:(\{.*?\})', bot_response)
        if lead_match:
            try:
                # Extraer el JSON del lead
                lead_json = lead_match.group(1)
                lead_data = json.loads(lead_json)
                
                # Limpiar la respuesta para el usuario (quitar el JSON)
                clean_response = bot_response.replace(lead_match.group(0), '').strip()
                
                print(f"✓ LEAD CAPTURADO: {lead_data}")
            except json.JSONDecodeError:
                print("⚠ Error al parsear lead JSON")
        
        # Guardar mensaje del usuario en SQLite
        save_to_db("user", request.message)
        
        # Guardar respuesta del bot en SQLite (limpia, sin el JSON)
        save_to_db("bot", clean_response)
        
        # PASO 2: Retornar respuesta con indicador de lead
        return {
            "response": clean_response,
            "lead_captured": lead_data  # None si no hay lead, o el objeto lead
        }
    
    except Exception as e:
        print(f"Error en /api/chat: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error al procesar el mensaje: {str(e)}"
        )

@app.post("/api/lead")
async def save_lead(lead: LeadRequest):
    """
    Endpoint para guardar leads en Excel.
    """
    try:
        excel_path = "leads_locales.xlsx"
        
        # Crear DataFrame con el nuevo lead
        new_lead = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "nombre": lead.nombre,
            "email": lead.email,
            "empresa": lead.empresa
        }
        
        # Si el archivo existe, leerlo y agregar la nueva fila
        if os.path.exists(excel_path):
            df = pd.read_excel(excel_path)
            df = pd.concat([df, pd.DataFrame([new_lead])], ignore_index=True)
        else:
            # Si no existe, crear nuevo DataFrame
            df = pd.DataFrame([new_lead])
        
        # Guardar el archivo
        df.to_excel(excel_path, index=False)
        
        print(f"✓ Lead guardado en Excel: {lead.nombre} - {lead.email} - {lead.empresa}")
        
        return {"status": "success", "message": "Lead guardado correctamente"}
    
    except Exception as e:
        print(f"Error en /api/lead: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error al guardar el lead: {str(e)}"
        )

def save_to_db(role: str, message: str):
    """Guarda un mensaje en la base de datos SQLite"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cursor.execute(
            "INSERT INTO chat_history (timestamp, role, message) VALUES (?, ?, ?)",
            (timestamp, role, message)
        )
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error al guardar en DB: {str(e)}")

# Handler para Vercel
handler = Mangum(app)