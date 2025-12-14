import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchIdeaById } from "../api/ideas";
import SignalCard from "../components/SignalCard";
import AnalysisBlock from "../components/AnalysisBlock";
import SectionHeader from "../components/SectionHeader";
import {
  AlertTriangle,
  TrendingUp,
  Users,
  Briefcase,
  Cpu,
  FileText,
} from "lucide-react";

export default function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pdfRef = useRef();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIdea();
  }, []);

  const loadIdea = async () => {
    try {
      const data = await fetchIdeaById(id);
      setIdea(data);
    } catch {
      toast.error("Failed to load idea details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-base text-neutral-400">Loading analysis…</p>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-base text-neutral-400">Idea not found.</p>
      </div>
    );
  }

  const { title, description, analysis } = idea;

  const handleExportPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;

    // Enable PDF mode
    pdfRef.current.classList.add("pdf-mode");

    const options = {
      margin: 0.6,
      filename: `${title.replace(/\s+/g, "_")}_analysis.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };

    //Generate PDF
    await html2pdf().set(options).from(pdfRef.current).save();

    //Disable PDF mode
    pdfRef.current.classList.remove("pdf-mode");
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12" ref={pdfRef}>
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-neutral-400 hover:text-neutral-200 transition"
          >
            ← Back to dashboard
          </button>

          <button
            onClick={handleExportPDF}
            className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800 transition"
          >
            Export PDF
          </button>
        </div>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto no-break">
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
            {title}
          </h1>

          <p className="mt-4 text-base md:text-lg text-neutral-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Key Signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 no-break">
          <SignalCard
            icon={AlertTriangle}
            label="Risk Level"
            value={analysis.risk_level}
          />
          <SignalCard
            icon={TrendingUp}
            label="Profitability Score"
            value={`${analysis.profitability_score} / 100`}
          />
          <SignalCard
            icon={TrendingUp}
            label="Market Outlook"
            value="Growing"
          />
        </div>

        {/* Core Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-break">
          <AnalysisBlock icon={FileText} title="Problem">
            {analysis.problem}
          </AnalysisBlock>

          <AnalysisBlock icon={Users} title="Target Customer">
            {analysis.customer}
          </AnalysisBlock>

          <AnalysisBlock icon={TrendingUp} title="Market">
            {analysis.market}
          </AnalysisBlock>

          <AnalysisBlock icon={FileText} title="AI Justification">
            {analysis.justification}
          </AnalysisBlock>
        </div>

        {/* Competitors */}
        <div className="no-break">
          <SectionHeader icon={Briefcase} title="Competitive Landscape" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analysis.competitor.map((c, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-black/70 p-5"
              >
                <h3 className="text-base font-medium text-white">{c.name}</h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  {c.differentiation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="no-break">
          <SectionHeader icon={Cpu} title="Suggested Tech Stack" />

          <div className="flex flex-wrap gap-3">
            {analysis.tech_stack.map((tech, idx) => (
              <span
                key={idx}
                className="rounded-md border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
