import { useState } from "react";
import { createIdea } from "../api/ideas";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateIdea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Please provide both a title and description.");
      return;
    }

    try {
      setLoading(true);

      await createIdea(title, description);

      toast.success("Idea validated successfully.");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to validate idea. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="w-full max-w-xl rounded-2xl border border-neutral-800 bg-black/90 p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
            Validate your startup idea
          </h1>
          <p className="mt-2 text-sm text-neutral-400 max-w-md mx-auto">
            Get a concise AI report on your problem, customer, market,
            competitors, risk, and profitability.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wide">
              Idea title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="AI-powered brand reputation assistant"
              disabled={loading}
              className="w-full rounded-md bg-neutral-950 border border-neutral-700 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 focus:border-neutral-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wide">
              Idea description
            </label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Who is this for, what problem are you solving, and how does your solution work?"
              disabled={loading}
              className="w-full rounded-md bg-neutral-950 border border-neutral-700 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 focus:border-neutral-500 transition resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 px-4 py-2.5 text-sm font-semibold text-neutral-50 hover:from-slate-700 hover:via-slate-600 hover:to-slate-700 active:from-slate-800 active:via-slate-700 active:to-slate-800 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Running validation…" : "Run validation"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-[11px] text-neutral-500 text-center">
          Your analysis will appear on the ideas dashboard in a few seconds.
        </p>
      </div>
    </div>
  );
}
