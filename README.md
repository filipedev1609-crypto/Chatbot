# 💬 Chatbot Web — Interface Conversacional com IA

> ChatBot web com backend Python e frontend em TypeScript, React, HTML5 e CSS3.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Python](https://img.shields.io/badge/Python-3.10+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-React-3178C6)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-orange)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📌 Sobre o projeto

O **Chatbot Web** é uma interface conversacional que conecta um frontend moderno em React/TypeScript a um backend Python. A comunicação acontece de forma assíncrona via Fetch API, processando mensagens em tempo real e retornando respostas de um modelo de linguagem.

O projeto cobre o ciclo completo de uma aplicação de IA: da requisição HTTP do usuário até a resposta processada pelo modelo.

---

## 🖥️ Demonstração

> *Prints / GIF da interface serão adicionados em breve*

---

## 🚀 Funcionalidades

- ✅ Interface de chat responsiva com React + TypeScript
- ✅ Comunicação assíncrona via Fetch API
- ✅ Backend Python processando mensagens
- ✅ Histórico de conversa na sessão
- 🔄 Integração com modelo de linguagem local (em desenvolvimento)
- 🔄 Deploy remoto (em desenvolvimento)

---

## 🛠️ Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React, TypeScript, HTML5, CSS3 |
| Backend | Python, FastAPI |
| Comunicação | Fetch API, REST, JSON |
| IA / Modelo | Modelo de linguagem local |
| Ambiente | Local (localhost) |

---

## 🔄 Como funciona

```
Usuário digita mensagem
        ↓
Frontend React (TypeScript)
        ↓
Fetch API → POST /chat
        ↓
Backend Python (FastAPI)
        ↓
Processamento / Modelo de linguagem
        ↓
JSON com resposta → Frontend
        ↓
Mensagem exibida no chat
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos
- Python 3.10+
- Node.js 18+

### Backend

```bash
# Clone o repositório
git clone https://github.com/filipedev1609-crypto/Chatbot
cd Chatbot/backend

# Instale as dependências
pip install -r requirements.txt

# Rode o servidor
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

# Instale as dependências
npm install

# Rode a aplicação
npm run dev
```

Acesse: `http://localhost:5173`

---

## 📁 Estrutura do projeto

```
Chatbot/
├── backend/
│   ├── main.py          # API FastAPI + endpoints de chat
│   ├── model.py         # Lógica do modelo de linguagem
│   └── schemas.py       # Modelos de dados (Pydantic)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Chat.tsx     # Componente principal do chat
│   │   ├── services/
│   │   │   └── api.ts       # Fetch API / comunicação HTTP
│   │   └── App.tsx
└── README.md
```

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/chat` | Envia mensagem e recebe resposta |
| `GET` | `/health` | Verifica se o servidor está ativo |

### Exemplo de requisição

```json
POST /chat
{
  "message": "Olá, como você pode me ajudar?",
  "session_id": "abc123"
}
```

### Exemplo de resposta

```json
{
  "response": "Olá! Posso te ajudar com...",
  "session_id": "abc123"
}
```

---

## 🔭 Próximos passos

- [ ] Deploy no Railway ou Render
- [ ] Persistência do histórico com banco de dados
- [ ] Autenticação de usuários
- [ ] Suporte a múltiplos modelos de IA
- [ ] Stream de respostas (resposta token a token)

---

## 👨‍💻 Autor

**Filipe Rezende**
Analista de TI | Dev Full Stack Jr
[LinkedIn](https://linkedin.com/in/filipe-rezende) · [GitHub](https://github.com/filipedev1609-crypto)
