# AI Startup Idea Validator

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)
![OpenAI](https://img.shields.io/badge/AI-OpenAI-black?logo=openai)

An AI-powered full-stack web application that helps founders quickly validate startup ideas by generating a structured analysis covering the problem, target customer, market, competitors, risks, and profitability.

This project was built as part of a full-stack + AI technical assignment to demonstrate practical development skills, system design thinking, and real-world AI integration.

---

## Live Demo

- **Frontend (Vercel):** _To be added_
- **Backend (Render):** _To be added_

---

## Features

- Submit a startup idea with a title and description
- AI-generated validation report including:
  - Problem statement
  - Target customer
  - Market overview
  - Competitor analysis
  - Suggested tech stack
  - Risk level
  - Profitability score with justification
- Dashboard view of all submitted ideas
- Detailed idea analysis page
- Delete ideas
- Export idea analysis as a PDF

---

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- React Router
- React Hot Toast
- Lucide React Icons

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- OpenAI API

### Other

- Client-side PDF export using `html2pdf.js`

---

## Architecture Overview

The project is structured as two separate applications:

- **Client** – A React frontend responsible for user interaction, form handling, dashboards, and PDF export.
- **Server** – An Express backend that handles API requests, integrates with the OpenAI API, and persists data to MongoDB.

### High-level Flow

1. User submits a startup idea from the frontend
2. Backend sends the idea to the OpenAI API
3. AI generates a structured validation response
4. Result is stored in MongoDB
5. Frontend displays the idea on the dashboard and detail pages
6. Users can export the analysis as a PDF

---

## PDF Export Approach

PDF export is implemented on the client side using `html2pdf.js`.

To ensure a clean, readable document:

- A temporary **PDF mode** is applied during export
- Dark UI styles are replaced with print-friendly styles
- Interactive UI elements are hidden
- The layout is optimized for readability

For a production system, a server-side PDF solution could be considered, but a client-side approach was chosen here to keep the MVP lightweight and simple.

---

## Project Structure

```
AI-Startup-Idea-Validator/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.js
│   ├── package.json
│   └── .env
└── README.md
```

---

## Running Locally

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or cloud)
- OpenAI API key

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

Start the server:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

---

## Design Decisions & Trade-offs

- React + Express were chosen for familiarity and fast iteration
- MongoDB was used for flexible schema design
- Client-side PDF export was selected to avoid backend complexity for an MVP
- Contextual navigation was preferred over a global navbar to keep the UI focused
- The UI prioritizes clarity and usability over heavy visual effects

---

## Possible Future Improvements

- Authentication and user accounts
- Idea comparison and scoring history
- Improved AI prompting with stricter schemas
- Server-side PDF generation
- Analytics and insights across multiple ideas

---

## Author

Built by **Krtyaka**
