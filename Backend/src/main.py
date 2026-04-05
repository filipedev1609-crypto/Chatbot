from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

SYSTEM_PROMPT = {
    "role": "system",
    "content": """Você é um especialista em RH e análise de currículos. 
    Quando o usuário enviar um currículo, analise e responda em português com:
    1. ✅ Pontos fortes
    2. ⚠️ Pontos a melhorar  
    3. 💡 Sugestões práticas
    
    Se o usuário informar uma vaga específica, compare o currículo com os requisitos da vaga.
    Seja direto, amigável e construtivo."""
}

historico = [SYSTEM_PROMPT]

class Message(BaseModel):
    text: str
    mode: str = "default"

@app.post("/chat")
def chat_endpoint(message: Message):
    historico.append({"role": "user", "content": message.text})

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=historico,
        max_tokens=1024
    )

    resposta = response.choices[0].message.content
    historico.append({"role": "assistant", "content": resposta})

    return {"response": resposta}

@app.delete("/chat/reset")
def reset():
    historico.clear()
    historico.append(SYSTEM_PROMPT)  # ✅ Reutiliza o prompt completo
    return {"status": "histórico limpo"}