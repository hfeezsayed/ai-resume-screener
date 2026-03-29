# 🧠 AI Resume Screener

An AI-powered web application that analyzes resumes and compares them with job descriptions to provide a match score, missing skills, and improvement suggestions.

---

## 🚀 Features

- 📄 Upload resume (PDF)
- 🧠 AI-based resume analysis
- 📊 Match score (0–100)
- ❌ Identify missing skills
- 💡 Suggest improvements
- 🎨 Modern UI with drag & drop upload

---

## 🛠️ Tech Stack

### Backend

- Python
- FastAPI
- OpenAI API
- pdfplumber

### Frontend

- Next.js
- React
- Tailwind CSS

---

## 📸 Screenshots

### 🟢 Upload Resume UI

![Upload UI](/upload-ui.png)

---

### 🔵 Analysis Result UI

![Result UI](/result-ui.png)

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/hfeezsayed/ai-resume-screener.git
cd ai-resume-screener
```

---

### 2️⃣ Backend Setup

```bash
cd ai-resume-screener
python -m venv venv
venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

Create `.env` file:

```
OPENAI_API_KEY=your_api_key_here
```

Run backend:

```bash
uvicorn app.main:app --reload
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open:
👉 http://localhost:3000

---

## How It Works

1. User uploads resume (PDF)
2. Backend extracts text using pdfplumber
3. Resume is compared with job description using OpenAI
4. AI returns:
   - Score
   - Missing skills
   - Suggestions

5. Frontend displays results visually

---

## Future Improvements

- ✅ Resume ranking system
- ✅ Recruiter dashboard
- ✅ Authentication system
- ✅ Cloud deployment

---

## 🤝 Author

Built by **[Hafeez Ali]**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
