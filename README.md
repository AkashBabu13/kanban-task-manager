# 🗂️ Task Management Dashboard (ReactJS)

This is a client-side Task Management Dashboard built in **ReactJS** that allows users to manage tasks using a **Kanban-style board**.

## 🚀 Features

- ✅ View tasks in three columns: **To Do**, **In Progress**, **Done**
- ➕ Create new tasks via a form (with Title, Description, and Status)
- 🖱️ Drag and drop tasks between columns using React DnD
- 🔄 Persist tasks using API calls (axios + mock API)
- 🎨 Responsive design with clean CSS

## 🧑‍💻 Tech Stack

- **ReactJS** – Functional components and Hooks
- **Axios** – API integration
- **React DnD** – Drag-and-drop library
- **CSS** – Custom responsive styles
- **Mock API** – `jsonplaceholder.typicode.com`

---

## 🖼️ Project Structure

task-dashboard/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── TaskBoard.js
│ │ ├── AddTaskForm.js
│ │ ├── Column.js
│ │ └── Task.js
│ ├── TaskBoard.css
│ ├── App.js
│ └── index.js
├── package.json
└── README.md

## ⚙️ Getting Started

### 🛠 Prerequisites

- Node.js (v14 or higher)
- npm

---

### 🔧 Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/AkashBabu13/task-dashboard.git
cd task-dashboard

npm install

npm start

This will start the development server at http://localhost:3000
```
