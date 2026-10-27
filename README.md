# Static Code Analysis Assistant (MERN Stack)

A full-stack web application designed for developers to submit code snippets, run automated AI-driven quality and security reviews, and track their analysis history on a secure dashboard.

## 📺 Demo Video
Watch the complete project demonstration here:  
👉 **[Watch the Demo Video](https://drive.google.com/file/d/1vDoUt27V0PBGH1n00UETNbdxPm2yq4ES/view?usp=sharing)**

---

## 🚀 Key Features
* **AI-Powered Code Analysis:** Evaluates source code for syntax errors, bugs, security vulnerabilities, performance issues, and style violations using Gemini AI.
* **Review History Dashboard:** View past code reviews, severity summaries (High, Medium, Low issues), and detailed findings.
* **Secure Authentication:** Cookie-based session authentication (`withCredentials: true`, `sameSite: 'none'`, `secure: true`) with synchronized loading gates to prevent UI flashing.
* **Resilient Infrastructure:** Configured with optimized timeout controllers and exponential backoff retry logic to handle traffic spikes smoothly.

---

## 🛠️ Technologies Used

### **Frontend**
* React & Vite
* Tailwind CSS
* React Router
* Axios

### **Backend**
* Node.js & Express.js
* MongoDB & Mongoose

### **AI & External API**
* Google Generative AI API (`node-fetch`)

### **Hosting & Infrastructure**
* Vercel (Deployed across client and server subdomains)

---

## 🌐 Live Application & Architecture
The application is deployed on Vercel with a separated architecture:
* **Client App:** Hosts the single-page React interface, state management, and dashboard components.
* **API Server:** Handles REST API requests, MongoDB connections, user authentication middleware, and communication with the Gemini API.
