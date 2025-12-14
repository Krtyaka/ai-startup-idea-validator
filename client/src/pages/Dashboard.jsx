import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchIdeas, deleteIdea } from "../api/ideas";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const data = await fetchIdeas();
      setIdeas(data);
    } catch {
      toast.error("Failed to load ideas.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteIdea(id);
      setIdeas((prev) => prev.filter((idea) => idea._id !== id));
      toast.success("Idea deleted.");
    } catch {
      toast.error("Failed to delete idea.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Ideas Dashboard
            </h1>
            <p className="mt-1 text-sm text-neutral-400">
              Review and manage validated startup ideas.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800 transition"
          >
            New Idea
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-sm text-neutral-400">Loading ideas…</p>
        ) : ideas.length === 0 ? (
          <div className="rounded-lg border border-neutral-800 bg-black/50 p-6 text-center">
            <p className="text-sm text-neutral-400">No ideas submitted yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="rounded-xl border border-neutral-800 bg-black/70 p-5
                           hover:border-neutral-700 hover:bg-neutral-900
                           transition"
              >
                <div
                  onClick={() => navigate(`/ideas/${idea._id}`)}
                  className="cursor-pointer"
                >
                  <h2 className="text-sm font-semibold text-white">
                    {idea.title}
                  </h2>

                  <p className="mt-1 text-xs text-neutral-500">
                    Created on {new Date(idea.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/ideas/${idea._id}`)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                  >
                    View details
                  </button>

                  <button
                    onClick={() => handleDelete(idea._id)}
                    className="text-xs text-neutral-400 hover:text-red-400 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
