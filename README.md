# 📡 Tech‑Support‑Bot

A full‑stack tech support chatbot platform, built with Rasa (Python) for chatbot intelligence, FastAPI for backend services, and a React frontend.

---

## 🧠 Tech Stack & Overview

* **Chatbot (Rasa)**

  * Python 3.10
  * NLU, custom intents, domain, stories, actions

* **Backend**

  * FastAPI (Python 3.11, but compatible with Python 3.10)
  * Serves API endpoints, integrates with Rasa

* **Frontend**

  * React (JavaScript/TypeScript)
  * Connects to FastAPI to display and send chatbot messages

This modular architecture separates responsibilities:

* Rasa handles AI, NLP, conversation logic
* FastAPI exposes Rasa via REST API
* React offers a user-friendly UI

---

## 📁 Project Structure

```
├── chatbot/                          # Rasa chatbot
│   ├── data/
│   │   ├── nlu.yml
│   │   ├── rules.yml
│   │   └── stories.yml
│   ├── domain.yml
│   ├── actions.py                   # Custom action server
│   ├── config.yml
│   └── tests/
│
├── backend/                         # FastAPI server
│   ├── app/
│   │   ├── main.py
│   ├── requirements.txt
│
└── frontend/                        # React UI
    ├── public/
    └── src/
        ├── components/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        └── package.json
```

---

## 🛠️ Prerequisites

* **Python 3.10+** (chatbot expects 3.10; backend works with 3.10 or 3.11)
* Node.js & npm/yarn (for frontend)
* (Optional) Docker

---

## ⚙️ Setup & Run

### 1. Install dependencies

**Chatbot** (Rasa):

```bash
cd chatbot
python3.10 -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

**Backend** (FastAPI):

```bash
cd ../backend
python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Frontend** (React):

```bash
cd ../frontend
npm install
```

---

### 2. Train Rasa model

```bash
cd chatbot
source venv/bin/activate
rasa train
# the model will be saved under chatbot/models/
```

---

### 3. Run Rasa with API enabled

```bash
cd chatbot
rasa run --enable-api --cors "*" --debug
```

This starts Rasa on `http://localhost:5005/`, exposing endpoints like `/model/parse` and `/webhooks/rest/webhook`.

---

### 4. Launch FastAPI backend

```bash
cd ../backend
source venv/bin/activate
uvicorn app.main:app --reload
```

The backend will run on `http://localhost:8000/` and forward chat requests to Rasa.

---

### 5. Launch React frontend

```bash
cd ../frontend
npm start
```

Visit `http://localhost:5173` in your browser to access the chatbot UI.

---

## 🧪 Run Overview

| Component | Role                     | Default Port |
| --------- | ------------------------ | ------------ |
| Rasa      | NLP & conversation logic | `5005`       |
| Backend   | API intermediary to Rasa | `8000`       |
| Frontend  | Chatbot user interface   | `5173`       |

---

## ✅ Python Version Compatibility

* Chatbot (Rasa) tested on **Python 3.10**
* Backend runs on Python **3.11**, but you can use **3.10** for both
* Ensure your virtual env’s `python --version` is ≥ 3.10 before installing REST of requirements

---

## 🚀 Scaling the Bot

To make your bot enterprise-ready:

1. **Expand `domain.yml`** to include more intents, slots, and entities
2. **Add NLU data** (`nlu.yml`) with new training examples
3. **Include more conversation flows** in `stories.yml` and/or `rules.yml`
4. **Implement custom logic** via actions in `actions.py` (e.g., API calls)
5. Retrain with `rasa train` after every domain/story update

---

## 🛠️ Summary - Quick Start

```bash
# Chatbot
cd chatbot; source venv/bin/activate; pip install -r requirements.txt; rasa train; rasa run --enable-api

# Backend
cd ../backend; source venv/bin/activate; pip install -r requirements.txt; uvicorn app.main:app --reload

# Frontend
cd ../frontend; npm install; npm start
```

---

## 🎯 Contribution & Extension

Want to help or customize?
Fork the repo, add tips or demos to `stories.yml` or new domain files, improve `actions.py`, or extend UI components. Pull requests are especially welcome!

---

## 🧾 License

This project is under MIT License.

---

**Enjoy building your scalable, conversational AI Support Bot!**
