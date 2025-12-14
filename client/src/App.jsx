import { Routes, Route } from "react-router-dom";
import CreateIdea from "./pages/CreateIdea";
import Dashboard from "./pages/Dashboard";
import IdeaDetail from "./pages/IdeaDetail";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Routes>
        <Route path="/" element={<CreateIdea />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ideas/:id" element={<IdeaDetail />} />
      </Routes>
    </div>
  );
}
