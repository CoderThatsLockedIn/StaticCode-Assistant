# ⚡ StaticCode Assistant

<div align="center">

  <p><strong>An advanced, multi-language AI-powered static code analysis platform built with the MERN stack and Google Gemini API.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Google%20Gemini-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini API" />
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
  </p>
</div>

---

## 🚀 Overview

**StaticCode Assistant** is a full-stack web application designed to help developers instantly evaluate source code for syntax issues, security vulnerabilities, performance bottlenecks, and style violations. Powered by **Google Gemini (`gemini-3.8-flash`)**, the platform processes multi-language snippets and returns structured, actionable feedback categorized by severity.

---

## ✨ Key Features

* **🤖 AI-Driven Static Analysis**: Leverages Google Generative AI with structured JSON outputs for precise bug hunting and code refactoring suggestions.
* **🌍 Multi-Language Support**: Fully compatible with **Python, JavaScript/TypeScript, C, C++, Java, MySQL, and HTML/CSS**.
* **⌨️ IDE-Grade Code Editor**: Features a custom `Tab` key interceptor that inserts clean 4-space indentation instead of shifting browser focus.
* **🔒 Secure Authentication**: Implements cookie-based JWT authentication with secure session state handling (`credentials: 'include'`).
* **🛡️ Robust Error Handling**: Built-in exponential backoff retry logic and traffic-spike protection for smooth API communication.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React, React Router, Tailwind CSS, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB & Mongoose Atlas |
| **AI Engine** | Google Generative AI SDK (`gemini-3.8-flash`) |
| **Auth** | JSON Web Tokens (JWT) stored via Secure HttpOnly Cookies |

---

## 📂 Project Structure

```text
StaticCode-Assistant/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI elements
│   │   ├── pages/          # Dashboard, NewReview, Login, Register
│   │   └── App.jsx
│   └── package.json
├── server/                 # Express Backend
│   ├── models/             # Mongoose Schemas (User, ReviewSession)
│   ├── routes/             # API Endpoints (Auth, Reviews)
│   ├── utils/              # AI Static Analyzer engine
│   ├── server.js           # Entry point
│   └── package.json
└── .gitignore
